import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { EnhancedCameraControls } from './EnhancedCameraControls';
import { DetectiveOfficeScene } from './DetectiveOfficeScene';
import { Lighting } from './Lighting';
import { VirtualJoystick } from './mobile/VirtualJoystick';
import { TouchLookControls } from './mobile/TouchLookControls';
import { MobileControlButtons } from './mobile/MobileControlButtons';
import { LandscapeLock } from './mobile/LandscapeLock';
import { isMobileDevice } from '@/utils/detectMobile';
import { NoirAudioManager } from './NoirAudioManager';

interface CameraControlsRef {
  camera: THREE.Camera;
  setLookAt: (
    posX: number, posY: number, posZ: number,
    targetX: number, targetY: number, targetZ: number,
    enableTransition?: boolean
  ) => Promise<void>;
  getTarget: (target: THREE.Vector3) => void;
  lock: () => void;
}

interface DetectiveOfficeProps {
  onInteraction: (type: string, data?: unknown) => void;
  onCaseFileClick?: (caseFile: 'profile' | 'portfolio' | null) => void;
  selectedCaseFile?: 'profile' | 'portfolio' | null;
  overlayVisible?: boolean;
}

export interface DetectiveOfficeRef {
  zoomOutFromBoard: () => void;
}

// Main Detective Office Component
export const DetectiveOffice = forwardRef<DetectiveOfficeRef, DetectiveOfficeProps>(({ onInteraction, onCaseFileClick, selectedCaseFile, overlayVisible = false }, ref) => {
  const [lampOn, setLampOn] = useState(true);
  const [showBoardContent, setShowBoardContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDetectiveMode, setIsDetectiveMode] = useState(true); // Default ON
  const [isViewingMap, setIsViewingMap] = useState(false);
  const [originalCameraState, setOriginalCameraState] = useState<{
    position: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);
  const [wasPointerLocked, setWasPointerLocked] = useState(false);

  // Intro animation states
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntroDetective, setShowIntroDetective] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const hasPlayedIntro = useRef(false);

  const cameraControlsRef = useRef<CameraControlsRef>(null);
  const playerCharacterRef = useRef<THREE.Group>(null);
  const detectivePosition = new THREE.Vector3(0, 2.645, -6.5); // Detective eye height position at character spawn

  // Mobile controls state
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const touchMovementRef = useRef({ x: 0, y: 0 });
  const touchLookRef = useRef({ deltaX: 0, deltaY: 0 });
  const keyPressTimesRef = useRef<number[]>([]);

  // Audio state
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioVolume, setAudioVolume] = useState(0.3);

  // Expose zoomOutFromBoard method to parent via ref
  useImperativeHandle(ref, () => ({
    zoomOutFromBoard: () => {
      handleBoardContentClose();
    }
  }));

  // Board transition functions
  const handleBoardClick = async () => {
    console.log('handleBoardClick called!');
    if (isTransitioning) {
      console.log('Already transitioning, returning...');
      return;
    }

    setWasPointerLocked(!!document.pointerLockElement);

    // Exit pointer lock immediately when opening board
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    setIsTransitioning(true);

    // Store current camera state
    const cameraControls = cameraControlsRef.current;
    if (!cameraControls) {
      console.error('Camera controls not available');
      setIsTransitioning(false);
      return;
    }

    const currentPosition = cameraControls.camera.position.clone();
    const currentTarget = new THREE.Vector3();
    cameraControls.getTarget(currentTarget);

    setOriginalCameraState({
      position: currentPosition,
      target: currentTarget
    });

    try {
      // Smooth zoom to board - closer on mobile for better readability
      const boardPosition = isMobile
        ? new THREE.Vector3(0, 4.5, 3.5) // Closer for mobile devices
        : new THREE.Vector3(0, 4.5, 4.5); // Further back for desktop
      const boardTarget = new THREE.Vector3(0, 4.5, 9.9); // Board center

      await cameraControls.setLookAt(
        boardPosition.x, boardPosition.y, boardPosition.z,
        boardTarget.x, boardTarget.y, boardTarget.z,
        true // enable smooth transition
      );

      // Show content on board after zoom
      setShowBoardContent(true);
      setIsTransitioning(false);

    } catch (error) {
      console.error('Camera transition failed:', error);
      setIsTransitioning(false);
    }
  };

  const handleBoardContentClose = async () => {
    // Close board zoom
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Smoothly transition camera back to original position
    const cameraControls = cameraControlsRef.current;
    if (cameraControls && originalCameraState) {
      try {
        await cameraControls.setLookAt(
          originalCameraState.position.x,
          originalCameraState.position.y,
          originalCameraState.position.z,
          originalCameraState.target.x,
          originalCameraState.target.y,
          originalCameraState.target.z,
          true // enable smooth transition
        );
      } catch (error) {
        console.error('Camera transition back failed:', error);
      }
    }

    // Always reset state after transition completes (even if camera controls failed)
    setShowBoardContent(false);
    setIsViewingMap(false);
    setIsTransitioning(false);
    setOriginalCameraState(null);

    // Re-engage pointer lock after a short delay
    if (wasPointerLocked) {
      setTimeout(() => {
        cameraControlsRef.current?.lock();
        setWasPointerLocked(false); // Reset the flag
      }, 100);
    }
  };

  const handleMapClick = async () => {
    if (isTransitioning) return;

    setWasPointerLocked(!!document.pointerLockElement);

    // Exit pointer lock immediately when opening map
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    setIsTransitioning(true);

    // Store current camera state
    const cameraControls = cameraControlsRef.current;
    if (cameraControls) {
      // Reset map zoom to default distance
      cameraControls.resetMapZoom();

      const currentPosition = cameraControls.camera.position.clone();
      const currentTarget = new THREE.Vector3();
      cameraControls.getTarget(currentTarget);

      setOriginalCameraState({
        position: currentPosition,
        target: currentTarget
      });

      try {
        // Smooth zoom to map on wall - zoom in close like the board
        const mapPosition = new THREE.Vector3(7.85, 3, -3); // Closer to map for better view (right wall) - zoomed 15% more
        const mapTarget = new THREE.Vector3(9.85, 3, -3); // Map location (right wall)

        await cameraControls.setLookAt(
          mapPosition.x, mapPosition.y, mapPosition.z,
          mapTarget.x, mapTarget.y, mapTarget.z,
          true // enable smooth transition
        );

        setIsViewingMap(true);
        setShowBoardContent(true);
        setIsTransitioning(false);

      } catch (error) {
        console.error('Camera transition to map failed:', error);
        setIsTransitioning(false);
      }
    }
  };

  const handleInteraction = (type: string, data?: unknown) => {
    if (type === 'lamp') {
      setLampOn(prev => !prev);
      console.log('Lamp toggled:', !lampOn);
    } else if (type === 'detective') {
      console.log('Detective character clicked');
      // Add detective interaction logic here
    } else if (type === 'map') {
      handleMapClick();
    } else {
      onInteraction(type, data);
    }
  };

  const handleToggleDetectiveMode = async () => {
    if (isTransitioning || showBoardContent) return;

    setIsTransitioning(true);

    if (!isDetectiveMode) {
      // Entering detective mode - snap to detective position
      if (cameraControlsRef.current) {
        const currentPosition = cameraControlsRef.current.camera.position.clone();
        const currentTarget = new THREE.Vector3();
        cameraControlsRef.current.getTarget(currentTarget);

        setOriginalCameraState({
          position: currentPosition,
          target: currentTarget
        });

        // Snap camera to detective position
        await cameraControlsRef.current.setLookAt(
          detectivePosition.x, detectivePosition.y, detectivePosition.z,
          detectivePosition.x, detectivePosition.y, detectivePosition.z - 1,
          true // smooth transition
        );
      }
      setIsDetectiveMode(true);
    } else {
      // Exiting detective mode - return to previous position
      if (originalCameraState && cameraControlsRef.current) {
        await cameraControlsRef.current.setLookAt(
          originalCameraState.position.x,
          originalCameraState.position.y,
          originalCameraState.position.z,
          originalCameraState.target.x,
          originalCameraState.target.y,
          originalCameraState.target.z,
          true
        );
        setOriginalCameraState(null);
      }
      setIsDetectiveMode(false);
    }

    setIsTransitioning(false);
  };

  // Intro animation - zoom from third person into detective character
  const playIntroAnimation = async () => {
    if (hasPlayedIntro.current || !cameraControlsRef.current) return;

    hasPlayedIntro.current = true;
    setIsTransitioning(true);

    console.log('Starting intro animation');

    // Detective at (0, 0, -6.5) - Camera positioned behind and to side
    const thirdPersonPos = new THREE.Vector3(-2.5, 2.5, -2.5);
    const thirdPersonTarget = new THREE.Vector3(0, 2.1, -6.5);

    // Set initial third person view
    await cameraControlsRef.current.setLookAt(
      thirdPersonPos.x, thirdPersonPos.y, thirdPersonPos.z,
      thirdPersonTarget.x, thirdPersonTarget.y, thirdPersonTarget.z,
      false
    );

    console.log('Camera positioned, fading in...');

    // Fade in from black
    setFadeOut(true);

    // Hold third-person view
    await new Promise(resolve => setTimeout(resolve, 2500));

    console.log('Zooming to first person...');

    // First person position - spawn at character location facing the board (180°)
    const firstPersonPos = new THREE.Vector3(0, 2.3, -6.5);
    const firstPersonTarget = new THREE.Vector3(0, 2.3, 3.5);

    // Smooth zoom to first person
    await cameraControlsRef.current.setLookAt(
      firstPersonPos.x, firstPersonPos.y, firstPersonPos.z,
      firstPersonTarget.x, firstPersonTarget.y, firstPersonTarget.z,
      true
    );

    await new Promise(resolve => setTimeout(resolve, 100));

    // Hide detective mesh
    setShowIntroDetective(false);
    setIntroComplete(true);
    setIsTransitioning(false);

    console.log('Intro animation complete');
  };

  // Play intro animation on mount
  useEffect(() => {
    const checkAndStart = () => {
      if (cameraControlsRef.current && !hasPlayedIntro.current) {
        console.log('Camera controls ready, starting intro');
        playIntroAnimation();
        return true;
      }
      return false;
    };

    if (!checkAndStart()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (checkAndStart() || attempts > 30) {
          clearInterval(interval);
          if (attempts > 30) {
            console.error('Camera controls never initialized');
            setShowIntroDetective(false);
            setIntroComplete(true);
            setFadeOut(true);
          }
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const skipIntro = () => {
      if (!introComplete && cameraControlsRef.current) {
        console.log('Skipping intro');
        cameraControlsRef.current.setLookAt(0, 2.3, -6.5, 0, 2.3, 3.5, false);
        setShowIntroDetective(false);
        setIntroComplete(true);
        setFadeOut(true);
        setIsTransitioning(false);
        hasPlayedIntro.current = true;
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      // Check for '99999' sequence to toggle mobile mode
      if (event.key === '9') {
        const now = Date.now();
        keyPressTimesRef.current.push(now);

        // Keep only presses within the last 2 seconds
        keyPressTimesRef.current = keyPressTimesRef.current.filter(
          time => now - time < 2000
        );

        // Check if we have 5 presses within 2 seconds
        if (keyPressTimesRef.current.length >= 5) {
          setIsMobile(prev => !prev);
          console.log('Mobile mode toggled:', !isMobile);
          keyPressTimesRef.current = []; // Reset
          return;
        }
      }

      // Skip intro on any key
      if (!introComplete && event.key !== 'F5') {
        event.preventDefault();
        skipIntro();
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        handleToggleDetectiveMode();
      } else if (event.key === 'r' || event.key === 'R') {
        // Only handle R if not in pointer lock mode
        if (!document.pointerLockElement) {
          event.preventDefault();
          if (showBoardContent) {
            handleBoardContentClose();
          } else {
            handleBoardClick();
          }
        }
      } else if (event.key === 'Escape' && showBoardContent) {
        event.preventDefault();
        handleBoardContentClose();
      }
    };

    const handleClick = () => {
      if (!introComplete) {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [showBoardContent, isTransitioning, originalCameraState, isDetectiveMode, introComplete]);

  return (
    <div className="w-full h-full bg-noir-shadow" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }}>
      <Canvas
        camera={{ position: [-2.5, 2.5, 4], fov: isMobile ? 85 : 75 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.domElement.style.cursor = 'crosshair';
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        <EnhancedCameraControls
          ref={cameraControlsRef as unknown as React.Ref<CameraControlsRef>}
          isTransitioning={isTransitioning}
          showBoardContent={showBoardContent}
          isDetectiveMode={isDetectiveMode}
          introComplete={introComplete}
          playerCharacterRef={playerCharacterRef}
          touchMovementRef={isMobile ? touchMovementRef : undefined}
          touchLookRef={isMobile ? touchLookRef : undefined}
        />
        <Lighting lampOn={lampOn} />
        <NoirAudioManager enabled={audioEnabled} masterVolume={audioVolume} />
        <DetectiveOfficeScene
          onInteraction={handleInteraction}
          lampOn={lampOn}
          cameraControlsRef={cameraControlsRef}
          onBoardClick={handleBoardClick}
          onCaseFileClick={onCaseFileClick}
          showBoardContent={showBoardContent}
          selectedCaseFile={selectedCaseFile}
          overlayVisible={overlayVisible}
          onBoardContentClose={handleBoardContentClose}
          isDetectiveMode={isDetectiveMode}
          showIntroDetective={showIntroDetective}
          playerCharacterRef={playerCharacterRef}
        />
      </Canvas>

      {/* Detective Mode Indicator */}
      {isDetectiveMode && (
        <div className="absolute top-4 left-4 text-detective-glow text-lg font-bold animate-detective-glow">
          DETECTIVE MODE
        </div>
      )}

      {/* Audio Control Toggle */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute top-4 right-4 bg-noir-shadow/80 border border-detective-paper/30 text-detective-paper px-4 py-2 rounded hover:bg-noir-shadow hover:border-detective-glow/50 transition-all duration-200 flex items-center gap-2"
        title={audioEnabled ? 'Mute Audio' : 'Enable Audio'}
      >
        {audioEnabled ? '🔊' : '🔇'} {audioEnabled ? 'Audio ON' : 'Audio OFF'}
      </button>

      {/* Enhanced Controls Hint - Hide on mobile */}
      {!isMobile && (
        <div className="absolute bottom-4 left-4 text-detective-paper text-sm space-y-1">
          <p>WASD - Move • Click Empty Area - Enable Mouse Look • {!isDetectiveMode && 'Space/Shift - Up/Down • '}Tab - Toggle Detective Mode (Default: ON)</p>
          <p>R - Resume Board • Click Board - Open Resume • ESC - Close Modal</p>
        </div>
      )}

      {/* Mobile Controls - Hide when board is open */}
      {isMobile && !showBoardContent && (
        <>
          <VirtualJoystick onMove={(x, y) => {
            touchMovementRef.current = { x, y };
          }} />
          <TouchLookControls
            sensitivity={1.5}
            onLook={(deltaX, deltaY) => {
              touchLookRef.current = { deltaX, deltaY };
            }}
          />
        </>
      )}

      {/* Landscape Lock - Always show */}
      {isMobile && <LandscapeLock />}

      {/* Intro fade overlay */}
      {!introComplete && (
        <>
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-1000 pointer-events-none ${
              fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ zIndex: 1000 }}
          />
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-detective-paper text-sm transition-opacity duration-1000 ${
              fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ zIndex: 1001 }}
          >
            Click or press any key to skip...
          </div>
        </>
      )}

    </div>
  );
});

DetectiveOffice.displayName = 'DetectiveOffice';
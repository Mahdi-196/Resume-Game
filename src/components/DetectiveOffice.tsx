import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { EnhancedCameraControls, type CameraControlsRef } from './EnhancedCameraControls';
import { DetectiveOfficeScene } from './DetectiveOfficeScene';
import { Lighting } from './Lighting';
import { VirtualJoystick } from './mobile/VirtualJoystick';
import { TouchLookControls } from './mobile/TouchLookControls';
import { LandscapeLock } from './mobile/LandscapeLock';
import { isMobileDevice } from '@/utils/detectMobile';
import { NoirAudioManager } from './NoirAudioManager';


interface DetectiveOfficeProps {
  onInteraction: (type: string, data?: unknown) => void;
  onCaseFileClick?: (caseFile: 'profile' | 'portfolio' | null) => void;
  selectedCaseFile?: 'profile' | 'portfolio' | null;
  overlayVisible?: boolean;
  startCameraAnimation?: boolean;
}

export interface DetectiveOfficeRef {
  zoomOutFromBoard: () => void;
}

// Main Detective Office Component
export const DetectiveOffice = forwardRef<DetectiveOfficeRef, DetectiveOfficeProps>(({ onInteraction, onCaseFileClick, selectedCaseFile, overlayVisible = false, startCameraAnimation = false }, ref) => {
  const [lampOn, setLampOn] = useState(true);
  const [showBoardContent, setShowBoardContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isDetectiveMode = true; // Always in detective mode - flying mode removed
  const [_isViewingMap, setIsViewingMap] = useState(false);
  const [wasPointerLocked, setWasPointerLocked] = useState(false);
  const [originalCameraState, setOriginalCameraState] = useState<{
    position: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);

  // Intro animation states
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntroDetective, setShowIntroDetective] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const hasPlayedIntro = useRef(false);

  const cameraControlsRef = useRef<CameraControlsRef>(null);
  const playerCharacterRef = useRef<THREE.Group>(null);
  const pointerLockRestoreTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile controls state
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  const touchMovementRef = useRef({ x: 0, y: 0 });
  const touchLookRef = useRef({ deltaX: 0, deltaY: 0 });
  const keyPressTimesRef = useRef<number[]>([]);

  // Audio settings - permanently enabled
  const audioEnabled = true;
  const audioVolume = 0.3;

  // Expose zoomOutFromBoard method to parent via ref
  useImperativeHandle(ref, () => ({
    zoomOutFromBoard: () => {
      handleBoardContentClose();
    }
  }));

  // Board transition functions
  const handleBoardClick = async () => {
    console.log('handleBoardClick called!');

    // Don't allow board clicks during intro
    if (!introComplete) {
      console.log('Intro not complete, ignoring board click');
      return;
    }

    if (isTransitioning) {
      console.log('Already transitioning, returning...');
      return;
    }

    // Cancel any pending pointer lock restoration
    if (pointerLockRestoreTimeoutRef.current) {
      clearTimeout(pointerLockRestoreTimeoutRef.current);
      pointerLockRestoreTimeoutRef.current = null;
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
        ? new THREE.Vector3(0, 4.5, 5.8) // Extremely close to board for mobile - almost touching
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
    // Store timeout ID so it can be cancelled if board is opened again quickly
    if (wasPointerLocked) {
      pointerLockRestoreTimeoutRef.current = setTimeout(() => {
        cameraControlsRef.current?.lock();
        setWasPointerLocked(false);
        pointerLockRestoreTimeoutRef.current = null;
      }, 100);
    }
  };

  const handleMapClick = async () => {
    // Don't allow map clicks during intro
    if (!introComplete) return;

    if (isTransitioning) return;

    // Cancel any pending pointer lock restoration
    if (pointerLockRestoreTimeoutRef.current) {
      clearTimeout(pointerLockRestoreTimeoutRef.current);
      pointerLockRestoreTimeoutRef.current = null;
    }

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
    // Don't allow any interactions during intro
    if (!introComplete) {
      console.log('Intro not complete, ignoring interaction:', type);
      return;
    }

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


  // Intro animation - show character then transition to first person
  const playIntroAnimation = async () => {
    if (hasPlayedIntro.current || !cameraControlsRef.current) return;

    hasPlayedIntro.current = true;
    setIsTransitioning(true);

    console.log('Starting intro animation');

    // Detective at (0, 0, -6.5) - Camera in center of room, further away and higher
    const thirdPersonPos = new THREE.Vector3(0, 6, 2);
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

    // Hold third-person view to show the character
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Fading to first person...');

    // Fade out briefly
    setFadeOut(false);
    await new Promise(resolve => setTimeout(resolve, 300));

    // Hide detective mesh during fade
    setShowIntroDetective(false);

    // Instantly teleport to first person position facing board (no zoom animation)
    const firstPersonPos = new THREE.Vector3(0, 2.3, -6.5);
    const firstPersonTarget = new THREE.Vector3(0, 2.3, 3.5); // Facing board (south)

    await cameraControlsRef.current.setLookAt(
      firstPersonPos.x, firstPersonPos.y, firstPersonPos.z,
      firstPersonTarget.x, firstPersonTarget.y, firstPersonTarget.z,
      false // No transition - instant teleport
    );

    // Update yaw to Math.PI (facing south) so mouse movement maintains direction
    cameraControlsRef.current.setYawPitch(Math.PI, 0);

    // Fade back in at first person
    await new Promise(resolve => setTimeout(resolve, 100));
    setFadeOut(true);

    setIntroComplete(true);

    // Wait 1 second before allowing interaction to prevent getting stuck
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsTransitioning(false);

    console.log('Intro animation complete - transitioned to first person facing board');
  };

  // Play intro animation only after intro overlay completes
  useEffect(() => {
    if (!startCameraAnimation) {
      console.log('Waiting for intro overlay to complete...');
      return;
    }

    const checkAndStart = () => {
      if (cameraControlsRef.current && !hasPlayedIntro.current) {
        console.log('Intro overlay complete, starting camera animation');
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
  }, [startCameraAnimation]);

  useEffect(() => {
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

      // Don't allow any controls during intro
      if (!introComplete) {
        return;
      }

      if (event.key === 'r' || event.key === 'R') {
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

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showBoardContent, isTransitioning, introComplete, startCameraAnimation]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pointerLockRestoreTimeoutRef.current) {
        clearTimeout(pointerLockRestoreTimeoutRef.current);
      }
    };
  }, []);

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
import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { checkCollision } from '@/utils/collisionDetection';

interface EnhancedCameraControlsProps {
  isTransitioning: boolean;
  showBoardContent?: boolean;
  isDetectiveMode?: boolean;
  isViewingMap?: boolean;
  introComplete?: boolean;
  playerCharacterRef?: React.RefObject<THREE.Group>;
  // Mobile touch controls
  touchMovementRef?: React.MutableRefObject<{ x: number; y: number }>;
  touchLookRef?: React.MutableRefObject<{ deltaX: number; deltaY: number }>;
}

interface CameraControlsRef {
  camera: THREE.Camera;
  setLookAt: (
    posX: number, posY: number, posZ: number,
    targetX: number, targetY: number, targetZ: number,
    enableTransition?: boolean
  ) => Promise<void>;
  getTarget: (target: THREE.Vector3) => void;
  lock: () => void;
  resetMapZoom: () => void;
}

export const EnhancedCameraControls = forwardRef<CameraControlsRef, EnhancedCameraControlsProps>(
  ({ isTransitioning, showBoardContent = false, isDetectiveMode = false, isViewingMap = false, introComplete = false, playerCharacterRef, touchMovementRef, touchLookRef }, ref) => {
    const { camera, gl, pointer, raycaster } = useThree();
    const moveState = useRef({
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false
    });
    
    const yaw = useRef(0);
    const pitch = useRef(0);
    const isMouseLocked = useRef(false);
    const lookTarget = useRef(new THREE.Vector3(0, 0, -1));
    const hasInitialized = useRef(false);

    useImperativeHandle(ref, () => ({
      lock: () => {
        if (!isMouseLocked.current && !isTransitioning && !showBoardContent) {
          // Add a small delay to ensure DOM is ready
          setTimeout(() => {
            if (gl.domElement && document.body.contains(gl.domElement)) {
              gl.domElement.requestPointerLock().catch((error) => {
                console.warn('Failed to request pointer lock:', error);
              });
            }
          }, 50);
        }
      },
      resetMapZoom: () => {
        // No longer needed but keep for compatibility
      },
      camera,
      setLookAt: async (posX: number, posY: number, posZ: number, targetX: number, targetY: number, targetZ: number, enableTransition?: boolean) => {
        if (enableTransition) {
          // Smooth transition
          const startPos = camera.position.clone();
          const targetPos = new THREE.Vector3(posX, posY, posZ);
          const startTarget = lookTarget.current.clone();
          const newTarget = new THREE.Vector3(targetX, targetY, targetZ);
          
          return new Promise<void>((resolve) => {
            let progress = 0;
            const duration = 1000; // 1 second
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              progress = Math.min(elapsed / duration, 1);
              
              // Smooth easing
              const eased = 1 - Math.pow(1 - progress, 3);
              
              camera.position.lerpVectors(startPos, targetPos, eased);
              lookTarget.current.lerpVectors(startTarget, newTarget, eased);
              camera.lookAt(lookTarget.current);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                resolve();
              }
            };
            animate();
          });
        } else {
          camera.position.set(posX, posY, posZ);
          lookTarget.current.set(targetX, targetY, targetZ);
          camera.lookAt(lookTarget.current);
          return Promise.resolve();
        }
      },
      getTarget: (target: THREE.Vector3) => {
        target.copy(lookTarget.current);
      }
    }), [camera, gl]);

    useEffect(() => {
      if (isTransitioning || showBoardContent) return;

      // Set initial camera position and rotation only once on mount
      // Spawn near back wall window, facing forward into the room
      if (!hasInitialized.current) {
        camera.position.set(0, 2.3, -8.5);
        camera.rotation.set(0, Math.PI, 0);
        hasInitialized.current = true;
      }
      
      const handleKeyDown = (event: KeyboardEvent) => {
        if (isTransitioning) return;
        
        // Don't handle R key - let DetectiveOffice handle it
        if (event.key === 'r' || event.key === 'R') {
          return;
        }
        
        // Exit pointer lock on Escape
        if (event.key === 'Escape' && isMouseLocked.current) {
          document.exitPointerLock();
          return;
        }
        
        switch (event.code) {
          case 'KeyW':
            moveState.current.forward = true;
            requestPointerLockOnMovement();
            break;
          case 'KeyS':
            moveState.current.backward = true;
            requestPointerLockOnMovement();
            break;
          case 'KeyA':
            moveState.current.left = true;
            requestPointerLockOnMovement();
            break;
          case 'KeyD':
            moveState.current.right = true;
            requestPointerLockOnMovement();
            break;
          case 'Space':
            event.preventDefault();
            if (!isDetectiveMode) {
              moveState.current.up = true;
              requestPointerLockOnMovement();
            }
            break;
          case 'ShiftLeft':
            if (!isDetectiveMode) {
              moveState.current.down = true;
              requestPointerLockOnMovement();
            }
            break;
        }
      };

      const handleKeyUp = (event: KeyboardEvent) => {
        switch (event.code) {
          case 'KeyW':
            moveState.current.forward = false;
            break;
          case 'KeyS':
            moveState.current.backward = false;
            break;
          case 'KeyA':
            moveState.current.left = false;
            break;
          case 'KeyD':
            moveState.current.right = false;
            break;
          case 'Space':
            moveState.current.up = false;
            break;
          case 'ShiftLeft':
            moveState.current.down = false;
            break;
        }
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (isMouseLocked.current && !isTransitioning) {
          const sensitivity = 0.002;

          yaw.current -= event.movementX * sensitivity;
          pitch.current -= event.movementY * sensitivity;

          // Clamp vertical rotation to prevent flipping
          pitch.current = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, pitch.current));

          // Calculate look direction and update target
          const direction = new THREE.Vector3(
            -Math.sin(yaw.current) * Math.cos(pitch.current),
            Math.sin(pitch.current),
            -Math.cos(yaw.current) * Math.cos(pitch.current)
          );
          lookTarget.current.copy(camera.position).add(direction);
          camera.lookAt(lookTarget.current);
        }
      };

      // Capturing phase handler - intercept ALL pointer events when locked
      const handlePointerEventCapture = (event: PointerEvent) => {
        // If pointer is locked, modify the event coordinates to center of screen
        if (document.pointerLockElement === gl.domElement) {
          const rect = gl.domElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Override the event coordinates to center
          Object.defineProperty(event, 'clientX', { value: centerX, configurable: true });
          Object.defineProperty(event, 'clientY', { value: centerY, configurable: true });
          Object.defineProperty(event, 'offsetX', { value: rect.width / 2, configurable: true });
          Object.defineProperty(event, 'offsetY', { value: rect.height / 2, configurable: true });
        }
      };

      const handleClick = (event: MouseEvent) => {
        if (isTransitioning) return;

        // Lock pointer when clicking in the scene (if not already locked)
        if (!isMouseLocked.current) {
          gl.domElement.requestPointerLock();
        }
      };

      const requestPointerLockOnMovement = () => {
        if (!isMouseLocked.current && !isTransitioning && !showBoardContent) {
          gl.domElement.requestPointerLock();
        }
      };

      const handlePointerLockChange = () => {
        isMouseLocked.current = document.pointerLockElement === gl.domElement;
        if (isMouseLocked.current) {
          gl.domElement.style.cursor = 'none';
        } else {
          gl.domElement.style.cursor = 'crosshair';
          // Clear all movement state when pointer lock is lost to prevent stuck keys
          moveState.current = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            up: false,
            down: false
          };
        }
      };

      // Don't auto-enable pointer lock - let user click to enable it

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      gl.domElement.addEventListener('mousemove', handleMouseMove);
      // CRITICAL: Intercept pointer events in capture phase BEFORE R3F processes them
      gl.domElement.addEventListener('pointerdown', handlePointerEventCapture, true);
      gl.domElement.addEventListener('pointerup', handlePointerEventCapture, true);
      gl.domElement.addEventListener('click', handlePointerEventCapture, true);
      gl.domElement.addEventListener('click', handleClick);
      document.addEventListener('pointerlockchange', handlePointerLockChange);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        gl.domElement.removeEventListener('mousemove', handleMouseMove);
        gl.domElement.removeEventListener('pointerdown', handlePointerEventCapture, true);
        gl.domElement.removeEventListener('pointerup', handlePointerEventCapture, true);
        gl.domElement.removeEventListener('click', handlePointerEventCapture, true);
        gl.domElement.removeEventListener('click', handleClick);
        document.removeEventListener('pointerlockchange', handlePointerLockChange);
      };
    }, [camera, gl, pointer, raycaster, isTransitioning, isDetectiveMode, introComplete, showBoardContent]);

    // Clear movement state when board/map opens or transitions start
    useEffect(() => {
      if (showBoardContent || isTransitioning) {
        moveState.current = {
          forward: false,
          backward: false,
          left: false,
          right: false,
          up: false,
          down: false
        };
      }
    }, [showBoardContent, isTransitioning]);

    useFrame(() => {
      if (isTransitioning) return;
      if (showBoardContent) return; // Block all movement when viewing map or board

      // CRITICAL FIX: Force raycaster to use center of screen when pointer is locked
      // This ensures all click interactions work at camera center, not where mouse was initially
      if (document.pointerLockElement === gl.domElement) {
        pointer.set(0, 0);
        raycaster.setFromCamera(pointer, camera);
      }

      // NOTE: Removed character following mode as it bypassed collision detection
      // Camera now uses direct movement with collision detection

      // Apply touch look controls and consume deltas
      if (touchLookRef && (touchLookRef.current.deltaX !== 0 || touchLookRef.current.deltaY !== 0)) {
        const sensitivity = 0.006; // Increased for faster camera rotation

        yaw.current -= touchLookRef.current.deltaX * sensitivity;
        pitch.current -= touchLookRef.current.deltaY * sensitivity;

        // Clamp vertical rotation to prevent flipping
        pitch.current = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, pitch.current));

        // Reset deltas after consuming them (important!)
        touchLookRef.current.deltaX = 0;
        touchLookRef.current.deltaY = 0;
      }

      const keyboardSpeed = 0.08;
      const touchSpeed = 0.09; // 1.5x faster for touch
      const direction = new THREE.Vector3();

      // Keyboard movement
      if (moveState.current.forward) {
        direction.z -= keyboardSpeed;
      }
      if (moveState.current.backward) {
        direction.z += keyboardSpeed;
      }
      if (moveState.current.left) {
        direction.x -= keyboardSpeed;
      }
      if (moveState.current.right) {
        direction.x += keyboardSpeed;
      }
      if (moveState.current.up && !isDetectiveMode) {
        direction.y += keyboardSpeed;
      }
      if (moveState.current.down && !isDetectiveMode) {
        direction.y -= keyboardSpeed;
      }

      // Touch movement (joystick) - only apply if not zero
      if (touchMovementRef) {
        const touchX = touchMovementRef.current.x;
        const touchY = touchMovementRef.current.y;

        // Only apply movement if values are non-zero (with tiny threshold to handle floating point)
        if (Math.abs(touchX) > 0.0001 || Math.abs(touchY) > 0.0001) {
          direction.x += touchX * touchSpeed;
          direction.z += touchY * touchSpeed;
        }
      }

      // Apply camera rotation to movement direction (only horizontal rotation for movement)
      if (direction.length() > 0) {
        const euler = new THREE.Euler(0, yaw.current, 0);
        direction.applyEuler(euler);
      }

      // Calculate intended position before collision detection
      const intendedPosition = camera.position.clone().add(direction);

      // Apply collision detection (only in detective mode and when actually moving)
      let finalX = intendedPosition.x;
      let finalZ = intendedPosition.z;

      if (direction.length() > 0 && isDetectiveMode) {
        const collisionResult = checkCollision(
          camera.position.x,
          camera.position.z,
          intendedPosition.x,
          intendedPosition.z,
          0.75 // player collision radius - works with 10% bookshelf padding to prevent glitching and stuck issues
        );

        finalX = collisionResult.correctedX;
        finalZ = collisionResult.correctedZ;
      }

      const newPosition = camera.position.clone();
      newPosition.x = finalX;
      newPosition.z = finalZ;

      // In detective mode, lock Y to eye level height
      if (isDetectiveMode) {
        newPosition.y = 2.645;
      } else {
        newPosition.y = Math.max(0.5, Math.min(10, intendedPosition.y));
      }

      // Only update position if values are valid (prevent NaN issues)
      if (!isNaN(newPosition.x) && !isNaN(newPosition.y) && !isNaN(newPosition.z)) {
        camera.position.copy(newPosition);
      }

      // Update look target to maintain current view direction
      // Only update if yaw and pitch are valid
      if (!isNaN(yaw.current) && !isNaN(pitch.current)) {
        const viewDirection = new THREE.Vector3(
          -Math.sin(yaw.current) * Math.cos(pitch.current),
          Math.sin(pitch.current),
          -Math.cos(yaw.current) * Math.cos(pitch.current)
        );
        lookTarget.current.copy(camera.position).add(viewDirection);
        camera.lookAt(lookTarget.current);
      }
    });

    return null;
  }
);

EnhancedCameraControls.displayName = 'EnhancedCameraControls';
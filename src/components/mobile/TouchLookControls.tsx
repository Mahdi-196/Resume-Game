import { useEffect, useRef } from 'react';

/**
 * Touch-based camera look controls for mobile
 * Swipe right side of screen to rotate camera
 */
interface TouchLookControlsProps {
  onLook: (deltaX: number, deltaY: number) => void;
  sensitivity?: number;
}

export const TouchLookControls = ({ onLook, sensitivity = 1.2 }: TouchLookControlsProps) => {
  const touchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Only handle NEW touches on right half of screen (ignore if already tracking)
      if (touchIdRef.current !== null) return;

      const touch = Array.from(e.touches).find(t => t.clientX > window.innerWidth / 2);
      if (touch) {
        e.preventDefault();
        touchIdRef.current = touch.identifier;
        lastPositionRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = Array.from(e.touches).find(t => t.identifier === touchIdRef.current);
      if (touch && lastPositionRef.current) {
        e.preventDefault();
        const deltaX = (touch.clientX - lastPositionRef.current.x) * sensitivity;
        const deltaY = (touch.clientY - lastPositionRef.current.y) * sensitivity;

        onLook(deltaX, deltaY);

        lastPositionRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = Array.from(e.changedTouches).find(t => t.identifier === touchIdRef.current);
      if (touch) {
        touchIdRef.current = null;
        lastPositionRef.current = null;
        // Reset look deltas to stop camera rotation
        onLook(0, 0);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [onLook, sensitivity]);

  return null;
};

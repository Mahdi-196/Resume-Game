import { useEffect, useRef, useState } from 'react';

/**
 * Virtual joystick for mobile movement controls
 * Returns normalized x/y values (-1 to 1) for movement direction
 */
interface VirtualJoystickProps {
  onMove: (x: number, y: number) => void;
  size?: number;
}

export const VirtualJoystick = ({ onMove, size = 120 }: VirtualJoystickProps) => {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchIdRef = useRef<number | null>(null);

  const maxDistance = size / 2;

  // Ensure joystick resets on unmount and visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        resetJoystick();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      onMove(0, 0);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onMove]);

  const resetJoystick = () => {
    setActive(false);
    setPosition({ x: 0, y: 0 });
    onMove(0, 0);
    touchIdRef.current = null;
    console.log('Joystick reset to (0, 0)');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    touchIdRef.current = touch.identifier;
    setActive(true);
    updatePosition(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = Array.from(e.touches).find(t => t.identifier === touchIdRef.current);
    if (touch) {
      updatePosition(touch.clientX, touch.clientY);
    } else {
      // Touch ID not found - reset
      resetJoystick();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = Array.from(e.changedTouches).find(t => t.identifier === touchIdRef.current);
    if (touch || touchIdRef.current !== null) {
      // Always reset, even if touch not found
      resetJoystick();
    }
  };

  const updatePosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    // Calculate distance from center
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Limit to max distance
    if (distance > maxDistance) {
      const angle = Math.atan2(deltaY, deltaX);
      deltaX = Math.cos(angle) * maxDistance;
      deltaY = Math.sin(angle) * maxDistance;
    }

    setPosition({ x: deltaX, y: deltaY });

    // Normalize to -1 to 1 range
    const normalizedX = deltaX / maxDistance;
    const normalizedY = deltaY / maxDistance; // Don't invert - positive Y should be forward

    console.log('Joystick move:', { normalizedX, normalizedY });
    onMove(normalizedX, normalizedY);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-8 z-50 mobile-control"
      style={{ width: size, height: size }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={resetJoystick}
    >
      {/* Outer circle (base) */}
      <div
        className={`absolute inset-0 rounded-full border-4 transition-all duration-200 ${
          active
            ? 'border-detective-glow/60 bg-noir-shadow/80 shadow-[0_0_20px_rgba(218,165,32,0.3)]'
            : 'border-detective-glow/30 bg-noir-shadow/60'
        }`}
      />

      {/* Inner circle (stick) */}
      <div
        className={`absolute rounded-full transition-all duration-100 ${
          active ? 'bg-detective-glow shadow-[0_0_15px_rgba(218,165,32,0.5)]' : 'bg-detective-glow/70'
        }`}
        style={{
          width: size * 0.4,
          height: size * 0.4,
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
        }}
      />

      {/* Directional indicators */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Up arrow */}
        <div className="absolute top-2 text-detective-paper/40 text-xs">▲</div>
        {/* Down arrow */}
        <div className="absolute bottom-2 text-detective-paper/40 text-xs">▼</div>
        {/* Left arrow */}
        <div className="absolute left-2 text-detective-paper/40 text-xs">◀</div>
        {/* Right arrow */}
        <div className="absolute right-2 text-detective-paper/40 text-xs">▶</div>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';

/**
 * Forces landscape orientation on mobile devices
 * Shows "rotate device" overlay when in portrait mode
 */
export const LandscapeLock = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if device is in portrait mode
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);
    };

    // Check on mount
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Don't show overlay if in landscape
  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-noir-shadow">
      {/* Animated vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-noir-shadow/70 to-black" />

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-md">
        {/* Rotating phone icon */}
        <div className="mb-8 flex justify-center">
          <div className="animate-bounce">
            <svg
              className="w-24 h-24 text-detective-glow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-detective-glow tracking-widest mb-4 drop-shadow-[0_0_10px_rgba(218,165,32,0.3)]">
          ROTATE DEVICE
        </h1>

        {/* Instruction */}
        <p className="text-xl text-detective-paper tracking-wide font-light drop-shadow-[0_0_10px_rgba(245,222,179,0.2)]">
          Please rotate your device to landscape mode for the best experience
        </p>

        {/* Decorative line */}
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-48 bg-gradient-to-r from-transparent via-detective-glow/60 to-transparent" />
        </div>
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-repeat animate-flicker" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
      </div>
    </div>
  );
};

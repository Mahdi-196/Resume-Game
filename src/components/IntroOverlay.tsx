import { useEffect, useState } from 'react';

/**
 * Intro overlay that appears on first visit
 * Film noir styled welcome animation
 */
interface IntroOverlayProps {
  onComplete: () => void;
  isManualTrigger?: boolean; // True when triggered by '999' keypress
}

export const IntroOverlay = ({ onComplete, isManualTrigger = false }: IntroOverlayProps) => {
  const [phase, setPhase] = useState<'hidden' | 'fadeIn' | 'show' | 'fadeOut'>('hidden');
  const [lineExpanded, setLineExpanded] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isManualTrigger) {
      // Manual trigger - show immediately and stay until skip
      setPhase('fadeIn');
      setTimeout(() => setLineExpanded(true), 300);
      setTimeout(() => {
        setShowText(true);
        setPhase('show');
      }, 600);
      // No auto-close for manual trigger
      return;
    }

    // Auto trigger - show after 5 seconds and auto-close after 3 seconds
    const startTimer = setTimeout(() => {
      setPhase('fadeIn');
    }, 5000);

    const lineTimer = setTimeout(() => {
      setLineExpanded(true);
    }, 5300);

    const textTimer = setTimeout(() => {
      setShowText(true);
      setPhase('show');
    }, 5600);

    const fadeOutTimer = setTimeout(() => {
      setPhase('fadeOut');
    }, 8600);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 9500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(lineTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, isManualTrigger]);

  const handleSkip = () => {
    setPhase('fadeOut');
    setTimeout(onComplete, 500);
  };

  if (phase === 'hidden') return null;

  const getOverlayOpacity = () => {
    if (phase === 'fadeIn') return 'opacity-0';
    if (phase === 'show') return 'opacity-100';
    return 'opacity-0';
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-noir-shadow transition-opacity duration-1000 ${getOverlayOpacity()}`}>
      {/* Animated vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-noir-shadow/70 to-black animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-detective-glow/5 via-transparent to-transparent" />

      {/* Main content container */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        {/* Top decorative border */}
        <div className="mb-12 flex items-center justify-center gap-6">
          <div className={`h-px bg-gradient-to-r from-transparent via-detective-glow to-detective-glow transition-all duration-1000 ${lineExpanded ? 'w-32' : 'w-0'}`} />
          <div className={`w-4 h-4 rotate-45 border-2 border-detective-glow transition-all duration-700 ${lineExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
          <div className={`h-px bg-gradient-to-l from-transparent via-detective-glow to-detective-glow transition-all duration-1000 ${lineExpanded ? 'w-32' : 'w-0'}`} />
        </div>

        {/* Main title with staggered animation */}
        <div className={`space-y-6 transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-bold text-detective-glow tracking-widest drop-shadow-[0_0_10px_rgba(218,165,32,0.3)]">
              HI, I'M MAHDI
            </h1>
          </div>

          {/* Animated underline */}
          <div className="flex justify-center">
            <div className="h-1 bg-gradient-to-r from-transparent via-detective-glow/60 to-transparent" style={{ width: '300px' }} />
          </div>
        </div>

        {/* Subtitle with delayed entrance */}
        <div className={`mt-12 space-y-8 transition-all duration-1000 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-4xl text-detective-paper tracking-wide font-light drop-shadow-[0_0_20px_rgba(245,222,179,0.3)]">
            Welcome to my Sherlock Holmes themed interactive resume
          </p>

          {/* Instructions with typewriter effect */}
          <div className="space-y-4 text-detective-paper/90 text-2xl font-light max-w-2xl mx-auto">
            <p className="drop-shadow-[0_0_10px_rgba(245,222,179,0.2)]" style={{ animation: 'fadeIn 0.8s ease-out 0.5s both' }}>
              Click around and explore
            </p>
            <p className="drop-shadow-[0_0_10px_rgba(245,222,179,0.2)]" style={{ animation: 'fadeIn 0.8s ease-out 1s both' }}>
              Everything on the detective board is clickable
            </p>
          </div>
        </div>

        {/* Bottom decorative border */}
        <div className={`mt-16 flex items-center justify-center gap-6 transition-all duration-1000 delay-500 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`h-px bg-gradient-to-r from-transparent via-detective-glow to-detective-glow transition-all duration-1000 ${lineExpanded ? 'w-32' : 'w-0'}`} />
          <div className={`w-4 h-4 rotate-45 border-2 border-detective-glow transition-all duration-700 ${lineExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
          <div className={`h-px bg-gradient-to-l from-transparent via-detective-glow to-detective-glow transition-all duration-1000 ${lineExpanded ? 'w-32' : 'w-0'}`} />
        </div>

        {/* Skip button with glow effect */}
        <button
          onClick={handleSkip}
          className={`mt-12 px-8 py-3 text-detective-paper/70 hover:text-detective-glow hover:drop-shadow-[0_0_15px_rgba(218,165,32,0.5)] transition-all duration-300 text-lg tracking-widest border border-detective-paper/30 hover:border-detective-glow/50 rounded backdrop-blur-sm ${showText ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1s' }}
        >
          SKIP →
        </button>
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-repeat animate-flicker" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
      </div>

      {/* Spotlight rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-detective-glow/20 to-transparent opacity-50 animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-detective-glow/10 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute top-0 left-2/3 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-detective-glow/10 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>
    </div>
  );
};

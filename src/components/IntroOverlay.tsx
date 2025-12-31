import { useEffect, useState } from 'react';
import { isMobileDevice } from '@/utils/detectMobile';

/**
 * Intro overlay that appears on first visit
 * Film noir styled welcome animation
 */
interface IntroOverlayProps {
  onComplete: () => void;
  isManualTrigger?: boolean; // True when triggered by '999' keypress
}

export const IntroOverlay = ({ onComplete, isManualTrigger = false }: IntroOverlayProps) => {
  const [phase, setPhase] = useState<'hidden' | 'fadeIn' | 'show' | 'fadeOut'>('show');
  const [lineExpanded, setLineExpanded] = useState(false);
  const [showText, setShowText] = useState(false);

  console.log('IntroOverlay rendering - phase:', phase, 'lineExpanded:', lineExpanded, 'showText:', showText);

  useEffect(() => {
    console.log('IntroOverlay mounted - isManualTrigger:', isManualTrigger);
    if (isManualTrigger) {
      // Manual trigger - show immediately and stay until skip
      setPhase('show');
      setLineExpanded(true);
      setShowText(true);
      // No auto-close for manual trigger
      return;
    }

    // Auto trigger - show immediately with animations, then auto-close after 6 seconds
    // Start animations immediately
    const lineTimer = setTimeout(() => {
      setLineExpanded(true);
    }, 100);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 300);

    const fadeOutTimer = setTimeout(() => {
      setPhase('fadeOut');
    }, 5000);

    const completeTimer = setTimeout(() => {
      console.log('IntroOverlay completing and calling onComplete');
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, isManualTrigger]);

  if (phase === 'hidden') return null;

  const getOverlayOpacity = () => {
    if (phase === 'fadeIn') return 'opacity-0';
    if (phase === 'show') return 'opacity-100';
    return 'opacity-0';
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${getOverlayOpacity()}`} style={{ pointerEvents: 'auto', willChange: 'opacity' }}>

      {/* Main content container */}
      <div className="relative z-10 text-center px-8 max-w-4xl" style={{ willChange: 'transform, opacity' }}>
        {/* Main title */}
        <div className={`space-y-6 transition-opacity duration-700 ${showText ? 'opacity-100' : 'opacity-0'}`} style={{ willChange: 'opacity' }}>
          <h1 className="text-7xl md:text-8xl font-bold text-detective-glow tracking-widest">
            HI, I'M MAHDI
          </h1>

          {/* Animated underline */}
          <div className="flex justify-center">
            <div className="h-1 bg-detective-glow/60" style={{ width: '300px' }} />
          </div>
        </div>

        {/* Subtitle */}
        <div className={`mt-12 space-y-8 transition-opacity duration-700 ${showText ? 'opacity-100' : 'opacity-0'}`} style={{ willChange: 'opacity', transitionDelay: '200ms' }}>
          <p className="text-4xl text-detective-paper tracking-wide font-light">
            Welcome to my Sherlock Holmes themed interactive resume
          </p>

          {/* Instructions */}
          <div className="text-detective-paper/90 text-2xl font-light max-w-2xl mx-auto">
            <p>{isMobileDevice() ? 'Try clicking around' : 'WASD to move • Click R for board'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

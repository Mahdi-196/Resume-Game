import { useState, useRef, useEffect } from 'react';
import { DetectiveOffice, DetectiveOfficeRef } from '@/components/DetectiveOffice';
import { ResumeOverlay } from '@/components/ResumeOverlay';
import { DetectiveErrorBoundary } from '@/components/DetectiveErrorBoundary';
import { IntroOverlay } from '@/components/IntroOverlay';

const Index = () => {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [selectedCaseFile, setSelectedCaseFile] = useState<'about' | 'education' | 'skills' | 'projects' | null>(null);
  const detectiveOfficeRef = useRef<DetectiveOfficeRef>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [isManualTrigger, setIsManualTrigger] = useState(false);
  const keyPressTimesRef = useRef<number[]>([]);

  // Show intro on every page load
  useEffect(() => {
    setShowIntro(true);
    setIsManualTrigger(false);
  }, []);

  // Listen for triple '9' press to trigger intro
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '9') {
        const now = Date.now();
        keyPressTimesRef.current.push(now);

        // Keep only presses within the last 1 second
        keyPressTimesRef.current = keyPressTimesRef.current.filter(
          time => now - time < 1000
        );

        // Check if we have 3 presses within 1 second
        if (keyPressTimesRef.current.length >= 3) {
          setShowIntro(true);
          setIsManualTrigger(true); // Mark as manual trigger
          keyPressTimesRef.current = []; // Reset
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleInteraction = (type: string, data?: any) => {
    switch (type) {
      case 'lamp':
        // Toggle lamp glow effect
        console.log('Banker lamp clicked');
        break;
      case 'typewriter':
        setActiveOverlay('typewriter');
        break;
      case 'cat':
        setActiveOverlay('cat');
        break;
      default:
        console.log('Interaction:', type, data);
    }
  };

  const handleCloseOverlay = () => {
    setActiveOverlay(null);
  };

  // Called when user clicks on a case file on the 3D board (or back button)
  const handleCaseFileClick = (caseFile: 'about' | 'education' | 'skills' | 'projects' | null) => {
    console.log('Case file clicked:', caseFile);
    setSelectedCaseFile(caseFile);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} isManualTrigger={isManualTrigger} />}
      <DetectiveErrorBoundary>
        <DetectiveOffice
          ref={detectiveOfficeRef}
          onInteraction={handleInteraction}
          onCaseFileClick={handleCaseFileClick}
          selectedCaseFile={selectedCaseFile}
          overlayVisible={selectedCaseFile !== null}
        />
      </DetectiveErrorBoundary>
      <ResumeOverlay content={activeOverlay} onClose={handleCloseOverlay} />
    </div>
  );
};

export default Index;

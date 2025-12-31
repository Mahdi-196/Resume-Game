import { useState, useRef } from 'react';
import { Text } from '@react-three/drei';
import { COLORS } from '../constants';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Interactive email copy component with hold-to-copy progress indicator
 * User must hold for 1 second to copy the email
 */
interface CopyEmailButtonProps {
  position: [number, number, number];
  email: string;
}

export const CopyEmailButton = ({
  position,
  email
}: CopyEmailButtonProps) => {
  const textScale = getTextScale();
  const [holdProgress, setHoldProgress] = useState(0);
  const [showCopied, setShowCopied] = useState(false);
  const holdStartRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    holdStartRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      if (holdStartRef.current) {
        const elapsed = Date.now() - holdStartRef.current;
        const progress = Math.min(elapsed / 1000, 1);
        setHoldProgress(progress);

        if (progress >= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);

          // Copy to clipboard
          navigator.clipboard.writeText(email).then(() => {
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
          });

          setHoldProgress(0);
          holdStartRef.current = null;
        }
      }
    }, 16);
  };

  const handlePointerUp = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setHoldProgress(0);
    holdStartRef.current = null;
  };

  return (
    <group position={position}>
      <group
        onClick={(e) => e.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
          handlePointerUp();
        }}
      >
        {/* Button background */}
        <mesh>
          <planeGeometry args={[3.5, 0.24]} />
          <meshStandardMaterial color="#CD853F" roughness={0.6} />
        </mesh>

        {/* Email text or "Copied!" */}
        <Text
          position={[0.1, 0, 0.001]}
          fontSize={0.11 * textScale}
          color={COLORS.primaryText}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.01}
        >
          {showCopied ? 'Copied!' : email}
        </Text>

        {/* Progress circle background */}
        <mesh position={[-1.6, 0, 0.001]}>
          <ringGeometry args={[0.1, 0.12, 32]} />
          <meshBasicMaterial color={COLORS.primaryText} opacity={0.3} transparent />
        </mesh>

        {/* Progress circle fill */}
        {holdProgress > 0 && (
          <mesh position={[-1.6, 0, 0.002]} rotation={[0, 0, -Math.PI / 2]}>
            <circleGeometry args={[0.11, 32, 0, holdProgress * Math.PI * 2]} />
            <meshBasicMaterial color={COLORS.primaryText} opacity={0.7} transparent />
          </mesh>
        )}
      </group>
    </group>
  );
};

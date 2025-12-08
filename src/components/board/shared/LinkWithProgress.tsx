import { useState, useRef } from 'react';
import { Text } from '@react-three/drei';
import { COLORS } from '../constants';

/**
 * Interactive link component with hold-to-open progress indicator
 * User must hold for 2 seconds to open the link
 */
interface LinkWithProgressProps {
  position: [number, number, number];
  url?: string;
  label?: string;
}

export const LinkWithProgress = ({
  position,
  url = 'https://refocused.app',
  label = '🔗 Live Site'
}: LinkWithProgressProps) => {
  const [holdProgress, setHoldProgress] = useState(0);
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
          window.open(url, '_blank');
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
        {/* Link background */}
        <mesh>
          <planeGeometry args={[2.5, 0.24]} />
          <meshStandardMaterial color="#CD853F" roughness={0.6} />
        </mesh>

        {/* Link text */}
        <Text
          position={[0.1, 0, 0.001]}
          fontSize={0.11}
          color={COLORS.primaryText}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.01}
        >
          {label}
        </Text>

        {/* Progress circle background */}
        <mesh position={[-1.05, 0, 0.001]}>
          <ringGeometry args={[0.1, 0.12, 32]} />
          <meshBasicMaterial color={COLORS.primaryText} opacity={0.3} transparent />
        </mesh>

        {/* Progress circle fill */}
        {holdProgress > 0 && (
          <mesh position={[-1.05, 0, 0.002]} rotation={[0, 0, -Math.PI / 2]}>
            <circleGeometry args={[0.11, 32, 0, holdProgress * Math.PI * 2]} />
            <meshBasicMaterial color={COLORS.primaryText} opacity={0.7} transparent />
          </mesh>
        )}
      </group>
    </group>
  );
};

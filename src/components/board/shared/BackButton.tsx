import { memo, useRef } from 'react';
import { Text } from '@react-three/drei';
import { COLORS, SHARED_MATERIALS } from '../constants';
import { getTextScale, isMobileDevice } from '@/utils/detectMobile';

/**
 * Reusable Back Button component for detail views
 * Positioned at top-left of the board
 * Memoized to prevent unnecessary re-renders
 */
interface BackButtonProps {
  onClick: () => void;
  position?: [number, number, number];
}

export const BackButton = memo(({ onClick, position = [-5.5, 2.8, 0.04] }: BackButtonProps) => {
  const textScale = getTextScale();
  const isMobile = isMobileDevice();
  const clickTimeoutRef = useRef<number | null>(null);

  const handleClick = (e: any) => {
    e.stopPropagation();

    // Prevent multiple rapid clicks (debounce)
    if (clickTimeoutRef.current) return;

    onClick();

    // Set timeout to prevent rapid clicks
    clickTimeoutRef.current = window.setTimeout(() => {
      clickTimeoutRef.current = null;
    }, 300);
  };

  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onPointerEnter={() => (document.body.style.cursor = 'pointer')}
      onPointerLeave={() => (document.body.style.cursor = 'auto')}
    >
      <mesh>
        <planeGeometry args={isMobile ? [1.5, 0.5] : [1.2, 0.4]} />
        <primitive object={SHARED_MATERIALS.darkBrown} attach="material" />
      </mesh>
      <Text position={[0, 0, 0.01]} fontSize={isMobile ? 0.13 : 0.15} color={COLORS.gold} anchorX="center" anchorY="middle">
        ← BACK
      </Text>
    </group>
  );
});

BackButton.displayName = 'BackButton';

import { Text } from '@react-three/drei';
import { COLORS } from '../constants';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Reusable Back Button component for detail views
 * Positioned at top-left of the board
 */
interface BackButtonProps {
  onClick: () => void;
  position?: [number, number, number];
}

export const BackButton = ({ onClick, position = [-5.5, 2.8, 0.04] }: BackButtonProps) => {
  const textScale = getTextScale(); // 1.5x on mobile, 1x on desktop

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerEnter={() => (document.body.style.cursor = 'pointer')}
      onPointerLeave={() => (document.body.style.cursor = 'auto')}
    >
      <mesh>
        <planeGeometry args={[1.2, 0.4]} />
        <meshStandardMaterial color={COLORS.darkBrown} />
      </mesh>
      <Text position={[0, 0, 0.01]} fontSize={0.15 * textScale} color={COLORS.gold} anchorX="center" anchorY="middle">
        ← BACK
      </Text>
    </group>
  );
};

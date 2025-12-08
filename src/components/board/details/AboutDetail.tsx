import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { COLORS } from '../constants';
import type { DetailViewProps } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * About Me detail view - Clean minimal design
 */
export const AboutDetail = ({ onBack }: DetailViewProps) => {
  const textScale = getTextScale();
  return (
    <>
      {/* Back Button */}
      <BackButton onClick={onBack} />

      {/* Header Banner */}
      <mesh position={[0, 2.5, 0.03]}>
        <planeGeometry args={[11, 0.7]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text
        position={[0, 2.5, 0.04]}
        fontSize={0.32 * textScale}
        color={COLORS.gold}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
      >
        CASE FILE #001: ABOUT ME
      </Text>
    </>
  );
};

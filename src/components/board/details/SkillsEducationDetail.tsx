import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { COLORS, SHARED_MATERIALS } from '../constants';
import type { DetailViewProps } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Skills & Education detail view - Clean minimal design
 */
export const SkillsEducationDetail = ({ onBack }: DetailViewProps) => {
  const textScale = getTextScale();
  return (
    <>
      {/* Back Button */}
      <BackButton onClick={onBack} />

      {/* Header */}
      <mesh position={[0, 2.5, 0.03]}>
        <planeGeometry args={[11, 0.7]} />
        <primitive object={SHARED_MATERIALS.darkRed} attach="material" />
      </mesh>
      <Text
        position={[0, 2.5, 0.04]}
        fontSize={0.32 * textScale}
        color={COLORS.gold}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
      >
        CASE FILE #003: SKILLS & EDUCATION
      </Text>
    </>
  );
};

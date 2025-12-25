import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { COLORS, SHARED_MATERIALS } from '../constants';
import { DetailViewProps } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Subject Profile Detail - Empty placeholder
 */
export const SubjectProfileDetail = ({ onBack }: DetailViewProps) => {
  const textScale = getTextScale();

  return (
    <group>
      {/* Back button at the top */}
      <BackButton onClick={onBack} position={[-5.5, 2.8, 0.04]} />

      {/* Header Banner */}
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
        SUBJECT PROFILE
      </Text>
    </group>
  );
};

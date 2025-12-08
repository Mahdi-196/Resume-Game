import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import type { DetailViewProps } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Education detail view - Formal education and self-taught learning
 */
export const EducationDetail = ({ onBack }: DetailViewProps) => {
  const textScale = getTextScale();
  return (
    <>
      {/* Back Button */}
      <BackButton onClick={onBack} />

      {/* Header */}
      <mesh position={[0, 2.5, 0.03]}>
        <planeGeometry args={[10, 0.6]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[0, 2.5, 0.04]} fontSize={0.28 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        CASE FILE #002: EDUCATION
      </Text>

      {/* Education Card 1 - Formal Education */}
      <mesh position={[-3.5, 0.8, 0.03]}>
        <planeGeometry args={[4.5, 2.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[-3.5, 2, 0.04]}>
        <planeGeometry args={[4.4, 0.3]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[-3.5, 2, 0.05]} fontSize={0.15 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        FORMAL EDUCATION
      </Text>
      <Text position={[-3.5, 1.5, 0.05]} fontSize={0.13 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        Computer Science
      </Text>
      <Text position={[-3.5, 1.25, 0.05]} fontSize={0.1 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
        Bachelor's Degree
      </Text>
      <Text position={[-3.5, 0.9, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        Focus: Software Engineering,
      </Text>
      <Text position={[-3.5, 0.75, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        Web Development, Data
      </Text>
      <Text position={[-3.5, 0.6, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        Structures & Algorithms
      </Text>
      <Text position={[-3.5, 0.25, 0.05]} fontSize={0.08 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
        GPA: 3.8/4.0
      </Text>

      {/* Education Card 2 - Self-Taught Learning */}
      <mesh position={[3.5, 0.8, 0.03]}>
        <planeGeometry args={[4.5, 2.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[3.5, 2, 0.04]}>
        <planeGeometry args={[4.4, 0.3]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[3.5, 2, 0.05]} fontSize={0.15 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        SELF-TAUGHT LEARNING
      </Text>
      <Text position={[3.5, 1.5, 0.05]} fontSize={0.13 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        Continuous Development
      </Text>
      <Text position={[3.5, 1.15, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Advanced React & TypeScript
      </Text>
      <Text position={[3.5, 1.0, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Three.js & WebGL Graphics
      </Text>
      <Text position={[3.5, 0.85, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Cloud Architecture (AWS)
      </Text>
      <Text position={[3.5, 0.7, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Microservices & DevOps
      </Text>
      <Text position={[3.5, 0.55, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • UI/UX Design Principles
      </Text>
      <Text position={[3.5, 0.2, 0.05]} fontSize={0.08 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
        100+ Online Courses Completed
      </Text>

      {/* Push pins */}
      <PushPin position={[-3.5, 2.3, 0.05]} />
      <PushPin position={[3.5, 2.3, 0.05]} />
    </>
  );
};

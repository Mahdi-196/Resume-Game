import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import type { DetailViewProps } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Skills detail view - Frontend, Backend, and DevOps skills
 */
export const SkillsDetail = ({ onBack }: DetailViewProps) => {
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
        CASE FILE #003: SKILLS
      </Text>

      {/* Frontend Skills Card */}
      <mesh position={[-3.5, 0.8, 0.03]}>
        <planeGeometry args={[4.2, 2.8]} />
        <meshStandardMaterial color={COLORS.yellow} />
      </mesh>
      <mesh position={[-3.5, 2, 0.04]}>
        <planeGeometry args={[4.1, 0.3]} />
        <meshStandardMaterial color={COLORS.darkBrown} />
      </mesh>
      <Text position={[-3.5, 2, 0.05]} fontSize={0.15 * textScale} color={COLORS.gold} anchorX="center" anchorY="middle">
        FRONTEND
      </Text>
      <Text position={[-3.5, 1.55, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ React & Next.js
      </Text>
      <Text position={[-3.5, 1.35, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ TypeScript
      </Text>
      <Text position={[-3.5, 1.15, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Three.js & R3F
      </Text>
      <Text position={[-3.5, 0.95, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Tailwind CSS
      </Text>
      <Text position={[-3.5, 0.75, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Redux & Zustand
      </Text>
      <Text position={[-3.5, 0.55, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Responsive Design
      </Text>
      <Text position={[-3.5, 0.35, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Accessibility
      </Text>

      {/* Backend Skills Card */}
      <mesh position={[0, 0.8, 0.03]}>
        <planeGeometry args={[4.2, 2.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[0, 2, 0.04]}>
        <planeGeometry args={[4.1, 0.3]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[0, 2, 0.05]} fontSize={0.15 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        BACKEND
      </Text>
      <Text position={[0, 1.55, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Node.js & Express
      </Text>
      <Text position={[0, 1.35, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Python & FastAPI
      </Text>
      <Text position={[0, 1.15, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ PostgreSQL & MongoDB
      </Text>
      <Text position={[0, 0.95, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ GraphQL & REST APIs
      </Text>
      <Text position={[0, 0.75, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Redis & Caching
      </Text>
      <Text position={[0, 0.55, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ WebSockets
      </Text>
      <Text position={[0, 0.35, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Microservices
      </Text>

      {/* DevOps & Tools Card */}
      <mesh position={[3.5, 0.8, 0.03]}>
        <planeGeometry args={[4.2, 2.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[3.5, 2, 0.04]}>
        <planeGeometry args={[4.1, 0.3]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[3.5, 2, 0.05]} fontSize={0.15 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        DEVOPS & TOOLS
      </Text>
      <Text position={[3.5, 1.55, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ AWS & Cloud
      </Text>
      <Text position={[3.5, 1.35, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Docker & K8s
      </Text>
      <Text position={[3.5, 1.15, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ CI/CD Pipelines
      </Text>
      <Text position={[3.5, 0.95, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Git & GitHub
      </Text>
      <Text position={[3.5, 0.75, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Linux & Bash
      </Text>
      <Text position={[3.5, 0.55, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Nginx & Load Bal.
      </Text>
      <Text position={[3.5, 0.35, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Monitoring Tools
      </Text>

      {/* Push pins */}
      <PushPin position={[-3.5, 2.3, 0.05]} />
      <PushPin position={[0, 2.3, 0.05]} />
      <PushPin position={[3.5, 2.3, 0.05]} />
    </>
  );
};

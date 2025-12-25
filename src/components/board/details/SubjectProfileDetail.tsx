import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { PushPin } from '../shared/PushPin';
import { COLORS, SHARED_MATERIALS } from '../constants';
import { DetailViewProps } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Subject Profile Detail - displays About, Skills, and Education all in one view
 * No sub-card navigation - shows everything directly
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

      {/* Skills Section - Top Row (3 cards: Frontend, Backend, DevOps) */}
      {/* Frontend Skills Card */}
      <mesh position={[-3.5, 0.4, 0.03]}>
        <planeGeometry args={[4.2, 2.8]} />
        <meshStandardMaterial color={COLORS.yellow} />
      </mesh>
      <mesh position={[-3.5, 1.6, 0.04]}>
        <planeGeometry args={[4.1, 0.3]} />
        <meshStandardMaterial color={COLORS.darkBrown} />
      </mesh>
      <Text position={[-3.5, 1.6, 0.05]} fontSize={0.15 * textScale} color={COLORS.gold} anchorX="center" anchorY="middle">
        FRONTEND
      </Text>
      <Text position={[-3.5, 1.15, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ React & Next.js
      </Text>
      <Text position={[-3.5, 0.95, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ TypeScript
      </Text>
      <Text position={[-3.5, 0.75, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Three.js & R3F
      </Text>
      <Text position={[-3.5, 0.55, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Tailwind CSS
      </Text>
      <Text position={[-3.5, 0.35, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Redux & Zustand
      </Text>
      <Text position={[-3.5, 0.15, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Responsive Design
      </Text>
      <Text position={[-3.5, -0.05, 0.05]} fontSize={0.1 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        ⭐ Accessibility
      </Text>

      {/* Backend Skills Card */}
      <mesh position={[0, 0.4, 0.03]}>
        <planeGeometry args={[4.2, 2.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[0, 1.6, 0.04]}>
        <planeGeometry args={[4.1, 0.3]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[0, 1.6, 0.05]} fontSize={0.15 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        BACKEND
      </Text>
      <Text position={[0, 1.15, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Node.js & Express
      </Text>
      <Text position={[0, 0.95, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Python & FastAPI
      </Text>
      <Text position={[0, 0.75, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ PostgreSQL & MongoDB
      </Text>
      <Text position={[0, 0.55, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ GraphQL & REST APIs
      </Text>
      <Text position={[0, 0.35, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Redis & Caching
      </Text>
      <Text position={[0, 0.15, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ WebSockets
      </Text>
      <Text position={[0, -0.05, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Microservices
      </Text>

      {/* DevOps & Tools Card */}
      <mesh position={[3.5, 0.4, 0.03]}>
        <planeGeometry args={[4.2, 2.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[3.5, 1.6, 0.04]}>
        <planeGeometry args={[4.1, 0.3]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[3.5, 1.6, 0.05]} fontSize={0.15 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        DEVOPS & TOOLS
      </Text>
      <Text position={[3.5, 1.15, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ AWS & Cloud
      </Text>
      <Text position={[3.5, 0.95, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Docker & K8s
      </Text>
      <Text position={[3.5, 0.75, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ CI/CD Pipelines
      </Text>
      <Text position={[3.5, 0.55, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Git & GitHub
      </Text>
      <Text position={[3.5, 0.35, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Linux & Bash
      </Text>
      <Text position={[3.5, 0.15, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Nginx & Load Bal.
      </Text>
      <Text position={[3.5, -0.05, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
        ⭐ Monitoring Tools
      </Text>

      {/* Push pins for skills cards */}
      <PushPin position={[-3.5, 1.9, 0.05]} />
      <PushPin position={[0, 1.9, 0.05]} />
      <PushPin position={[3.5, 1.9, 0.05]} />

      {/* Education Section - Bottom Row (2 cards: Formal Education, Self-Taught) */}
      {/* Education Card 1 - Formal Education */}
      <mesh position={[-3.5, -2.0, 0.03]}>
        <planeGeometry args={[4.5, 2.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[-3.5, -1.2, 0.04]}>
        <planeGeometry args={[4.4, 0.3]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[-3.5, -1.2, 0.05]} fontSize={0.15 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        FORMAL EDUCATION
      </Text>
      <Text position={[-3.5, -1.7, 0.05]} fontSize={0.13 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        Computer Science
      </Text>
      <Text position={[-3.5, -1.95, 0.05]} fontSize={0.1 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
        Bachelor's Degree
      </Text>
      <Text position={[-3.5, -2.3, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        Focus: Software Engineering,
      </Text>
      <Text position={[-3.5, -2.45, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        Web Development, Data
      </Text>
      <Text position={[-3.5, -2.6, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        Structures & Algorithms
      </Text>
      <Text position={[-3.5, -2.95, 0.05]} fontSize={0.08 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
        GPA: 3.8/4.0
      </Text>

      {/* Education Card 2 - Self-Taught Learning */}
      <mesh position={[3.5, -2.0, 0.03]}>
        <planeGeometry args={[4.5, 2.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} />
      </mesh>
      <mesh position={[3.5, -1.2, 0.04]}>
        <planeGeometry args={[4.4, 0.3]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[3.5, -1.2, 0.05]} fontSize={0.15 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        SELF-TAUGHT LEARNING
      </Text>
      <Text position={[3.5, -1.7, 0.05]} fontSize={0.13 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        Continuous Development
      </Text>
      <Text position={[3.5, -2.05, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Advanced React & TypeScript
      </Text>
      <Text position={[3.5, -2.2, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Three.js & WebGL Graphics
      </Text>
      <Text position={[3.5, -2.35, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Cloud Architecture (AWS)
      </Text>
      <Text position={[3.5, -2.5, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • Microservices & DevOps
      </Text>
      <Text position={[3.5, -2.65, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={4}>
        • UI/UX Design Principles
      </Text>
      <Text position={[3.5, -3.0, 0.05]} fontSize={0.08 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
        100+ Online Courses Completed
      </Text>

      {/* Push pins for education cards */}
      <PushPin position={[-3.5, -0.9, 0.05]} />
      <PushPin position={[3.5, -0.9, 0.05]} />
    </group>
  );
};

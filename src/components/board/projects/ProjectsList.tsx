import { Text } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Projects list view - displays 5 project cards in a grid layout
 */
interface ProjectsListProps {
  onProjectSelect: (project: 'refocused' | 'resilinet' | 'medesense' | 'respawnroom' | 'sideprojects' | null) => void;
}

export const ProjectsList = ({ onProjectSelect }: ProjectsListProps) => {
  const textScale = getTextScale(); // 1.5x on mobile, 1x on desktop

  return (
    <>
      {/* TOP ROW - ReFocused Center (Larger), ResiliNet Left, MedeSense Right */}

      {/* Project 1 - ReFocused (Top Center - Larger, Clickable) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('refocused');
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[0, 0.3, 0.03]}>
          <boxGeometry args={[3.8, 2.4, 0.03]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.5, 0.045]}>
          <boxGeometry args={[3.8, 0.22, 0.025]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[-1.675, 1.5, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[-1.675, 1.5, 0.07]} fontSize={0.13 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
          #001
        </Text>
        <Text position={[0, 1.05, 0.05]} fontSize={0.22 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          ReFocused
        </Text>
        <Text position={[0, 0.65, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.5}>
          Advanced productivity platform
        </Text>
        <Text position={[0, 0.48, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.5}>
          with AI-powered focus sessions
        </Text>
        <Text position={[0, 0.31, 0.05]} fontSize={0.1 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.5}>
          and intelligent task management
        </Text>
        <Text position={[0, -0.05, 0.05]} fontSize={0.09 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          React • TypeScript • Node.js
        </Text>
        <Text position={[0, -0.22, 0.05]} fontSize={0.09 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          PostgreSQL • Redis • OpenAI
        </Text>
        <PushPin position={[0, 1.5, 0.07]} radius={0.09} />
      </group>

      {/* Project 2 - ResiliNet (Top Left - Clickable) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('resilinet');
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[-4.5, 0.3, 0.03]}>
          <boxGeometry args={[3.0, 2.0, 0.03]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[-4.5, 1.3, 0.045]}>
          <boxGeometry args={[3.0, 0.2, 0.025]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[-5.775, 1.3, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[-5.775, 1.3, 0.07]} fontSize={0.13 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
          #002
        </Text>
        <Text position={[-4.5, 0.9, 0.05]} fontSize={0.18 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          ResiliNet
        </Text>
        <Text position={[-4.5, 0.55, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.7}>
          Network resilience
        </Text>
        <Text position={[-4.5, 0.4, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.7}>
          and disaster recovery
        </Text>
        <Text position={[-4.5, 0.25, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.7}>
          platform
        </Text>
        <Text position={[-4.5, -0.1, 0.05]} fontSize={0.08 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          React • Node.js • Docker
        </Text>
        <Text position={[-4.5, -0.25, 0.05]} fontSize={0.08 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Kubernetes • Terraform
        </Text>
        <PushPin position={[-4.5, 1.3, 0.07]} />
      </group>

      {/* Project 3 - MedeSense (Top Right - Clickable) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('medesense');
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[4.5, 0.3, 0.03]}>
          <boxGeometry args={[3.0, 2.0, 0.03]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[4.5, 1.3, 0.045]}>
          <boxGeometry args={[3.0, 0.2, 0.025]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[3.225, 1.3, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[3.225, 1.3, 0.07]} fontSize={0.13 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
          #003
        </Text>
        <Text position={[4.5, 0.9, 0.05]} fontSize={0.18 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          MedeSense
        </Text>
        <Text position={[4.5, 0.55, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.7}>
          AI Healthcare Chatbot
        </Text>
        <Text position={[4.5, 0.4, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.7}>
          HIPAA Compliant
        </Text>
        <Text position={[4.5, 0.25, 0.05]} fontSize={0.09 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.7}>
          Medical Assistant
        </Text>
        <Text position={[4.5, -0.1, 0.05]} fontSize={0.08 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Next.js • AI/ML • AWS
        </Text>
        <Text position={[4.5, -0.25, 0.05]} fontSize={0.08 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          WebSocket • HIPAA
        </Text>
        <PushPin position={[4.5, 1.3, 0.07]} />
      </group>

      {/* BOTTOM ROW - RespawnRoom Left, 3D Resume Middle, Side Projects Right */}

      {/* Project 4 - RespawnRoom (Bottom Left - Smaller, Clickable) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('respawnroom');
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[-4, -2.1, 0.03]}>
          <boxGeometry args={[2.5, 1.6, 0.03]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[-4, -1.3, 0.045]}>
          <boxGeometry args={[2.5, 0.18, 0.025]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[-5.025, -1.3, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[-5.025, -1.3, 0.07]} fontSize={0.13 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
          #004
        </Text>
        <Text position={[-4, -1.65, 0.05]} fontSize={0.16 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          RespawnRoom
        </Text>
        <Text position={[-4, -1.9, 0.05]} fontSize={0.08 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.3}>
          Gaming community
        </Text>
        <Text position={[-4, -2.03, 0.05]} fontSize={0.08 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.3}>
          platform for events
        </Text>
        <Text position={[-4, -2.16, 0.05]} fontSize={0.08 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.3}>
          and tournaments
        </Text>
        <Text position={[-4, -2.4, 0.05]} fontSize={0.075 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          React • GraphQL
        </Text>
        <Text position={[-4, -2.53, 0.05]} fontSize={0.075 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          MongoDB • PubNub
        </Text>
        <PushPin position={[-4, -1.3, 0.07]} radius={0.07} />
      </group>

      {/* Project 5 - 3D Resume (Bottom Middle - Smaller) */}
      <mesh position={[0, -2.1, 0.03]}>
        <boxGeometry args={[2.5, 1.6, 0.03]} />
        <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
      </mesh>
      <mesh position={[0, -1.3, 0.045]}>
        <boxGeometry args={[2.5, 0.18, 0.025]} />
        <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
      </mesh>
      <mesh position={[-1.025, -1.3, 0.06]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color={COLORS.darkRed} />
      </mesh>
      <Text position={[-1.025, -1.3, 0.07]} fontSize={0.13 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
        #005
      </Text>
      <Text position={[0, -1.65, 0.05]} fontSize={0.16 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
        3D Resume
      </Text>
      <Text position={[0, -1.9, 0.05]} fontSize={0.08 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.3}>
        Interactive detective
      </Text>
      <Text position={[0, -2.03, 0.05]} fontSize={0.08 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.3}>
        themed 3D portfolio
      </Text>
      <Text position={[0, -2.16, 0.05]} fontSize={0.08 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.3}>
          experience
      </Text>
      <Text position={[0, -2.4, 0.05]} fontSize={0.075 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
        React Three Fiber
      </Text>
      <Text position={[0, -2.53, 0.05]} fontSize={0.075 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
        Three.js • TypeScript
      </Text>
      <PushPin position={[0, -1.3, 0.07]} radius={0.07} />

      {/* Project 6 - Side Projects (Bottom Right - Smaller, Clickable) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('sideprojects');
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[4, -2.1, 0.03]}>
          <boxGeometry args={[2.5, 1.6, 0.03]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[4, -1.3, 0.045]}>
          <boxGeometry args={[2.5, 0.18, 0.025]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[2.975, -1.3, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[2.975, -1.3, 0.07]} fontSize={0.13 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
          #006
        </Text>
        <Text position={[4, -1.65, 0.05]} fontSize={0.16 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          Side Projects
        </Text>
        <Text position={[4, -1.9, 0.05]} fontSize={0.08 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.3}>
          Various experimental
        </Text>
        <Text position={[4, -2.03, 0.05]} fontSize={0.08 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.3}>
          projects and open-
        </Text>
        <Text position={[4, -2.16, 0.05]} fontSize={0.08 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={2.3}>
          source contributions
        </Text>
        <Text position={[4, -2.4, 0.05]} fontSize={0.075 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Multiple Technologies
        </Text>
        <Text position={[4, -2.53, 0.05]} fontSize={0.075 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          GitHub Repositories
        </Text>
        <PushPin position={[4, -1.3, 0.07]} radius={0.07} />
      </group>
    </>
  );
};

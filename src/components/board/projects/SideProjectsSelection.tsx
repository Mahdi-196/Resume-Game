import { Text } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Side Projects Selection Grid - 4 clickable project folders
 * Click to view detailed project information with papers
 */
interface SideProjectsSelectionProps {
  onProjectSelect: (project: 'medesense' | 'popuptrivia' | 'vibelink' | 'graphibooks') => void;
}

export const SideProjectsSelection = ({ onProjectSelect }: SideProjectsSelectionProps) => {
  const textScale = getTextScale();
  return (
    <>
      {/* Folder 1 - MedeSense (Top Left) */}
      <group
        position={[-3.2, 0.8, 0.04]}
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('medesense');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.5, 2.5, 0.04]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.25, 0.016]}>
          <boxGeometry args={[3.5, 0.3, 0.03]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[-1.5, 1.25, 0.032]}>
          <planeGeometry args={[0.6, 0.32]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[-1.5, 1.25, 0.042]} fontSize={0.16 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
          #01
        </Text>
        <Text position={[0, 0.7, 0.02]} fontSize={0.23 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          MedeSense
        </Text>
        <Text position={[0, 0.35, 0.02]} fontSize={0.12 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.0}>
          AI Healthcare Chatbot
        </Text>
        <Text position={[0, 0.20, 0.02]} fontSize={0.12 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.0}>
          HIPAA Compliant
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.10 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Next.js • AI/ML
        </Text>
        <Text position={[0, -0.30, 0.02]} fontSize={0.10 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          AWS • WebSocket
        </Text>
        <PushPin position={[0, 1.25, 0.06]} radius={0.10} />
      </group>

      {/* Folder 2 - PopUpTrivia (Top Right) */}
      <group
        position={[3.2, 0.8, 0.04]}
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('popuptrivia');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.5, 2.5, 0.04]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.25, 0.016]}>
          <boxGeometry args={[3.5, 0.3, 0.03]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[-1.5, 1.25, 0.032]}>
          <planeGeometry args={[0.6, 0.32]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[-1.5, 1.25, 0.042]} fontSize={0.16 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
          #02
        </Text>
        <Text position={[0, 0.7, 0.02]} fontSize={0.23 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          PopUpTrivia
        </Text>
        <Text position={[0, 0.35, 0.02]} fontSize={0.12 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.0}>
          Interactive Trivia
        </Text>
        <Text position={[0, 0.20, 0.02]} fontSize={0.12 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.0}>
          Game Platform
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.10 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Python • Pygame
        </Text>
        <Text position={[0, -0.30, 0.02]} fontSize={0.10 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          REST APIs
        </Text>
        <PushPin position={[0, 1.25, 0.06]} radius={0.10} />
      </group>

      {/* Folder 3 - VibeLink (Bottom Left) */}
      <group
        position={[-3.2, -1.5, 0.04]}
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('vibelink');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.5, 2.5, 0.04]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.25, 0.016]}>
          <boxGeometry args={[3.5, 0.3, 0.03]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[-1.5, 1.25, 0.032]}>
          <planeGeometry args={[0.6, 0.32]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[-1.5, 1.25, 0.042]} fontSize={0.16 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
          #03
        </Text>
        <Text position={[0, 0.7, 0.02]} fontSize={0.23 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          VibeLink
        </Text>
        <Text position={[0, 0.35, 0.02]} fontSize={0.12 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.0}>
          Social Media
        </Text>
        <Text position={[0, 0.20, 0.02]} fontSize={0.12 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.0}>
          Platform
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.10 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          React • Node.js
        </Text>
        <Text position={[0, -0.30, 0.02]} fontSize={0.10 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          MongoDB • AWS
        </Text>
        <PushPin position={[0, 1.25, 0.06]} radius={0.10} />
      </group>

      {/* Folder 4 - GraphiBooks (Bottom Right) */}
      <group
        position={[3.2, -1.5, 0.04]}
        onClick={(e) => {
          e.stopPropagation();
          onProjectSelect('graphibooks');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.5, 2.5, 0.04]} />
          <meshStandardMaterial color={COLORS.manila} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.25, 0.016]}>
          <boxGeometry args={[3.5, 0.3, 0.03]} />
          <meshStandardMaterial color={COLORS.manilaTab} roughness={0.9} />
        </mesh>
        <mesh position={[-1.5, 1.25, 0.032]}>
          <planeGeometry args={[0.6, 0.32]} />
          <meshStandardMaterial color={COLORS.darkRed} />
        </mesh>
        <Text position={[-1.5, 1.25, 0.042]} fontSize={0.16 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
          #04
        </Text>
        <Text position={[0, 0.7, 0.02]} fontSize={0.23 * textScale} color={COLORS.darkBrown} anchorX="center" anchorY="middle">
          GraphiBooks
        </Text>
        <Text position={[0, 0.35, 0.02]} fontSize={0.12 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.0}>
          Book Discovery
        </Text>
        <Text position={[0, 0.20, 0.02]} fontSize={0.12 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle" maxWidth={3.0}>
          Platform
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.10 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          GraphQL • Apollo
        </Text>
        <Text position={[0, -0.30, 0.02]} fontSize={0.10 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          React • MongoDB
        </Text>
        <PushPin position={[0, 1.25, 0.06]} radius={0.10} />
      </group>
    </>
  );
};

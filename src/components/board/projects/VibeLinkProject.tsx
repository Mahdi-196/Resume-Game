import { Text, Line } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import { getTextScale } from '@/utils/detectMobile';

/**
 * VibeLink Project - Simple view with single paper
 */
export const VibeLinkProject = () => {
  const textScale = getTextScale();
  return (
    <>
      {/* Single Paper */}
      <group position={[0, -0.5, 0.04]}>
        <mesh position={[0.05, -0.05, -0.001]}>
          <planeGeometry args={[7.5, 4.5]} />
          <meshStandardMaterial color="#000000" opacity={0.15} transparent />
        </mesh>

        <mesh>
          <planeGeometry args={[7.4, 4.5]} />
          <meshStandardMaterial color={COLORS.antiquePaper} roughness={0.95} />
        </mesh>

        <Line
          points={[[-3.65, 2.2, 0.001], [3.65, 2.2, 0.001], [3.65, -2.3, 0.001], [-3.65, -2.3, 0.001], [-3.65, 2.2, 0.001]]}
          color={COLORS.brass}
          lineWidth={2}
        />

        <mesh position={[0, 1.9, 0.001]}>
          <planeGeometry args={[7.2, 0.5]} />
          <meshStandardMaterial color={COLORS.primaryText} roughness={0.7} />
        </mesh>
        <Text position={[0, 1.9, 0.002]} fontSize={0.22 * textScale} color={COLORS.antiquePaper} anchorX="center" anchorY="middle">
          Social Media Platform
        </Text>

        <Line points={[[-2.5, 1.65, 0.002], [2.5, 1.65, 0.002]]} color={COLORS.brass} lineWidth={2} />

        <Text position={[0, 1.35, 0.002]} fontSize={0.13 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
          React • Node.js • MongoDB • JWT • AWS
        </Text>

        <Text position={[0, 1.0, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Built full-stack social media platform with real-time
        </Text>
        <Text position={[0, 0.85, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          updates using WebSocket connections for live messaging
        </Text>
        <Text position={[0, 0.65, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Implemented secure authentication system with JWT
        </Text>
        <Text position={[0, 0.5, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          tokens and bcrypt password hashing for user security
        </Text>
        <Text position={[0, 0.30, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Designed MongoDB schema with user profiles, posts,
        </Text>
        <Text position={[0, 0.15, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          comments, and relationships using Mongoose ODM
        </Text>
        <Text position={[0, -0.05, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Integrated AWS S3 for scalable media storage with
        </Text>
        <Text position={[0, -0.20, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          CloudFront CDN for optimized global content delivery
        </Text>
        <Text position={[0, -0.40, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Created responsive React UI with custom hooks for
        </Text>
        <Text position={[0, -0.55, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          state management and infinite scroll functionality
        </Text>
        <Text position={[0, -0.75, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Built RESTful API with Express.js featuring CRUD
        </Text>
        <Text position={[0, -0.90, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          operations and advanced query filtering capabilities
        </Text>

        <Line points={[[-3.3, -1.15, 0.002], [3.3, -1.15, 0.002]]} color={COLORS.tan} lineWidth={1} />

        <Text position={[0, -1.40, 0.002]} fontSize={0.095 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Personal Project • Full-Stack Development
        </Text>

        <group
          position={[0, -1.85, 0.002]}
          onClick={(e) => {
            e.stopPropagation();
            window.open('https://github.com/Mahdi-196/VibeLink', '_blank');
          }}
          onPointerEnter={() => (document.body.style.cursor = 'pointer')}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <planeGeometry args={[3.5, 0.25]} />
            <meshStandardMaterial color={COLORS.brass} opacity={0.2} transparent />
          </mesh>
          <Text fontSize={0.095 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
            🔗 View on GitHub
          </Text>
        </group>

        <PushPin position={[-3.5, 2.15, 0.01]} color="#CD853F" radius={0.1} />
        <PushPin position={[3.5, 2.15, 0.01]} color="#CD853F" radius={0.1} />
      </group>
    </>
  );
};

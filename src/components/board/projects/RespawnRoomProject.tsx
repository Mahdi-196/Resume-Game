import { Text, Line } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { LinkWithProgress } from '../shared/LinkWithProgress';
import { COLORS } from '../constants';
import type { RespawnPaper } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * RespawnRoom Project detail view - Header and 2 papers (Frontend & Backend)
 * Simpler than ReFocused - only 2 papers instead of 3
 */
interface RespawnRoomProjectProps {
  zoomedPaper: RespawnPaper;
  onPaperZoom: (paper: RespawnPaper) => void;
}

export const RespawnRoomProject = ({ zoomedPaper, onPaperZoom }: RespawnRoomProjectProps) => {
  const textScale = getTextScale();
  return (
    <>
      {/* Header Background Panel */}
      <mesh position={[0, 1.85, 0.03]}>
        <planeGeometry args={[10.5, 1.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} roughness={0.95} />
      </mesh>

      {/* Decorative border */}
      <Line
        points={[
          [-5.2, 2.7, 0.031],
          [5.2, 2.7, 0.031],
          [5.2, 0.95, 0.031],
          [-5.2, 0.95, 0.031],
          [-5.2, 2.7, 0.031]
        ]}
        color={COLORS.brass}
        lineWidth={3}
      />
      <Line
        points={[
          [-5.1, 2.6, 0.031],
          [5.1, 2.6, 0.031],
          [5.1, 1.05, 0.031],
          [-5.1, 1.05, 0.031],
          [-5.1, 2.6, 0.031]
        ]}
        color={COLORS.primaryText}
        lineWidth={1}
      />

      {/* Project Title */}
      <Text
        position={[0, 2.3, 0.032]}
        fontSize={0.32 * textScale}
        color={COLORS.primaryText}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        RespawnRoom
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 2.08, 0.032]}
        fontSize={0.13 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        Gaming Community & Collection Management Platform
      </Text>

      {/* Decorative divider */}
      <Line points={[[-4.2, 1.92, 0.032], [4.2, 1.92, 0.032]]} color={COLORS.brass} lineWidth={1} />

      {/* Professional Summary */}
      <Text
        position={[0, 1.72, 0.032]}
        fontSize={0.092 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
        maxWidth={9.5}
      >
        A full-stack MERN application with GraphQL, featuring game discovery through IGDB,
      </Text>
      <Text
        position={[0, 1.58, 0.032]}
        fontSize={0.092 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
        maxWidth={9.5}
      >
        real-time chat via PubNub, and social networking for gamers.
      </Text>

      {/* Bottom divider */}
      <Line points={[[-4.2, 1.4, 0.032], [4.2, 1.4, 0.032]]} color={COLORS.brass} lineWidth={1} />

      {/* Clickable link with hold animation */}
      <LinkWithProgress
        position={[0, 1.15, 0.033]}
        url="https://respawnroom.online"
        label="🔗 Live Site"
      />

      {/* PAPER 1 - Frontend (Left) */}
      <group
        position={
          !zoomedPaper ? [-2.5, -1.2, 0.03] :
          zoomedPaper === 'frontend' ? [0, -0.3, 0.06] :
          [-3.5, -0.3, 0.04]
        }
        scale={!zoomedPaper ? 1 : zoomedPaper === 'frontend' ? 1.4 : 0.5}
        onClick={(e) => {
          e.stopPropagation();
          onPaperZoom('frontend');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        {/* Paper shadow */}
        <mesh position={[0.05, -0.05, -0.001]}>
          <planeGeometry args={[3.6, 3.2]} />
          <meshStandardMaterial color="#000000" opacity={0.15} transparent />
        </mesh>

        {/* Paper background */}
        <mesh>
          <planeGeometry args={[3.5, 3.2]} />
          <meshStandardMaterial color={COLORS.antiquePaper} roughness={0.95} />
        </mesh>

        {/* Paper border */}
        <Line
          points={[[-1.7, 1.55, 0.001], [1.7, 1.55, 0.001], [1.7, -1.55, 0.001], [-1.7, -1.55, 0.001], [-1.7, 1.55, 0.001]]}
          color={COLORS.brass}
          lineWidth={2}
        />

        {/* Header */}
        <mesh position={[0, 1.35, 0.001]}>
          <planeGeometry args={[3.4, 0.4]} />
          <meshStandardMaterial color={COLORS.primaryText} roughness={0.7} />
        </mesh>
        <Text position={[0, 1.35, 0.002]} fontSize={0.2 * textScale} color={COLORS.antiquePaper} anchorX="center" anchorY="middle" letterSpacing={0.04}>
          FRONTEND
        </Text>

        {/* Decorative underline */}
        <Line points={[[-1.0, 1.17, 0.002], [1.0, 1.17, 0.002]]} color={COLORS.brass} lineWidth={2} />

        {/* Tech stack */}
        <Text position={[0, 0.8, 0.002]} fontSize={0.13 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle" letterSpacing={0.02}>
          React • Vite • GraphQL • Tailwind CSS
        </Text>

        {/* Content */}
        <Text position={[0, 0.55, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Built responsive SPA with React 18 and
        </Text>
        <Text position={[0, 0.4, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          Vite for lightning-fast development
        </Text>
        <Text position={[0, 0.2, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Integrated Apollo Client for GraphQL
        </Text>
        <Text position={[0, 0.05, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          queries with efficient caching
        </Text>
        <Text position={[0, -0.15, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Implemented PubNub SDK for real-time
        </Text>
        <Text position={[0, -0.3, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          messaging between friends
        </Text>
        <Text position={[0, -0.5, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Designed responsive UI with Tailwind
        </Text>
        <Text position={[0, -0.65, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          CSS and lazy loading for performance
        </Text>
        <Text position={[0, -0.85, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Optimized with code splitting and
        </Text>
        <Text position={[0, -1.0, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          bundle size reduction techniques
        </Text>

        {/* GitHub Link */}
        <group
          position={[0, -1.35, 0.002]}
          onClick={(e) => {
            e.stopPropagation();
            window.open('https://github.com/Schanze117/RespawnRoom/tree/main/client', '_blank');
          }}
          onPointerEnter={() => (document.body.style.cursor = 'pointer')}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <planeGeometry args={[2.8, 0.2]} />
            <meshStandardMaterial color={COLORS.brass} opacity={0.2} transparent />
          </mesh>
          <Text fontSize={0.085 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
            🔗 View Frontend Code
          </Text>
        </group>

        {/* Push pins */}
        <PushPin position={[-1.5, 1.5, 0.01]} color="#CD853F" radius={0.1} />
        <PushPin position={[1.5, 1.5, 0.01]} color="#CD853F" radius={0.1} />
      </group>

      {/* PAPER 2 - Backend (Right) */}
      <group
        position={
          !zoomedPaper ? [2.5, -1.2, 0.04] :
          zoomedPaper === 'frontend' ? [3.5, -0.3, 0.04] :
          [0, -0.3, 0.06]
        }
        scale={!zoomedPaper ? 1 : zoomedPaper === 'backend' ? 1.4 : 0.5}
        onClick={(e) => {
          e.stopPropagation();
          onPaperZoom('backend');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        {/* Paper shadow */}
        <mesh position={[0.05, -0.05, -0.001]}>
          <planeGeometry args={[3.6, 3.2]} />
          <meshStandardMaterial color="#000000" opacity={0.15} transparent />
        </mesh>

        {/* Paper background */}
        <mesh>
          <planeGeometry args={[3.5, 3.2]} />
          <meshStandardMaterial color={COLORS.antiquePaper} roughness={0.95} />
        </mesh>

        {/* Paper border */}
        <Line
          points={[[-1.7, 1.55, 0.001], [1.7, 1.55, 0.001], [1.7, -1.55, 0.001], [-1.7, -1.55, 0.001], [-1.7, 1.55, 0.001]]}
          color={COLORS.brass}
          lineWidth={2}
        />

        {/* Header */}
        <mesh position={[0, 1.35, 0.001]}>
          <planeGeometry args={[3.4, 0.4]} />
          <meshStandardMaterial color={COLORS.primaryText} roughness={0.7} />
        </mesh>
        <Text position={[0, 1.35, 0.002]} fontSize={0.2 * textScale} color={COLORS.antiquePaper} anchorX="center" anchorY="middle" letterSpacing={0.04}>
          BACKEND API
        </Text>

        {/* Decorative underline */}
        <Line points={[[-1.2, 1.17, 0.002], [1.2, 1.17, 0.002]]} color={COLORS.brass} lineWidth={2} />

        {/* Tech stack */}
        <Text position={[0, 0.8, 0.002]} fontSize={0.13 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle" letterSpacing={0.02}>
          Node.js • Express • MongoDB • GraphQL
        </Text>

        {/* Content */}
        <Text position={[0, 0.55, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Architected GraphQL API with Apollo
        </Text>
        <Text position={[0, 0.4, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          Server for efficient data fetching
        </Text>
        <Text position={[0, 0.2, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Designed MongoDB schema with Mongoose
        </Text>
        <Text position={[0, 0.05, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          for users, games, and relationships
        </Text>
        <Text position={[0, -0.15, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Implemented JWT authentication with
        </Text>
        <Text position={[0, -0.3, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          bcrypt for password security
        </Text>
        <Text position={[0, -0.5, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Integrated IGDB API with rate limiting
        </Text>
        <Text position={[0, -0.65, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          and caching for game data
        </Text>
        <Text position={[0, -0.85, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Secured with CORS protection and
        </Text>
        <Text position={[0, -1.0, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          environment-based configuration
        </Text>

        {/* GitHub Link */}
        <group
          position={[0, -1.35, 0.002]}
          onClick={(e) => {
            e.stopPropagation();
            window.open('https://github.com/Schanze117/RespawnRoom/tree/main/server', '_blank');
          }}
          onPointerEnter={() => (document.body.style.cursor = 'pointer')}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <planeGeometry args={[2.8, 0.2]} />
            <meshStandardMaterial color={COLORS.brass} opacity={0.2} transparent />
          </mesh>
          <Text fontSize={0.085 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
            🔗 View Backend Code
          </Text>
        </group>

        {/* Push pins */}
        <PushPin position={[-1.5, 1.5, 0.01]} color="#CD853F" radius={0.1} />
        <PushPin position={[1.5, 1.5, 0.01]} color="#CD853F" radius={0.1} />
      </group>

      {/* Navigation Arrows - Only show when zoomed */}
      {zoomedPaper && (
        <>
          {/* Left Arrow */}
          {zoomedPaper === 'backend' && (
            <group
              position={[-5.5, -0.3, 0.07]}
              onClick={(e) => {
                e.stopPropagation();
                onPaperZoom('frontend');
              }}
              onPointerEnter={() => (document.body.style.cursor = 'pointer')}
              onPointerLeave={() => (document.body.style.cursor = 'auto')}
            >
              <mesh>
                <planeGeometry args={[0.7, 0.7]} />
                <meshStandardMaterial color={COLORS.brass} opacity={0.8} transparent />
              </mesh>
              <Text position={[0, 0, 0.001]} fontSize={0.45 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
                ←
              </Text>
            </group>
          )}

          {/* Right Arrow */}
          {zoomedPaper === 'frontend' && (
            <group
              position={[5.5, -0.3, 0.07]}
              onClick={(e) => {
                e.stopPropagation();
                onPaperZoom('backend');
              }}
              onPointerEnter={() => (document.body.style.cursor = 'pointer')}
              onPointerLeave={() => (document.body.style.cursor = 'auto')}
            >
              <mesh>
                <planeGeometry args={[0.7, 0.7]} />
                <meshStandardMaterial color={COLORS.brass} opacity={0.8} transparent />
              </mesh>
              <Text position={[0, 0, 0.001]} fontSize={0.45 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
                →
              </Text>
            </group>
          )}

          {/* Close button */}
          <group
            position={[0, -2.8, 0.07]}
            onClick={(e) => {
              e.stopPropagation();
              onPaperZoom(null);
            }}
            onPointerEnter={() => (document.body.style.cursor = 'pointer')}
            onPointerLeave={() => (document.body.style.cursor = 'auto')}
          >
            <mesh>
              <planeGeometry args={[1.5, 0.35]} />
              <meshStandardMaterial color={COLORS.darkRed} opacity={0.9} transparent />
            </mesh>
            <Text position={[0, 0, 0.001]} fontSize={0.14 * textScale} color={COLORS.antiquePaper} anchorX="center" anchorY="middle">
              ✕ CLOSE
            </Text>
          </group>
        </>
      )}
    </>
  );
};

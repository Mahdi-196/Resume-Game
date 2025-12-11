import { Text, Line } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import type { ZoomedPaper } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Paper Carousel component - displays 3 papers (Frontend, Backend, AI) with navigation
 * Papers can be clicked to zoom in, and arrows navigate between them
 */
interface PaperCarouselProps {
  zoomedPaper: ZoomedPaper;
  onPaperZoom: (paper: ZoomedPaper) => void;
}


export const PaperCarousel = ({ zoomedPaper, onPaperZoom }: PaperCarouselProps) => {
  const textScale = getTextScale();

  return (
    <>
      {/* PAPER 1 - Frontend Repository (Center with Architecture Diagram) */}

      <group
        position={
          !zoomedPaper ? [0, -1.2, 0.04] :
          zoomedPaper === 'backend' ? [4.0, -0.3, 0.04] :
          zoomedPaper === 'frontend' ? [0, -0.3, 0.06] :
          [-4.0, -0.3, 0.04]
        }
        scale={
          !zoomedPaper ? 1 :
          zoomedPaper === 'frontend' ? 1.4 :
          0.5
        }
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

        <Text position={[0, 0.98, 0.002]} fontSize={0.11 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle" letterSpacing={0.02}>
          Next.js 15 • React 19 • TypeScript
        </Text>

        {/* Content */}
        <Text position={[0, 0.55, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Developed responsive web app using
        </Text>
        <Text position={[0, 0.4, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          Next.js 15, React 19, strict TypeScript
        </Text>
        <Text position={[0, 0.2, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Designed scalable state with TanStack
        </Text>
        <Text position={[0, 0.05, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          Query + React Context, no prop-drilling
        </Text>
        <Text position={[0, -0.15, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Engineered secure auth with silent token
        </Text>
        <Text position={[0, -0.3, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          refresh, dual-strategy (Cookies/JWT)
        </Text>
        <Text position={[0, -0.5, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Built 67+ reusable components: Quill.js
        </Text>
        <Text position={[0, -0.65, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          editor w/ encryption, SVG meditation tool
        </Text>
        <Text position={[0, -0.85, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Implemented multi-layer caching with
        </Text>
        <Text position={[0, -1.0, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          React Query + localStorage for sub-second UI
        </Text>

        {/* GitHub Link */}
        <group
          position={[0, -1.35, 0.002]}
          onClick={(e) => {
            e.stopPropagation();
            window.open('https://github.com/Mahdi-196/ReFocused-frontend', '_blank');
          }}
          onPointerEnter={() => (document.body.style.cursor = 'pointer')}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <planeGeometry args={[2.8, 0.2]} />
            <meshStandardMaterial color={COLORS.brass} opacity={0.2} transparent />
          </mesh>
          <Text fontSize={0.085 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
            🔗 View on GitHub
          </Text>
        </group>

        {/* Push pins */}
        <PushPin position={[-1.5, 1.5, 0.01]} color="#CD853F" radius={0.1} />
        <PushPin position={[1.5, 1.5, 0.01]} color="#CD853F" radius={0.1} />
      </group>

      {/* PAPER 2 - Backend Repository (Left) */}
      <group
        position={
          !zoomedPaper ? [-4.2, -1.2, 0.03] :
          zoomedPaper === 'backend' ? [0, -0.3, 0.06] :
          zoomedPaper === 'frontend' ? [-4.0, -0.3, 0.04] :
          [0, 0, 0]  // Hidden when AI is zoomed
        }
        scale={
          !zoomedPaper ? 1 :
          zoomedPaper === 'backend' ? 1.4 :
          0.5
        }
        onClick={(e) => {
          e.stopPropagation();
          onPaperZoom('backend');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
        visible={!zoomedPaper || zoomedPaper === 'backend' || zoomedPaper === 'frontend'}
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
          FastAPI • Python • PostgreSQL • Redis
        </Text>

        {/* Content */}
        <Text position={[0, 0.55, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Developed async-first API with FastAPI
        </Text>
        <Text position={[0, 0.4, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          + asyncpg: 140+ endpoints, less than 50ms avg
        </Text>
        <Text position={[0, 0.2, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Implemented multi-layer security: HTTP-Only
        </Text>
        <Text position={[0, 0.05, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          Cookies, Google OAuth 2.0, CSRF protection
        </Text>
        <Text position={[0, -0.15, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Designed observability stack: OpenTelemetry,
        </Text>
        <Text position={[0, -0.3, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          Prometheus, Sentry to monitor app health
        </Text>
        <Text position={[0, -0.5, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Deployed with multi-stage Docker build
        </Text>
        <Text position={[0, -0.65, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          for secure, non-root production containers
        </Text>
        <Text position={[0, -0.85, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Utilized async Redis cache to optimize
        </Text>
        <Text position={[0, -1.0, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          PostgreSQL: queries, sessions, rate limits
        </Text>

        {/* GitHub Link */}
        <group
          position={[0, -1.35, 0.002]}
          onClick={(e) => {
            e.stopPropagation();
            window.open('https://github.com/Mahdi-196/ReFocused-backend', '_blank');
          }}
          onPointerEnter={() => (document.body.style.cursor = 'pointer')}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <planeGeometry args={[2.8, 0.2]} />
            <meshStandardMaterial color={COLORS.brass} opacity={0.2} transparent />
          </mesh>
          <Text fontSize={0.085 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
            🔗 View on GitHub
          </Text>
        </group>

        {/* Push pins */}
        <PushPin position={[-1.5, 1.5, 0.01]} color="#CD853F" radius={0.1} />
        <PushPin position={[1.5, 1.5, 0.01]} color="#CD853F" radius={0.1} />
      </group>

      {/* PAPER 3 - AI Model Repository (Right) */}
      <group
        position={
          !zoomedPaper ? [4.2, -1.2, 0.03] :
          zoomedPaper === 'ai' ? [0, -0.3, 0.06] :
          zoomedPaper === 'frontend' ? [4.0, -0.3, 0.04] :
          [0, 0, 0]
        }
        scale={
          !zoomedPaper ? 1 :
          zoomedPaper === 'ai' ? 1.4 :
          0.5
        }
        onClick={(e) => {
          e.stopPropagation();
          onPaperZoom('ai');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
        visible={!zoomedPaper || zoomedPaper === 'ai' || zoomedPaper === 'frontend'}
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
          AI MODEL
        </Text>

        {/* Decorative underline */}
        <Line points={[[-0.9, 1.17, 0.002], [0.9, 1.17, 0.002]]} color={COLORS.brass} lineWidth={2} />

        {/* Tech stack */}
        <Text position={[0, 0.8, 0.002]} fontSize={0.13 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle" letterSpacing={0.02}>
          1.2B Params • GPT-NeoX • PyTorch
        </Text>

        {/* Content */}
        <Text position={[0, 0.55, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Built and trained a 1.2B param LLM
        </Text>
        <Text position={[0, 0.4, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          from scratch to power AI-driven features
        </Text>
        <Text position={[0, 0.2, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Built an end-to-end MLOps pipeline for
        </Text>
        <Text position={[0, 0.05, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          data collection, cleaning, and tokenization
        </Text>
        <Text position={[0, -0.15, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Implemented fault-tolerant PyTorch training:
        </Text>
        <Text position={[0, -0.3, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          mixed-precision, non-blocking GCS uploads
        </Text>
        <Text position={[0, -0.5, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Designed LoRA fine-tuning workflows to
        </Text>
        <Text position={[0, -0.65, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          specialize for chat and instruction-following
        </Text>
        <Text position={[0, -0.85, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          • Engineered data pipeline in Python to parse,
        </Text>
        <Text position={[0, -1.0, 0.002]} fontSize={0.095 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.2}>
          clean, shard datasets into .npz for training
        </Text>

        {/* GitHub Link */}
        <group
          position={[0, -1.35, 0.002]}
          onClick={(e) => {
            e.stopPropagation();
            window.open('https://github.com/Mahdi-196/ReFocused-AI', '_blank');
          }}
          onPointerEnter={() => (document.body.style.cursor = 'pointer')}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <planeGeometry args={[2.8, 0.2]} />
            <meshStandardMaterial color={COLORS.brass} opacity={0.2} transparent />
          </mesh>
          <Text fontSize={0.085 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
            🔗 View on GitHub
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
          {(zoomedPaper === 'frontend' || zoomedPaper === 'ai') && (
            <group
              position={[-5.5, -0.3, 0.07]}
              onClick={(e) => {
                e.stopPropagation();
                onPaperZoom(zoomedPaper === 'frontend' ? 'backend' : 'frontend');
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
          {(zoomedPaper === 'backend' || zoomedPaper === 'frontend') && (
            <group
              position={[5.5, -0.3, 0.07]}
              onClick={(e) => {
                e.stopPropagation();
                onPaperZoom(zoomedPaper === 'backend' ? 'frontend' : 'ai');
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

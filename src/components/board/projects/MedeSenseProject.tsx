import { Text, Line } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { LinkWithProgress } from '../shared/LinkWithProgress';
import { COLORS } from '../constants';
import type { MedesensePaper } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * MedeSense Project - Healthcare AI platform with header
 */
interface MedeSenseProjectProps {
  zoomedPaper: MedesensePaper;
  onPaperZoom: (paper: MedesensePaper) => void;
}

export const MedeSenseProject = ({ zoomedPaper, onPaperZoom }: MedeSenseProjectProps) => {
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
        MedeSense
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
        Technical HIPAA Compliance AI Healthcare Platform
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
        A secure healthcare chatbot with infinite memory, medical document OCR,
      </Text>
      <Text
        position={[0, 1.58, 0.032]}
        fontSize={0.092 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
        maxWidth={9.5}
      >
        and PHI detection built in 24 hours for VillageHacks 2025.
      </Text>

      {/* Bottom divider */}
      <Line points={[[-4.2, 1.4, 0.032], [4.2, 1.4, 0.032]]} color={COLORS.brass} lineWidth={1} />

      {/* Clickable link with hold animation */}
      <LinkWithProgress position={[0, 1.15, 0.033]} url="https://github.com/Mahdi-196/VillageHacks" label="🔗 Code Repository" />

      {/* Single Paper - Smaller size, moved down */}
      <group
        position={zoomedPaper === 'medesense' ? [0, -0.3, 0.06] : [0, -1.0, 0.04]}
        scale={zoomedPaper === 'medesense' ? 1.4 : 1}
        onClick={(e) => {
          e.stopPropagation();
          onPaperZoom('medesense');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <mesh position={[0.05, -0.05, -0.001]}>
          <planeGeometry args={[4.2, 3.3]} />
          <meshStandardMaterial color="#000000" opacity={0.15} transparent />
        </mesh>

        <mesh>
          <planeGeometry args={[4.1, 3.3]} />
          <meshStandardMaterial color={COLORS.antiquePaper} roughness={0.95} />
        </mesh>

        <Line
          points={[[-2.0, 1.60, 0.001], [2.0, 1.60, 0.001], [2.0, -1.70, 0.001], [-2.0, -1.70, 0.001], [-2.0, 1.60, 0.001]]}
          color={COLORS.brass}
          lineWidth={2}
        />

        {/* Header */}
        <mesh position={[0, 1.35, 0.001]}>
          <planeGeometry args={[3.9, 0.4]} />
          <meshStandardMaterial color={COLORS.primaryText} roughness={0.7} />
        </mesh>
        <Text position={[0, 1.35, 0.002]} fontSize={0.19 * textScale} color={COLORS.antiquePaper} anchorX="center" anchorY="middle" letterSpacing={0.04}>
          AI HEALTHCARE PLATFORM
        </Text>

        {/* Decorative underline */}
        <Line points={[[-1.4, 1.17, 0.002], [1.4, 1.17, 0.002]]} color={COLORS.brass} lineWidth={2} />

        {/* Tech stack */}
        <Text position={[0, 0.95, 0.002]} fontSize={0.13 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle" letterSpacing={0.02}>
          FastAPI • React • AWS • OpenAI
        </Text>

        {/* Content */}
        <Text position={[0, 0.72, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Built healthcare chatbot with technical HIPAA compliance, infinite
        </Text>
        <Text position={[0, 0.59, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          memory using Supermemory RAG API for context retention
        </Text>
        <Text position={[0, 0.41, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Integrated AWS Textract for medical document OCR and
        </Text>
        <Text position={[0, 0.28, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          AWS Comprehend Medical for PHI detection and removal
        </Text>
        <Text position={[0, 0.10, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Deployed serverless FastAPI backend on AWS Lambda
        </Text>
        <Text position={[0, -0.03, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          with API Gateway for auto-scaling and cost efficiency
        </Text>
        <Text position={[0, -0.21, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Implemented per-user document isolation with tagged
        </Text>
        <Text position={[0, -0.34, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          storage in Supermemory for complete data separation
        </Text>
        <Text position={[0, -0.52, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Architected React TypeScript frontend with Vite for
        </Text>
        <Text position={[0, -0.65, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          fast builds and deployed on CloudFront CDN
        </Text>
        <Text position={[0, -0.83, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Secured with JWT authentication and PostgreSQL for
        </Text>
        <Text position={[0, -0.96, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          user management with bcrypt password hashing
        </Text>

        <PushPin position={[-1.95, 1.55, 0.01]} color="#CD853F" radius={0.1} />
        <PushPin position={[1.95, 1.55, 0.01]} color="#CD853F" radius={0.1} />
      </group>

      {/* Close button - only show when zoomed */}
      {zoomedPaper === 'medesense' && (
        <group
          position={[0, -2.9, 0.07]}
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
      )}
    </>
  );
};

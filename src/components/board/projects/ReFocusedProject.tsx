import { Text, Line } from '@react-three/drei';
import { LinkWithProgress } from '../shared/LinkWithProgress';
import { PaperCarousel } from './PaperCarousel';
import { COLORS } from '../constants';
import type { ZoomedPaper } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * ReFocused Project detail view - Header and paper carousel
 */
interface ReFocusedProjectProps {
  zoomedPaper: ZoomedPaper;
  onPaperZoom: (paper: ZoomedPaper) => void;
}

// Cloud Icon Component constructed from primitives (2D style)
const CloudIcon = () => (
  <group>
    {/* Main cloud body - made of flat circles with border effect */}
    <group>
      {/* White inner cloud */}
      <mesh position={[0, 0, 0.002]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.4, -0.1, 0.002]}>
        <circleGeometry args={[0.25, 32]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.4, -0.1, 0.002]}>
        <circleGeometry args={[0.25, 32]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.2, 0.25, 0.002]}>
        <circleGeometry args={[0.25, 32]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.2, 0.2, 0.002]}>
        <circleGeometry args={[0.22, 32]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Dark outline/shadow for visibility */}
      <mesh position={[0, 0, 0.001]}>
        <circleGeometry args={[0.38, 32]} />
        <meshBasicMaterial color={COLORS.primaryText} />
      </mesh>
      <mesh position={[0.4, -0.1, 0.001]}>
        <circleGeometry args={[0.28, 32]} />
        <meshBasicMaterial color={COLORS.primaryText} />
      </mesh>
      <mesh position={[-0.4, -0.1, 0.001]}>
        <circleGeometry args={[0.28, 32]} />
        <meshBasicMaterial color={COLORS.primaryText} />
      </mesh>
      <mesh position={[0.2, 0.25, 0.001]}>
        <circleGeometry args={[0.28, 32]} />
        <meshBasicMaterial color={COLORS.primaryText} />
      </mesh>
      <mesh position={[-0.2, 0.2, 0.001]}>
        <circleGeometry args={[0.25, 32]} />
        <meshBasicMaterial color={COLORS.primaryText} />
      </mesh>
    </group>
  </group>
);

export const ReFocusedProject = ({ zoomedPaper, onPaperZoom }: ReFocusedProjectProps) => {
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
        ReFocused
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
        An End-to-End AI Productivity Platform
      </Text>

      {/* Cloud Icon - Centered in remaining space on right */}
      <group position={[3.5, 2.0, 0.033]} scale={1.2}>
        <CloudIcon />
      </group>

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
        A full-stack application with a custom 1.2B parameter LLM, a high-performance
      </Text>
      <Text
        position={[0, 1.58, 0.032]}
        fontSize={0.092 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
        maxWidth={9.5}
      >
        FastAPI backend, and a modern Next.js frontend.
      </Text>

      {/* Bottom divider */}
      <Line points={[[-4.2, 1.4, 0.032], [4.2, 1.4, 0.032]]} color={COLORS.brass} lineWidth={1} />

      {/* Clickable link with hold animation */}
      <LinkWithProgress position={[0, 1.15, 0.033]} />

      {/* Paper Carousel */}
      <PaperCarousel zoomedPaper={zoomedPaper} onPaperZoom={onPaperZoom} />
    </>
  );
};

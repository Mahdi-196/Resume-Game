import { Text, Line } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { LinkWithProgress } from '../shared/LinkWithProgress';
import { COLORS } from '../constants';
import type { ResiliNetPaper } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * ResiliNet Project - Network resilience platform with header
 */
interface ResiliNetProjectProps {
  zoomedPaper: ResiliNetPaper;
  onPaperZoom: (paper: ResiliNetPaper) => void;
}

export const ResiliNetProject = ({ zoomedPaper, onPaperZoom }: ResiliNetProjectProps) => {
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
        ResiliNet
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
        Network Resilience & Disaster Recovery Platform
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
        Containerized disaster recovery infrastructure with automated failover,
      </Text>
      <Text
        position={[0, 1.58, 0.032]}
        fontSize={0.092 * textScale}
        color={COLORS.secondaryText}
        anchorX="center"
        anchorY="middle"
        maxWidth={9.5}
      >
        Kubernetes orchestration, and real-time monitoring dashboards.
      </Text>

      {/* Bottom divider */}
      <Line points={[[-4.2, 1.4, 0.032], [4.2, 1.4, 0.032]]} color={COLORS.brass} lineWidth={1} />

      {/* Clickable link with hold animation */}
      <LinkWithProgress position={[0, 1.15, 0.033]} label="🔗 Code Repository" />

      {/* Single Paper - Smaller size */}
      <group
        position={zoomedPaper === 'resilinet' ? [0, -0.3, 0.06] : [0, -1.0, 0.04]}
        scale={zoomedPaper === 'resilinet' ? 1.4 : 1}
        onClick={(e) => {
          e.stopPropagation();
          onPaperZoom('resilinet');
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
          NETWORK RESILIENCE PLATFORM
        </Text>

        {/* Decorative underline */}
        <Line points={[[-1.4, 1.17, 0.002], [1.4, 1.17, 0.002]]} color={COLORS.brass} lineWidth={2} />

        {/* Tech stack */}
        <Text position={[0, 0.95, 0.002]} fontSize={0.13 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle" letterSpacing={0.02}>
          React • Node.js • Docker • Terraform
        </Text>

        {/* Content */}
        <Text position={[0, 0.62, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Designed and implemented disaster recovery infrastructure
        </Text>
        <Text position={[0, 0.49, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          with automated failover and monitoring systems
        </Text>
        <Text position={[0, 0.31, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Built containerized microservices architecture with
        </Text>
        <Text position={[0, 0.18, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          Kubernetes orchestration for high availability
        </Text>
        <Text position={[0, 0.00, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Implemented infrastructure as code using Terraform
        </Text>
        <Text position={[0, -0.13, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          for reproducible deployment across environments
        </Text>
        <Text position={[0, -0.31, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Configured automated backup and restore procedures
        </Text>
        <Text position={[0, -0.44, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          with point-in-time recovery capabilities
        </Text>
        <Text position={[0, -0.62, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Developed real-time monitoring dashboards with
        </Text>
        <Text position={[0, -0.75, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          alerting for network health and performance metrics
        </Text>
        <Text position={[0, -0.93, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          • Reduced system downtime by 95% through proactive
        </Text>
        <Text position={[0, -1.06, 0.002]} fontSize={0.11 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={3.8}>
          failure detection and automated recovery mechanisms
        </Text>

        <PushPin position={[-1.95, 1.55, 0.01]} color="#CD853F" radius={0.1} />
        <PushPin position={[1.95, 1.55, 0.01]} color="#CD853F" radius={0.1} />
      </group>

      {/* Close button - only show when zoomed */}
      {zoomedPaper === 'resilinet' && (
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

import { Text, Line } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import { getTextScale } from '@/utils/detectMobile';

/**
 * ResiliNet Project - Simple view with single paper
 */
export const ResiliNetProject = () => {
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
          Network Resilience Platform
        </Text>

        <Line points={[[-2.5, 1.65, 0.002], [2.5, 1.65, 0.002]]} color={COLORS.brass} lineWidth={2} />

        <Text position={[0, 1.35, 0.002]} fontSize={0.13 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
          React • Node.js • Docker • Kubernetes • Terraform
        </Text>

        <Text position={[0, 1.0, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Designed and implemented disaster recovery infrastructure
        </Text>
        <Text position={[0, 0.85, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          with automated failover and monitoring systems
        </Text>
        <Text position={[0, 0.7, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Built containerized microservices architecture with
        </Text>
        <Text position={[0, 0.55, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          Kubernetes orchestration for high availability
        </Text>
        <Text position={[0, 0.4, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Implemented infrastructure as code using Terraform
        </Text>
        <Text position={[0, 0.25, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          for reproducible deployment across environments
        </Text>
        <Text position={[0, 0.1, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Configured automated backup and restore procedures
        </Text>
        <Text position={[0, -0.05, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          with point-in-time recovery capabilities
        </Text>
        <Text position={[0, -0.2, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Developed real-time monitoring dashboards with
        </Text>
        <Text position={[0, -0.35, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          alerting for network health and performance metrics
        </Text>
        <Text position={[0, -0.5, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Reduced system downtime by 95% through proactive
        </Text>
        <Text position={[0, -0.65, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          failure detection and automated recovery mechanisms
        </Text>

        <Line points={[[-3.2, -0.9, 0.002], [3.2, -0.9, 0.002]]} color={COLORS.brass} lineWidth={1} />

        <Text position={[0, -1.15, 0.002]} fontSize={0.095 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
          Key Technologies: Docker • Kubernetes • Terraform • Prometheus • Grafana
        </Text>
        <Text position={[0, -1.35, 0.002]} fontSize={0.095 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
          Infrastructure: Multi-region deployment • Load balancing • Auto-scaling
        </Text>
        <Text position={[0, -1.55, 0.002]} fontSize={0.095 * textScale} color={COLORS.tertiaryText} anchorX="center" anchorY="middle">
          Achievements: 99.99% uptime • Sub-minute failover • Zero data loss
        </Text>

        <Line points={[[-3.2, -1.8, 0.002], [3.2, -1.8, 0.002]]} color={COLORS.brass} lineWidth={1} />

        <Text position={[0, -2.05, 0.002]} fontSize={0.085 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Status: Production | Team Size: 5 Engineers | Duration: 8 months
        </Text>

        <PushPin position={[0, 2.25, 0.02]} radius={0.08} />
      </group>
    </>
  );
};

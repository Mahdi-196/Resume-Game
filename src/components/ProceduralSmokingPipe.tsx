import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural Smoking Pipe - Lightweight replacement for GLTF model
 * Classic detective/tobacco pipe with curved stem and bowl
 */
export const ProceduralSmokingPipe = ({
  position,
  rotation = [0, 0, 0],
  scale = 1
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) => {
  // Shared materials for performance
  const materials = useMemo(() => ({
    brownWood: new THREE.MeshStandardMaterial({
      color: "#5d3a1a",      // Brown wood for bowl exterior
      roughness: 0.85,
      metalness: 0.05,
      normalScale: new THREE.Vector2(0.5, 0.5),
      // Simulate wood grain texture with bump
      bumpScale: 0.02
    }),
    blackHandle: new THREE.MeshStandardMaterial({
      color: "#1a1a1a",      // Black handle/stem
      roughness: 0.6,
      metalness: 0.15
    }),
    blackInterior: new THREE.MeshStandardMaterial({
      color: "#0a0a0a",      // Black interior
      roughness: 0.9,
      metalness: 0.0
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b",      // Golden brass accent
      roughness: 0.25,
      metalness: 0.85
    })
  }), []);

  const bowlRadius = 0.06 * scale;
  const bowlHeight = 0.1 * scale;
  const stemRadius = 0.01 * scale;
  const stemLength = 0.3 * scale;

  return (
    <group position={position} rotation={rotation}>
      {/* Bowl exterior - brown wood, tapered cylinder */}
      <mesh position={[0, bowlHeight / 2, 0]} material={materials.brownWood} frustumCulled>
        <cylinderGeometry args={[bowlRadius * 0.75, bowlRadius, bowlHeight, 8]} />
      </mesh>

      {/* Bowl interior - black, visible from top (open pipe) */}
      <mesh position={[0, bowlHeight - 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} frustumCulled>
        <circleGeometry args={[bowlRadius * 0.68, 8]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} side={2} />
      </mesh>

      {/* Interior walls - black inside visible when looking down */}
      <mesh position={[0, bowlHeight / 2, 0]} frustumCulled>
        <cylinderGeometry args={[bowlRadius * 0.68, bowlRadius * 0.68, bowlHeight * 0.95, 8, 1, true]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} side={1} />
      </mesh>

      {/* Shank - thick connection from bowl to stem (black) */}
      <mesh
        position={[stemLength * 0.18, bowlHeight * 0.15, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.blackHandle}
        frustumCulled
      >
        <cylinderGeometry args={[stemRadius * 2.2, stemRadius * 1.8, stemLength * 0.25, 6]} />
      </mesh>

      {/* Stem segment 1 - starts horizontal, slight upward curve */}
      <mesh
        position={[stemLength * 0.4, bowlHeight * 0.16, 0]}
        rotation={[0, 0, Math.PI / 2 - Math.PI / 24]}
        material={materials.blackHandle}
        frustumCulled
      >
        <cylinderGeometry args={[stemRadius, stemRadius, stemLength * 0.35, 6]} />
      </mesh>

      {/* Stem segment 2 - continues curve upward */}
      <mesh
        position={[stemLength * 0.68, bowlHeight * 0.22, 0]}
        rotation={[0, 0, Math.PI / 2 - Math.PI / 12]}
        material={materials.blackHandle}
        frustumCulled
      >
        <cylinderGeometry args={[stemRadius, stemRadius, stemLength * 0.35, 6]} />
      </mesh>

      {/* Mouthpiece - bit end (black), angled upward */}
      <mesh
        position={[stemLength * 0.92, bowlHeight * 0.32, 0]}
        rotation={[0, 0, Math.PI / 2 - Math.PI / 10]}
        material={materials.blackHandle}
        frustumCulled
      >
        <cylinderGeometry args={[stemRadius * 1.2, stemRadius, stemLength * 0.08, 6]} />
      </mesh>

      {/* Brass band - decorative ring on shank */}
      <mesh
        position={[stemLength * 0.12, bowlHeight * 0.15, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.brass}
        frustumCulled
      >
        <cylinderGeometry args={[stemRadius * 2.0, stemRadius * 2.0, 0.012 * scale, 6]} />
      </mesh>
    </group>
  );
};

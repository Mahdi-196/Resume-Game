import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural Antique Globe - Lightweight replacement for GLTF model
 * Uses simple geometry (sphere + torus + cylinder) instead of 447KB model
 */
export const ProceduralGlobe = ({
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
    globe: new THREE.MeshStandardMaterial({
      color: "#d4c5a9", // Aged paper color
      roughness: 0.7,
      metalness: 0.1
    }),
    continents: new THREE.MeshStandardMaterial({
      color: "#8b7355", // Sepia brown for land masses
      roughness: 0.8,
      metalness: 0.05
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#8b7355", // Aged brass
      roughness: 0.4,
      metalness: 0.6
    }),
    wood: new THREE.MeshStandardMaterial({
      color: "#3d2817", // Dark wood base
      roughness: 0.7,
      metalness: 0.1
    })
  }), []);

  const globeRadius = 0.25 * scale;
  const baseHeight = 0.08 * scale;
  const standHeight = 0.15 * scale;

  return (
    <group position={position} rotation={rotation}>
      {/* Globe sphere - main feature */}
      <mesh position={[0, standHeight + globeRadius, 0]} material={materials.globe}>
        <sphereGeometry args={[globeRadius, 16, 16]} />
      </mesh>

      {/* Brass meridian ring (vertical ring around globe) */}
      <mesh
        position={[0, standHeight + globeRadius, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.brass}
      >
        <torusGeometry args={[globeRadius + 0.01, 0.008, 8, 32]} />
      </mesh>

      {/* Brass mounting arm (connects globe to base) */}
      <mesh
        position={[-globeRadius * 0.7, standHeight + globeRadius * 0.5, 0]}
        rotation={[0, 0, Math.PI / 4]}
        material={materials.brass}
      >
        <cylinderGeometry args={[0.012, 0.012, globeRadius * 1.4, 6]} />
      </mesh>

      {/* Wooden stand/pedestal */}
      <mesh position={[0, standHeight / 2, 0]} material={materials.wood}>
        <cylinderGeometry args={[0.08 * scale, 0.1 * scale, standHeight, 8]} />
      </mesh>

      {/* Wooden base (circular platform) */}
      <mesh position={[0, baseHeight / 2, 0]} material={materials.wood}>
        <cylinderGeometry args={[0.12 * scale, 0.12 * scale, baseHeight, 12]} />
      </mesh>

      {/* Base edge trim (decorative ring) */}
      <mesh position={[0, baseHeight, 0]} material={materials.brass}>
        <torusGeometry args={[0.11 * scale, 0.006, 6, 16]} />
      </mesh>
    </group>
  );
};

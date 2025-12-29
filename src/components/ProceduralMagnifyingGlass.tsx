import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural Magnifying Glass - Lightweight replacement for GLTF model
 * Uses simple geometry (cylinder + torus + sphere) instead of heavy model
 */
export const ProceduralMagnifyingGlass = ({
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
    glass: new THREE.MeshPhysicalMaterial({
      color: "#e0f0ff",
      transparent: true,
      opacity: 0.3,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,      // Glass-like transparency
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b",      // Polished brass rim
      roughness: 0.2,
      metalness: 0.9,
      emissive: "#4a3820",
      emissiveIntensity: 0.1
    }),
    wood: new THREE.MeshStandardMaterial({
      color: "#1a1a1a",      // Black handle
      roughness: 0.6,
      metalness: 0.1,
      emissive: "#000000",
      emissiveIntensity: 0.0
    })
  }), []);

  const lensRadius = 0.12 * scale;
  const lensThickness = 0.002 * scale;
  const rimThickness = 0.008 * scale;
  const handleLength = 0.25 * scale;
  const handleRadius = 0.015 * scale;

  return (
    <group position={position} rotation={rotation}>
      {/* Glass lens - thin disc rotated to sit flat in the frame */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[lensRadius, lensRadius, lensThickness, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.3}
          roughness={0.1}
          metalness={0.4}
          emissive="#99ddff"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Inner brass rim around lens edge */}
      <mesh position={[0, 0, 0]} material={materials.brass}>
        <torusGeometry args={[lensRadius, rimThickness, 6, 16]} />
      </mesh>

      {/* Outer brass rim/frame - decorative border */}
      <mesh position={[0, 0, 0]} material={materials.brass}>
        <torusGeometry args={[lensRadius + rimThickness * 2, rimThickness * 1.5, 6, 16]} />
      </mesh>

      {/* Wooden handle - cylindrical rod */}
      <mesh
        position={[0, -handleLength / 2 - lensRadius * 1.2, 0]}
        material={materials.wood}
      >
        <cylinderGeometry args={[handleRadius, handleRadius * 1.3, handleLength, 8]} />
      </mesh>

      {/* Handle grip detail - decorative rings */}
      <mesh
        position={[0, -handleLength / 2 - lensRadius * 1.2 - handleLength * 0.25, 0]}
        material={materials.brass}
      >
        <torusGeometry args={[handleRadius * 1.1, rimThickness * 0.6, 6, 16]} />
      </mesh>

      <mesh
        position={[0, -handleLength / 2 - lensRadius * 1.2 + handleLength * 0.25, 0]}
        material={materials.brass}
      >
        <torusGeometry args={[handleRadius * 1.1, rimThickness * 0.6, 6, 16]} />
      </mesh>
    </group>
  );
};

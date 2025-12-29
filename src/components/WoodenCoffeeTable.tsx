import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Wooden Coffee Table - Optimized from 26 to 8 meshes
 * Features sturdy wooden construction, drawer, lower shelf
 */
export const WoodenCoffeeTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const materials = useMemo(() => ({
    darkWood: new THREE.MeshStandardMaterial({
      color: "#2a1810",
      roughness: 0.6,
      metalness: 0.1
    }),
    richWood: new THREE.MeshStandardMaterial({
      color: "#3d2817",
      roughness: 0.65,
      metalness: 0.1
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b",
      roughness: 0.25,
      metalness: 0.85
    })
  }), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Tabletop with edge trim merged */}
      <mesh position={[0, 0.45, 0]} material={materials.darkWood} frustumCulled>
        <boxGeometry args={[2.64, 0.08, 1.54]} />
      </mesh>

      {/* Front drawer (front + panel merged) */}
      <mesh position={[0, 0.32, -0.73]} material={materials.darkWood} frustumCulled>
        <boxGeometry args={[2.0, 0.18, 0.05]} />
      </mesh>

      {/* Two brass drawer pulls */}
      <mesh position={[-0.3, 0.32, -0.755]} rotation={[Math.PI / 2, 0, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.015, 0.015, 0.05, 6]} />
      </mesh>
      <mesh position={[0.3, 0.32, -0.755]} rotation={[Math.PI / 2, 0, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.015, 0.015, 0.05, 6]} />
      </mesh>

      {/* Drawer frame/apron */}
      <mesh position={[0, 0.32, 0]} material={materials.richWood} frustumCulled>
        <boxGeometry args={[2.53, 0.22, 1.43]} />
      </mesh>

      {/* Four legs merged with caps */}
      {[
        [-1.21, 0, -0.66],
        [1.21, 0, -0.66],
        [-1.21, 0, 0.66],
        [1.21, 0, 0.66],
      ].map((pos, i) => (
        <mesh key={`leg-${i}`} position={[pos[0], 0.16, pos[2]]} material={materials.darkWood} frustumCulled>
          <boxGeometry args={[0.1, 0.32, 0.1]} />
        </mesh>
      ))}

      {/* Lower shelf with support rails merged */}
      <mesh position={[0, 0.12, 0]} material={materials.richWood} frustumCulled>
        <boxGeometry args={[2.42, 0.04, 1.32]} />
      </mesh>
    </group>
  );
};

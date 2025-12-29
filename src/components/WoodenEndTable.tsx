import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Wooden End Table - Optimized from 18 to 6 meshes
 * Features simple rectangular design, single drawer, sturdy construction
 */
export const WoodenEndTable = ({
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
    <group position={position} rotation={rotation} scale={1.1}>
      {/* Tabletop with edge molding merged */}
      <mesh position={[0, 0.6, 0]} material={materials.darkWood} frustumCulled>
        <boxGeometry args={[0.7, 0.05, 0.5]} />
      </mesh>

      {/* Drawer (front + panel merged into single visual) */}
      <mesh position={[0, 0.45, -0.22]} material={materials.darkWood} frustumCulled>
        <boxGeometry args={[0.55, 0.12, 0.04]} />
      </mesh>

      {/* Brass drawer pull */}
      <mesh position={[0, 0.45, -0.24]} rotation={[Math.PI / 2, 0, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[0.012, 0.012, 0.04, 6]} />
      </mesh>

      {/* Table body/frame */}
      <mesh position={[0, 0.45, 0]} material={materials.richWood} frustumCulled>
        <boxGeometry args={[0.65, 0.15, 0.45]} />
      </mesh>

      {/* Four legs merged with feet */}
      {[
        [-0.3, 0, -0.2],
        [0.3, 0, -0.2],
        [-0.3, 0, 0.2],
        [0.3, 0, 0.2],
      ].map((pos, i) => (
        <mesh key={`leg-${i}`} position={[pos[0], 0.19, pos[2]]} material={materials.darkWood} frustumCulled>
          <cylinderGeometry args={[0.035, 0.04, 0.38, 6]} />
        </mesh>
      ))}

      {/* Lower shelf */}
      <mesh position={[0, 0.15, 0]} material={materials.richWood} frustumCulled>
        <boxGeometry args={[0.6, 0.03, 0.4]} />
      </mesh>
    </group>
  );
};

// Victorian Armchair - Optimized from 44 to 8 meshes
import { useMemo } from 'react';
import * as THREE from 'three';

interface VictorianArmchairProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const VictorianArmchair = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: VictorianArmchairProps) => {
  const materials = useMemo(() => ({
    velvet: new THREE.MeshStandardMaterial({
      color: '#5a1a1a',
      roughness: 0.9,
      metalness: 0.0
    }),
    wood: new THREE.MeshStandardMaterial({
      color: '#1a0f0a',
      roughness: 0.35,
      metalness: 0.2
    }),
    cushion: new THREE.MeshStandardMaterial({
      color: '#4a1515',
      roughness: 0.92,
      metalness: 0.0
    })
  }), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Base + main body merged */}
      <mesh position={[0, 0.4, 0]} material={materials.velvet} frustumCulled>
        <boxGeometry args={[1.1, 0.65, 1.0]} />
      </mesh>

      {/* Seat with cushion effect */}
      <mesh position={[0, 0.8, 0]} material={materials.cushion} frustumCulled>
        <boxGeometry args={[1.0, 0.35, 0.9]} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 1.15, -0.35]} material={materials.velvet} frustumCulled>
        <boxGeometry args={[1.0, 1.0, 0.3]} />
      </mesh>

      {/* Top rail */}
      <mesh position={[0, 1.68, -0.35]} rotation={[0, 0, Math.PI / 2]} material={materials.wood} frustumCulled>
        <capsuleGeometry args={[0.08, 0.95, 6, 12]} />
      </mesh>

      {/* Left armrest - simplified */}
      <mesh position={[-0.55, 0.9, 0]} material={materials.wood} frustumCulled>
        <boxGeometry args={[0.12, 0.4, 0.7]} />
      </mesh>

      {/* Right armrest - simplified */}
      <mesh position={[0.55, 0.9, 0]} material={materials.wood} frustumCulled>
        <boxGeometry args={[0.12, 0.4, 0.7]} />
      </mesh>

      {/* Left front leg */}
      <mesh position={[-0.5, 0.2, 0.4]} material={materials.wood} frustumCulled>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
      </mesh>

      {/* Right front leg */}
      <mesh position={[0.5, 0.2, 0.4]} material={materials.wood} frustumCulled>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
      </mesh>
    </group>
  );
};

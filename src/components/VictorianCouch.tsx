// Victorian Couch - Optimized from 40 to 8 meshes
import { useMemo } from 'react';
import * as THREE from 'three';

interface VictorianCouchProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const VictorianCouch = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: VictorianCouchProps) => {
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
      {/* Base frame + main body merged */}
      <mesh position={[0, 0.4, 0]} material={materials.velvet} frustumCulled>
        <boxGeometry args={[2.4, 0.65, 1.0]} />
      </mesh>

      {/* Seat cushions */}
      <mesh position={[0, 0.75, 0]} material={materials.cushion} frustumCulled>
        <boxGeometry args={[2.2, 0.3, 0.9]} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 1.05, -0.4]} material={materials.velvet} frustumCulled>
        <boxGeometry args={[2.3, 0.9, 0.25]} />
      </mesh>

      {/* Top rail */}
      <mesh position={[0, 1.52, -0.4]} rotation={[0, 0, Math.PI / 2]} material={materials.wood} frustumCulled>
        <capsuleGeometry args={[0.07, 2.25, 6, 12]} />
      </mesh>

      {/* Left armrest */}
      <mesh position={[-1.15, 0.85, 0]} material={materials.wood} frustumCulled>
        <boxGeometry args={[0.15, 0.45, 0.7]} />
      </mesh>

      {/* Right armrest */}
      <mesh position={[1.15, 0.85, 0]} material={materials.wood} frustumCulled>
        <boxGeometry args={[0.15, 0.45, 0.7]} />
      </mesh>

      {/* Front legs */}
      <mesh position={[-1.0, 0.2, 0.4]} material={materials.wood} frustumCulled>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
      </mesh>
      <mesh position={[1.0, 0.2, 0.4]} material={materials.wood} frustumCulled>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
      </mesh>
    </group>
  );
};

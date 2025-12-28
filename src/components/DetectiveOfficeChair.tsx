import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Instanced brass tacks around seat edge (8 instances)
 * Optimized to use single draw call instead of 8 separate meshes
 */
const BrassTacksInstanced = ({ material }: { material: THREE.Material }) => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const matrix = new THREE.Matrix4();

    // Set position for each of the 8 brass tacks
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.sin(angle) * 0.33;
      const z = Math.cos(angle) * 0.33;

      matrix.setPosition(x, 0.5, z);
      instancedMeshRef.current.setMatrixAt(i, matrix);
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, 8]} material={material}>
      <sphereGeometry args={[0.015, 8, 8]} />
    </instancedMesh>
  );
};

/**
 * Instanced chair spokes (5 instances)
 * Optimized to use single draw call instead of 5 separate meshes
 */
const ChairSpokesInstanced = ({ material }: { material: THREE.Material }) => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const matrix = new THREE.Matrix4();

    // Set transform for each of the 5 spokes
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;

      // Calculate position after rotation (spoke extends along local Z axis)
      const x = Math.sin(angle) * 0.2;
      const z = Math.cos(angle) * 0.2;

      matrix.makeRotationY(angle);
      matrix.setPosition(x, 0, z);

      instancedMeshRef.current.setMatrixAt(i, matrix);
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, 5]} material={material}>
      <boxGeometry args={[0.08, 0.05, 0.4]} />
    </instancedMesh>
  );
};

/**
 * Instanced brass caster wheels (5 instances)
 * Optimized to use single draw call instead of 5 separate meshes
 */
const BrassCastersInstanced = ({ material }: { material: THREE.Material }) => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const eulerX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    const eulerY = new THREE.Quaternion();

    // Set transform for each of the 5 caster wheels
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;

      // Calculate world position (at end of spoke)
      const x = Math.sin(angle) * 0.38;
      const z = Math.cos(angle) * 0.38;

      // Combine rotations: first rotate by angle around Y, then rotate X by 90°
      eulerY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      quaternion.multiplyQuaternions(eulerY, eulerX);

      matrix.makeRotationFromQuaternion(quaternion);
      matrix.setPosition(x, -0.02, z);

      instancedMeshRef.current.setMatrixAt(i, matrix);
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, 5]} material={material}>
      <cylinderGeometry args={[0.04, 0.04, 0.03, 8]} />
    </instancedMesh>
  );
};

/**
 * Detective Office Chair - 1930s leather executive office chair
 * Features tufted leather back, armrests, and swivel base
 */
export const DetectiveOfficeChair = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  // Shared materials - created once and reused across all meshes
  const materials = useMemo(() => ({
    leather: new THREE.MeshStandardMaterial({
      color: "#2d1810",
      roughness: 0.85,
      metalness: 0.05
    }),
    leatherDark: new THREE.MeshStandardMaterial({
      color: "#1a0f08",
      roughness: 0.9
    }),
    wood: new THREE.MeshStandardMaterial({
      color: "#3d2817",
      roughness: 0.7
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#8b7355",
      metalness: 0.6,
      roughness: 0.4
    })
  }), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Seat cushion - slightly curved for comfort */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow material={materials.leather} frustumCulled={true}>
        <boxGeometry args={[0.65, 0.12, 0.65]} />
      </mesh>

      {/* Seat tufting removed for performance - use texture/normal map instead */}

      {/* High backrest - curved and padded */}
      <group position={[0, 1.1, -0.28]}>
        {/* Main back cushion */}
        <mesh castShadow receiveShadow material={materials.leather}>
          <boxGeometry args={[0.7, 0.9, 0.15]} />
        </mesh>

        {/* Backrest tufting and creases removed for performance - use texture/normal map instead */}

        {/* Backrest wooden frame trim */}
        <mesh position={[0, 0.46, -0.08]} material={materials.wood}>
          <boxGeometry args={[0.75, 0.04, 0.04]} />
        </mesh>
        <mesh position={[0, -0.46, -0.08]} material={materials.wood}>
          <boxGeometry args={[0.75, 0.04, 0.04]} />
        </mesh>
      </group>

      {/* Left armrest */}
      <group position={[-0.38, 0.75, 0]}>
        {/* Wooden armrest top */}
        <mesh castShadow material={materials.wood}>
          <boxGeometry args={[0.1, 0.05, 0.55]} />
        </mesh>

        {/* Armrest support */}
        <mesh position={[0, -0.15, 0.15]} material={materials.wood}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        </mesh>

        {/* Front support */}
        <mesh position={[0, -0.15, -0.15]} material={materials.wood}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        </mesh>

        {/* Brass connector at top */}
        <mesh position={[0, 0.03, 0.15]} material={materials.brass}>
          <sphereGeometry args={[0.035, 8, 8]} />
        </mesh>
      </group>

      {/* Right armrest */}
      <group position={[0.38, 0.75, 0]}>
        {/* Wooden armrest top */}
        <mesh castShadow material={materials.wood}>
          <boxGeometry args={[0.1, 0.05, 0.55]} />
        </mesh>

        {/* Armrest support */}
        <mesh position={[0, -0.15, 0.15]} material={materials.wood}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        </mesh>

        {/* Front support */}
        <mesh position={[0, -0.15, -0.15]} material={materials.wood}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        </mesh>

        {/* Brass connector at top */}
        <mesh position={[0, 0.03, 0.15]} material={materials.brass}>
          <sphereGeometry args={[0.035, 8, 8]} />
        </mesh>
      </group>

      {/* Central support column (swivel mechanism) */}
      <mesh position={[0, 0.3, 0]} material={materials.wood}>
        <cylinderGeometry args={[0.05, 0.06, 0.5, 8]} />
      </mesh>

      {/* Brass collar at top of column */}
      <mesh position={[0, 0.53, 0]} material={materials.brass}>
        <cylinderGeometry args={[0.065, 0.065, 0.04, 8]} />
      </mesh>

      {/* Wooden base - five-spoke star design */}
      <group position={[0, 0.05, 0]}>
        {/* Center hub */}
        <mesh material={materials.wood}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 8]} />
        </mesh>

        {/* Five spokes - instanced for performance */}
        <ChairSpokesInstanced material={materials.wood} />

        {/* Brass caster wheels - instanced for performance */}
        <BrassCastersInstanced material={materials.brass} />
      </group>

      {/* Decorative brass tacks around seat edge - instanced for performance */}
      <BrassTacksInstanced material={materials.brass} />
    </group>
  );
};

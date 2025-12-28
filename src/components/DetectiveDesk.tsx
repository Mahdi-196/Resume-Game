import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Detective Desk - 1930s Film Noir executive desk with drawers
 * Features ornate wooden construction with multiple drawers, brass hardware
 */
export const DetectiveDesk = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  // Shared materials - created once and reused across all meshes
  const materials = useMemo(() => ({
    deskWood: new THREE.MeshStandardMaterial({
      color: "#3d2817",
      roughness: 0.6,
      metalness: 0.1
    }),
    darkWood: new THREE.MeshStandardMaterial({
      color: "#2a1810",
      roughness: 0.7
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b",
      metalness: 0.85,
      roughness: 0.25
    })
  }), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Main desktop surface */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow material={materials.deskWood}>
        <boxGeometry args={[2.4, 0.08, 1.3]} />
      </mesh>

      {/* Desktop edge trim */}
      <mesh position={[0, 0.81, 0.655]} material={materials.darkWood}>
        <boxGeometry args={[2.42, 0.04, 0.04]} />
      </mesh>
      <mesh position={[0, 0.81, -0.655]} material={materials.darkWood}>
        <boxGeometry args={[2.42, 0.04, 0.04]} />
      </mesh>

      {/* Left pedestal (drawer unit) */}
      <group position={[-0.85, 0.4, 0]}>
        {/* Pedestal body */}
        <mesh material={materials.deskWood}>
          <boxGeometry args={[0.55, 0.8, 1.1]} />
        </mesh>

        {/* Three drawers with visible fronts - facing backward (negative Z) */}
        {[0.25, 0, -0.25].map((y, i) => (
          <group key={`left-drawer-${i}`} position={[0, y, -0.56]}>
            {/* Drawer front */}
            <mesh material={materials.darkWood}>
              <boxGeometry args={[0.5, 0.22, 0.02]} />
            </mesh>

            {/* Drawer panel inset */}
            <mesh position={[0, 0, 0.005]} material={materials.deskWood}>
              <boxGeometry args={[0.45, 0.18, 0.01]} />
            </mesh>

            {/* Brass drawer handle */}
            <mesh position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 2]} material={materials.brass}>
              <cylinderGeometry args={[0.015, 0.015, 0.12]} />
            </mesh>

            {/* Handle decorative ends */}
            <mesh position={[-0.06, 0, -0.02]} material={materials.brass}>
              <sphereGeometry args={[0.02, 12, 12]} />
            </mesh>
            <mesh position={[0.06, 0, -0.02]} material={materials.brass}>
              <sphereGeometry args={[0.02, 12, 12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Right pedestal (drawer unit) */}
      <group position={[0.85, 0.4, 0]}>
        {/* Pedestal body */}
        <mesh material={materials.deskWood}>
          <boxGeometry args={[0.55, 0.8, 1.1]} />
        </mesh>

        {/* Three drawers with visible fronts - facing backward (negative Z) */}
        {[0.25, 0, -0.25].map((y, i) => (
          <group key={`right-drawer-${i}`} position={[0, y, -0.56]}>
            {/* Drawer front */}
            <mesh material={materials.darkWood}>
              <boxGeometry args={[0.5, 0.22, 0.02]} />
            </mesh>

            {/* Drawer panel inset */}
            <mesh position={[0, 0, 0.005]} material={materials.deskWood}>
              <boxGeometry args={[0.45, 0.18, 0.01]} />
            </mesh>

            {/* Brass drawer handle */}
            <mesh position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 2]} material={materials.brass}>
              <cylinderGeometry args={[0.015, 0.015, 0.12]} />
            </mesh>

            {/* Handle decorative ends */}
            <mesh position={[-0.06, 0, -0.02]} material={materials.brass}>
              <sphereGeometry args={[0.02, 12, 12]} />
            </mesh>
            <mesh position={[0.06, 0, -0.02]} material={materials.brass}>
              <sphereGeometry args={[0.02, 12, 12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Center drawer (keyboard/pencil drawer) - facing backward */}
      <group position={[0, 0.72, -0.5]}>
        {/* Drawer front */}
        <mesh material={materials.darkWood}>
          <boxGeometry args={[0.9, 0.1, 0.02]} />
        </mesh>

        {/* Drawer panel inset */}
        <mesh position={[0, 0, 0.005]} material={materials.deskWood}>
          <boxGeometry args={[0.8, 0.08, 0.01]} />
        </mesh>

        {/* Small brass pull */}
        <mesh position={[0, -0.03, -0.015]} material={materials.brass}>
          <boxGeometry args={[0.08, 0.015, 0.015]} />
        </mesh>
      </group>

      {/* Decorative wood paneling on pedestals */}
      {/* Left pedestal side panel */}
      <mesh position={[-0.85, 0.4, 0.56]} material={materials.darkWood}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
      </mesh>
      <mesh position={[-0.85, 0.4, -0.56]} material={materials.darkWood}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
      </mesh>

      {/* Right pedestal side panel */}
      <mesh position={[0.85, 0.4, 0.56]} material={materials.darkWood}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
      </mesh>
      <mesh position={[0.85, 0.4, -0.56]} material={materials.darkWood}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
      </mesh>

      {/* Decorative vertical fluting on front corners */}
      {[-1.1, 1.1].map((x, i) => (
        <group key={`fluting-${i}`} position={[x, 0.4, 0.56]}>
          {[0, 1, 2].map((j) => (
            <mesh key={j} position={[j * 0.015 - 0.015, 0, 0]} material={materials.darkWood}>
              <boxGeometry args={[0.01, 0.75, 0.025]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Brass corner ornaments */}
      {[
        [-1.2, 0.89, 0.65],
        [1.2, 0.89, 0.65],
        [-1.2, 0.89, -0.65],
        [1.2, 0.89, -0.65],
      ].map((pos, i) => (
        <mesh key={`corner-${i}`} position={pos as [number, number, number]} material={materials.brass}>
          <sphereGeometry args={[0.025, 12, 12]} />
        </mesh>
      ))}

      {/* Base trim molding */}
      <mesh position={[-0.85, 0.02, 0]} material={materials.darkWood}>
        <boxGeometry args={[0.6, 0.04, 1.15]} />
      </mesh>
      <mesh position={[0.85, 0.02, 0]} material={materials.darkWood}>
        <boxGeometry args={[0.6, 0.04, 1.15]} />
      </mesh>
    </group>
  );
};

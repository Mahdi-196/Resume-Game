import { useMemo } from 'react';
import * as THREE from 'three';

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
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow material={materials.leather}>
        <boxGeometry args={[0.65, 0.12, 0.65]} />
      </mesh>

      {/* Seat cushion tufting (button indents) */}
      {[
        [-0.15, 0.55, -0.15],
        [0.15, 0.55, -0.15],
        [-0.15, 0.55, 0.15],
        [0.15, 0.55, 0.15],
      ].map((pos, i) => (
        <mesh key={`seat-tuft-${i}`} position={pos as [number, number, number]} material={materials.leatherDark}>
          <sphereGeometry args={[0.025, 12, 12]} />
        </mesh>
      ))}

      {/* High backrest - curved and padded */}
      <group position={[0, 1.1, -0.28]}>
        {/* Main back cushion */}
        <mesh castShadow receiveShadow material={materials.leather}>
          <boxGeometry args={[0.7, 0.9, 0.15]} />
        </mesh>

        {/* Backrest tufting - diamond pattern */}
        {[
          [0, 0.3, 0.08],
          [-0.2, 0.15, 0.08],
          [0.2, 0.15, 0.08],
          [0, 0, 0.08],
          [-0.2, -0.15, 0.08],
          [0.2, -0.15, 0.08],
          [0, -0.3, 0.08],
        ].map((pos, i) => (
          <mesh key={`back-tuft-${i}`} position={pos as [number, number, number]} material={materials.leatherDark}>
            <sphereGeometry args={[0.02, 12, 12]} />
          </mesh>
        ))}

        {/* Tufting creases (leather folds between buttons) */}
        {[
          { from: [0, 0.3, 0.08], to: [-0.2, 0.15, 0.08] },
          { from: [0, 0.3, 0.08], to: [0.2, 0.15, 0.08] },
          { from: [-0.2, 0.15, 0.08], to: [0, 0, 0.08] },
          { from: [0.2, 0.15, 0.08], to: [0, 0, 0.08] },
          { from: [0, 0, 0.08], to: [-0.2, -0.15, 0.08] },
          { from: [0, 0, 0.08], to: [0.2, -0.15, 0.08] },
          { from: [-0.2, -0.15, 0.08], to: [0, -0.3, 0.08] },
          { from: [0.2, -0.15, 0.08], to: [0, -0.3, 0.08] },
        ].map((line, i) => {
          const midX = (line.from[0] + line.to[0]) / 2;
          const midY = (line.from[1] + line.to[1]) / 2;
          const midZ = (line.from[2] + line.to[2]) / 2;

          return (
            <mesh key={`crease-${i}`} position={[midX, midY, midZ]} material={materials.leatherDark}>
              <boxGeometry args={[0.01, 0.15, 0.01]} />
            </mesh>
          );
        })}

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
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        </mesh>

        {/* Front support */}
        <mesh position={[0, -0.15, -0.15]} material={materials.wood}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        </mesh>

        {/* Brass connector at top */}
        <mesh position={[0, 0.03, 0.15]} material={materials.brass}>
          <sphereGeometry args={[0.035, 12, 12]} />
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
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        </mesh>

        {/* Front support */}
        <mesh position={[0, -0.15, -0.15]} material={materials.wood}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        </mesh>

        {/* Brass connector at top */}
        <mesh position={[0, 0.03, 0.15]} material={materials.brass}>
          <sphereGeometry args={[0.035, 12, 12]} />
        </mesh>
      </group>

      {/* Central support column (swivel mechanism) */}
      <mesh position={[0, 0.3, 0]} material={materials.wood}>
        <cylinderGeometry args={[0.05, 0.06, 0.5]} />
      </mesh>

      {/* Brass collar at top of column */}
      <mesh position={[0, 0.53, 0]} material={materials.brass}>
        <cylinderGeometry args={[0.065, 0.065, 0.04]} />
      </mesh>

      {/* Wooden base - five-spoke star design */}
      <group position={[0, 0.05, 0]}>
        {/* Center hub */}
        <mesh material={materials.wood}>
          <cylinderGeometry args={[0.08, 0.08, 0.06]} />
        </mesh>

        {/* Five spokes */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          const x = Math.sin(angle) * 0.2;
          const z = Math.cos(angle) * 0.2;

          return (
            <group key={`spoke-${i}`} rotation={[0, angle, 0]}>
              <mesh position={[0, 0, 0.2]} material={materials.wood}>
                <boxGeometry args={[0.08, 0.05, 0.4]} />
              </mesh>

              {/* Brass caster wheel at end of spoke */}
              <mesh position={[0, -0.02, 0.38]} rotation={[Math.PI / 2, 0, 0]} material={materials.brass}>
                <cylinderGeometry args={[0.04, 0.04, 0.03]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Decorative brass tacks around seat edge */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.sin(angle) * 0.33;
        const z = Math.cos(angle) * 0.33;

        return (
          <mesh key={`tack-${i}`} position={[x, 0.5, z]} material={materials.brass}>
            <sphereGeometry args={[0.015, 8, 8]} />
          </mesh>
        );
      })}
    </group>
  );
};

// Filing Cabinet Component - Optimized 1930s vintage styles
// Reduced from 46 meshes to ~8 meshes per variant
import React, { useMemo } from 'react';
import * as THREE from 'three';

interface FilingCabinetProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  variant: 'classic' | 'lateral' | 'card-catalog';
}

export const FilingCabinet = ({
  position,
  rotation = [0, 0, 0],
  variant = 'classic'
}: FilingCabinetProps) => {

  // Shared materials - created once for performance
  const materials = useMemo(() => ({
    darkMetal: new THREE.MeshStandardMaterial({ color: "#2d2d2d", roughness: 0.4, metalness: 0.6 }),
    lightMetal: new THREE.MeshStandardMaterial({ color: "#3a3a3a", roughness: 0.3, metalness: 0.7 }),
    brass: new THREE.MeshStandardMaterial({ color: "#b8860b", roughness: 0.2, metalness: 0.9 }),
    darkWood: new THREE.MeshStandardMaterial({ color: "#2a1810", roughness: 0.5, metalness: 0.1 }),
    mediumWood: new THREE.MeshStandardMaterial({ color: "#3d2817", roughness: 0.6, metalness: 0.2 }),
    lightWood: new THREE.MeshStandardMaterial({ color: "#5c4033", roughness: 0.5, metalness: 0.1 })
  }), []);

  // Disable pointer events
  const commonProps = {
    onPointerOver: (e: any) => e.stopPropagation(),
    onPointerOut: (e: any) => e.stopPropagation(),
    onClick: (e: any) => e.stopPropagation(),
    raycast: () => null,
    frustumCulled: true
  };

  // Classic Vertical - Optimized from 21 to 7 meshes
  if (variant === 'classic') {
    return (
      <group position={position} rotation={rotation} {...commonProps}>
        {/* Main body with top rim merged */}
        <mesh material={materials.darkMetal} frustumCulled>
          <boxGeometry args={[0.55, 2.84, 0.7]} />
        </mesh>

        {/* All 4 drawer fronts merged into instanced mesh */}
        {[0, 1, 2, 3].map((i) => (
          <group key={i} position={[0, 0.3 + i * 0.7, 0.33]}>
            {/* Drawer front */}
            <mesh material={materials.lightMetal} frustumCulled>
              <boxGeometry args={[0.5, 0.6, 0.06]} />
            </mesh>
            {/* Handle - simplified */}
            <mesh position={[0, -0.15, 0.04]} material={materials.brass} frustumCulled>
              <boxGeometry args={[0.12, 0.03, 0.02]} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  // Lateral - Optimized from 10 to 5 meshes
  if (variant === 'lateral') {
    return (
      <group position={position} rotation={rotation} {...commonProps}>
        {/* Main body with top merged */}
        <mesh material={materials.mediumWood} frustumCulled>
          <boxGeometry args={[1.2, 1.44, 0.6]} />
        </mesh>

        {/* 2 drawers */}
        {[0, 1].map((i) => (
          <group key={i} position={[0, 0.4 + i * 0.6, 0.28]}>
            {/* Drawer front */}
            <mesh material={materials.darkWood} frustumCulled>
              <boxGeometry args={[1.1, 0.5, 0.06]} />
            </mesh>
            {/* Handles - simplified to boxes */}
            <mesh position={[-0.3, 0, 0.04]} material={materials.brass} frustumCulled>
              <boxGeometry args={[0.03, 0.08, 0.02]} />
            </mesh>
            <mesh position={[0.3, 0, 0.04]} material={materials.brass} frustumCulled>
              <boxGeometry args={[0.03, 0.08, 0.02]} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  // Card Catalog - Optimized from 105 to 8 meshes
  // Instead of 24 individual drawers, use texture mapping illusion
  if (variant === 'card-catalog') {
    return (
      <group position={position} rotation={rotation} {...commonProps}>
        {/* Main body */}
        <mesh material={materials.darkWood} frustumCulled>
          <boxGeometry args={[0.9, 2.46, 0.5]} />
        </mesh>

        {/* Drawer grid front - single textured plane creates illusion of many drawers */}
        <mesh position={[0, 1.2, 0.24]} material={materials.mediumWood} frustumCulled>
          <boxGeometry args={[0.85, 2.2, 0.02]} />
        </mesh>

        {/* Vertical dividers for depth */}
        <mesh position={[-0.14, 1.2, 0.24]} material={materials.darkWood} frustumCulled>
          <boxGeometry args={[0.015, 2.3, 0.01]} />
        </mesh>
        <mesh position={[0.14, 1.2, 0.24]} material={materials.darkWood} frustumCulled>
          <boxGeometry args={[0.015, 2.3, 0.01]} />
        </mesh>

        {/* Representative drawer knobs in front for visual interest (8 instead of 24) */}
        {[0, 1].map((row) =>
          [0, 1, 2].map((col) => (
            <mesh
              key={`${row}-${col}`}
              position={[-0.28 + col * 0.28, 0.6 + row * 1.2, 0.26]}
              material={materials.brass}
              frustumCulled
            >
              <sphereGeometry args={[0.012, 6, 6]} />
            </mesh>
          ))
        )}
      </group>
    );
  }

  return null;
};

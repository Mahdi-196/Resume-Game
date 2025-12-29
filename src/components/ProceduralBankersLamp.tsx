import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural Banker's Lamp - Lightweight replacement for GLTF model
 * Classic 1930s desk lamp with emerald green glass shade and brass fittings
 */
export const ProceduralBankersLamp = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  onClick
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
}) => {
  // Shared materials for performance
  const materials = useMemo(() => ({
    greenGlass: new THREE.MeshPhysicalMaterial({
      color: "#2d5016",          // Deep emerald green
      transparent: true,
      opacity: 0.75,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.6,         // Glass-like light transmission
      thickness: 0.8,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      emissive: "#1a3010",
      emissiveIntensity: 0.15
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b",          // Golden brass
      roughness: 0.25,
      metalness: 0.85,
      emissive: "#4a3820",
      emissiveIntensity: 0.1
    }),
    darkBrass: new THREE.MeshStandardMaterial({
      color: "#8b7355",          // Aged/dark brass
      roughness: 0.35,
      metalness: 0.75
    }),
    felt: new THREE.MeshStandardMaterial({
      color: "#1a3a1a",          // Dark green felt base
      roughness: 0.95,
      metalness: 0.0
    }),
    bulb: new THREE.MeshStandardMaterial({
      color: "#fff8e1",          // Warm white bulb
      emissive: "#fff8e1",
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.0
    }),
    socket: new THREE.MeshStandardMaterial({
      color: "#3a3a3a",          // Dark metal socket
      roughness: 0.4,
      metalness: 0.6
    })
  }), []);

  const baseHeight = 0.25 * scale;
  const baseRadius = 0.09 * scale;
  const poleHeight = 0.35 * scale;
  const poleRadius = 0.012 * scale;
  const armLength = 0.25 * scale;
  const armRadius = 0.01 * scale;
  const shadeLength = 0.28 * scale;
  const shadeRadius = 0.08 * scale;
  const bulbRadius = 0.04 * scale;

  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      {/* Weighted base - stepped brass base */}
      {/* Bottom tier */}
      <mesh position={[0, baseHeight * 0.15, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[baseRadius * 1.2, baseRadius * 1.25, baseHeight * 0.3, 8]} />
      </mesh>

      {/* Middle tier */}
      <mesh position={[0, baseHeight * 0.45, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[baseRadius * 0.9, baseRadius * 1.0, baseHeight * 0.4, 8]} />
      </mesh>

      {/* Top tier */}
      <mesh position={[0, baseHeight * 0.8, 0]} material={materials.brass} frustumCulled>
        <cylinderGeometry args={[baseRadius * 0.7, baseRadius * 0.8, baseHeight * 0.3, 8]} />
      </mesh>

      {/* Felt bottom pad */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.felt} frustumCulled>
        <circleGeometry args={[baseRadius * 1.22, 8]} />
      </mesh>

      {/* Decorative brass rings on base */}
      <mesh position={[0, baseHeight * 0.3, 0]} material={materials.darkBrass} frustumCulled>
        <torusGeometry args={[baseRadius * 0.95, 0.006 * scale, 6, 8]} />
      </mesh>
      <mesh position={[0, baseHeight * 0.65, 0]} material={materials.darkBrass} frustumCulled>
        <torusGeometry args={[baseRadius * 0.75, 0.005 * scale, 6, 8]} />
      </mesh>

      {/* Vertical pole/stem from base */}
      <mesh
        position={[0, baseHeight + poleHeight / 2, 0]}
        material={materials.brass}
        frustumCulled
      >
        <cylinderGeometry args={[poleRadius, poleRadius * 1.2, poleHeight, 6]} />
      </mesh>

      {/* Pole top knob */}
      <mesh
        position={[0, baseHeight + poleHeight, 0]}
        material={materials.brass}
        frustumCulled
      >
        <sphereGeometry args={[poleRadius * 2.2, 8, 8]} />
      </mesh>

      {/* Horizontal arm extending from pole */}
      <mesh
        position={[armLength / 2, baseHeight + poleHeight - 0.02 * scale, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.brass}
        frustumCulled
      >
        <cylinderGeometry args={[armRadius, armRadius, armLength, 6]} />
      </mesh>

      {/* Arm-to-shade joint (decorative ball joint) */}
      <mesh
        position={[armLength, baseHeight + poleHeight - 0.02 * scale, 0]}
        material={materials.darkBrass}
        frustumCulled
      >
        <sphereGeometry args={[armRadius * 2, 8, 8]} />
      </mesh>

      {/* Green glass shade - elongated dome shape */}
      <group position={[armLength, baseHeight + poleHeight - 0.02 * scale, 0]}>
        {/* Glass shade body - elongated horizontal cylinder with rounded ends */}
        <mesh
          rotation={[0, 0, Math.PI / 2]}
          material={materials.greenGlass}
          frustumCulled
        >
          <capsuleGeometry args={[shadeRadius, shadeLength, 8, 12]} />
        </mesh>

        {/* Brass shade rim - front opening */}
        <mesh
          position={[shadeLength / 2 + shadeRadius, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          material={materials.brass}
          frustumCulled
        >
          <torusGeometry args={[shadeRadius * 0.95, 0.01 * scale, 6, 8]} />
        </mesh>

        {/* Brass shade rim - back */}
        <mesh
          position={[-shadeLength / 2 - shadeRadius, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          material={materials.brass}
          frustumCulled
        >
          <torusGeometry args={[shadeRadius * 0.95, 0.01 * scale, 6, 8]} />
        </mesh>

        {/* Brass top cap/mount */}
        <mesh
          position={[0, shadeRadius, 0]}
          material={materials.brass}
          frustumCulled
        >
          <cylinderGeometry args={[0.025 * scale, 0.035 * scale, 0.04 * scale, 8]} />
        </mesh>

        {/* Light bulb socket */}
        <mesh
          position={[0, shadeRadius * 0.4, 0]}
          material={materials.socket}
          frustumCulled
        >
          <cylinderGeometry args={[bulbRadius * 0.6, bulbRadius * 0.7, bulbRadius * 0.8, 6]} />
        </mesh>

        {/* Light bulb - classic incandescent shape */}
        <mesh
          position={[0, 0, 0]}
          material={materials.bulb}
          frustumCulled
        >
          <sphereGeometry args={[bulbRadius, 8, 8]} />
        </mesh>

        {/* Bulb base/threads */}
        <mesh
          position={[0, bulbRadius * 0.85, 0]}
          material={materials.socket}
          frustumCulled
        >
          <cylinderGeometry args={[bulbRadius * 0.5, bulbRadius * 0.55, bulbRadius * 0.4, 6]} />
        </mesh>
      </group>

      {/* Pull chain - brass chain with small wooden bead hanging from bottom of shade */}
      <mesh
        position={[armLength + shadeLength / 2 + shadeRadius * 0.5, baseHeight + poleHeight - 0.02 * scale - shadeRadius * 1.5, 0]}
        material={materials.darkBrass}
        frustumCulled
      >
        <cylinderGeometry args={[0.003 * scale, 0.003 * scale, shadeRadius * 1.2, 6]} />
      </mesh>

      {/* Chain bead/pull */}
      <mesh
        position={[armLength + shadeLength / 2 + shadeRadius * 0.5, baseHeight + poleHeight - 0.02 * scale - shadeRadius * 2.1, 0]}
        material={materials.darkBrass}
        frustumCulled
      >
        <sphereGeometry args={[0.015 * scale, 8, 8]} />
      </mesh>
    </group>
  );
};

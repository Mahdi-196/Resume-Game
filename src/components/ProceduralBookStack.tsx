import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural Book Stack - Lightweight replacement for GLTF model
 * Stack of vintage detective/mystery books
 */
export const ProceduralBookStack = ({
  position,
  rotation = [0, 0, 0],
  scale = 1
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) => {
  // Book materials with different colors for variety
  const materials = useMemo(() => ({
    book1: new THREE.MeshStandardMaterial({
      color: "#3d2817",      // Very dark brown
      roughness: 0.9,
      metalness: 0.05
    }),
    book2: new THREE.MeshStandardMaterial({
      color: "#1a2a1a",      // Very dark green
      roughness: 0.85,
      metalness: 0.05
    }),
    book3: new THREE.MeshStandardMaterial({
      color: "#2d1212",      // Very dark burgundy
      roughness: 0.88,
      metalness: 0.05
    }),
    book4: new THREE.MeshStandardMaterial({
      color: "#0f1a2a",      // Very dark navy blue
      roughness: 0.87,
      metalness: 0.05
    }),
    pages: new THREE.MeshStandardMaterial({
      color: "#f4e4c1",      // Aged paper color
      roughness: 0.95,
      metalness: 0.0
    }),
    spine: new THREE.MeshStandardMaterial({
      color: "#3d2817",      // Dark leather spine
      roughness: 0.8,
      metalness: 0.1
    })
  }), []);

  const bookWidth = 0.18 * scale;
  const bookHeight = 0.03 * scale;
  const bookDepth = 0.24 * scale;

  return (
    <group position={position} rotation={rotation}>
      {/* Book 1 - Bottom, largest book lying flat */}
      <group position={[0, bookHeight / 2, 0]}>
        {/* Cover */}
        <mesh material={materials.book1} frustumCulled>
          <boxGeometry args={[bookWidth, bookHeight, bookDepth]} />
        </mesh>
        {/* Page edges - right side */}
        <mesh position={[bookWidth / 2 - 0.002, 0, 0]} material={materials.pages} frustumCulled>
          <boxGeometry args={[0.005, bookHeight * 0.85, bookDepth]} />
        </mesh>
        {/* Page edges - front */}
        <mesh position={[0, 0, bookDepth / 2 - 0.002]} material={materials.pages} frustumCulled>
          <boxGeometry args={[bookWidth, bookHeight * 0.85, 0.005]} />
        </mesh>
        {/* Page edges - back */}
        <mesh position={[0, 0, -bookDepth / 2 + 0.002]} material={materials.pages} frustumCulled>
          <boxGeometry args={[bookWidth, bookHeight * 0.85, 0.005]} />
        </mesh>
      </group>

      {/* Book 2 - Second layer, medium size, slightly rotated */}
      <group position={[0.015, bookHeight * 1.5, 0.01]} rotation={[0, Math.PI / 10, 0]}>
        {/* Cover */}
        <mesh material={materials.book2} frustumCulled>
          <boxGeometry args={[bookWidth * 0.88, bookHeight * 1.1, bookDepth * 0.92]} />
        </mesh>
        {/* Page edges - right */}
        <mesh position={[bookWidth * 0.44 - 0.002, 0, 0]} material={materials.pages} frustumCulled>
          <boxGeometry args={[0.005, bookHeight * 0.95, bookDepth * 0.92]} />
        </mesh>
        {/* Page edges - front */}
        <mesh position={[0, 0, bookDepth * 0.46 - 0.002]} material={materials.pages} frustumCulled>
          <boxGeometry args={[bookWidth * 0.88, bookHeight * 0.95, 0.005]} />
        </mesh>
        {/* Page edges - back */}
        <mesh position={[0, 0, -bookDepth * 0.46 + 0.002]} material={materials.pages} frustumCulled>
          <boxGeometry args={[bookWidth * 0.88, bookHeight * 0.95, 0.005]} />
        </mesh>
      </group>

      {/* Book 3 - Third layer, rotated opposite direction */}
      <group position={[-0.018, bookHeight * 2.65, -0.015]} rotation={[0, -Math.PI / 7, 0]}>
        {/* Cover */}
        <mesh material={materials.book3} frustumCulled>
          <boxGeometry args={[bookWidth * 0.82, bookHeight * 0.95, bookDepth * 0.85]} />
        </mesh>
        {/* Page edges - right */}
        <mesh position={[bookWidth * 0.41 - 0.002, 0, 0]} material={materials.pages} frustumCulled>
          <boxGeometry args={[0.005, bookHeight * 0.82, bookDepth * 0.85]} />
        </mesh>
        {/* Page edges - front */}
        <mesh position={[0, 0, bookDepth * 0.425 - 0.002]} material={materials.pages} frustumCulled>
          <boxGeometry args={[bookWidth * 0.82, bookHeight * 0.82, 0.005]} />
        </mesh>
        {/* Page edges - back */}
        <mesh position={[0, 0, -bookDepth * 0.425 + 0.002]} material={materials.pages} frustumCulled>
          <boxGeometry args={[bookWidth * 0.82, bookHeight * 0.82, 0.005]} />
        </mesh>
      </group>

      {/* Book 4 - Top book, smallest, different angle */}
      <group position={[0.008, bookHeight * 3.6, 0.012]} rotation={[0, Math.PI / 5, 0]}>
        {/* Cover */}
        <mesh material={materials.book4} frustumCulled>
          <boxGeometry args={[bookWidth * 0.75, bookHeight * 0.9, bookDepth * 0.78]} />
        </mesh>
        {/* Page edges - right */}
        <mesh position={[bookWidth * 0.375 - 0.002, 0, 0]} material={materials.pages} frustumCulled>
          <boxGeometry args={[0.005, bookHeight * 0.78, bookDepth * 0.78]} />
        </mesh>
        {/* Page edges - front */}
        <mesh position={[0, 0, bookDepth * 0.39 - 0.002]} material={materials.pages} frustumCulled>
          <boxGeometry args={[bookWidth * 0.75, bookHeight * 0.78, 0.005]} />
        </mesh>
        {/* Page edges - back */}
        <mesh position={[0, 0, -bookDepth * 0.39 + 0.002]} material={materials.pages} frustumCulled>
          <boxGeometry args={[bookWidth * 0.75, bookHeight * 0.78, 0.005]} />
        </mesh>
      </group>
    </group>
  );
};

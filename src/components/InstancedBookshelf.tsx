import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Highly Optimized Instanced Bookshelf
 * Uses InstancedMesh to render all books in a single draw call
 * Massive performance improvement over individual book meshes
 */
export const InstancedBookshelf = ({
  position,
  rotation = [0, 0, 0],
  variant = 0,
  style = 'standard'
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  variant?: number;
  style?: 'standard' | 'artdeco';
}) => {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const bookColors = style === 'artdeco'
    ? [
        // Deep, rich Art Deco colors
        "#1a1a2e", "#16213e", "#0f3460", // Deep blues
        "#8b0000", "#a52a2a", "#800020", // Rich reds
        "#1b4d3e", "#2d5016", "#3d550c", // Forest greens
        "#2c2c54", "#474787", "#341f97", // Royal purples
        "#000000", "#1c1c1c", "#2e2e2e", // Blacks
        "#8b6914", "#b8860b", "#daa520", // Golds
        "#4a1c1c", "#5c2e2e", "#6b3e3e", // Maroons
        "#654321", "#8b4513", "#a0522d", // Browns
      ]
    : [
        // Classic library colors
        "#8b0000", "#a52a2a", "#dc143c", // Reds
        "#2e8b57", "#228b22", "#006400", // Greens
        "#4b0082", "#800080", "#9932cc", // Purples
        "#008b8b", "#20b2aa", "#4682b4", // Teals/Blues
        "#b8860b", "#daa520", "#cd853f", // Golds/Tans
        "#8b4513", "#654321", "#5c4033", // Browns
        "#2f4f4f", "#556b2f", "#191970", // Dark tones
        "#8b008b", "#ff8c00", "#8fbc8f", // Accent colors
      ];

  // Generate book data for all shelves
  const bookData = useMemo(() => {
    const books: Array<{
      position: THREE.Vector3;
      rotation: THREE.Euler;
      scale: THREE.Vector3;
      color: THREE.Color;
    }> = [];

    const shelfHeights = [0.8, 1.6, 2.4, 3.2, 4.0];

    shelfHeights.forEach((shelfY, shelfIndex) => {
      let currentX = -0.75; // Start from left
      // Aim for 80% fill: 16-24 books per shelf
      const bookCount = 16 + Math.floor(seededRandom(variant * 100 + shelfIndex * 10) * 8);

      for (let i = 0; i < bookCount; i++) {
        const seed = variant * 1000 + shelfIndex * 100 + i;

        // Book dimensions
        const height = 0.25 + seededRandom(seed) * 0.35;
        const thickness = 0.025 + seededRandom(seed + 1) * 0.04;
        const depth = 0.14 + seededRandom(seed + 2) * 0.02;

        // Position
        const xPos = currentX + thickness / 2;
        currentX += thickness + 0.005;

        // Stop if shelf is full (80% of 1.6 width = 1.28)
        if (currentX > 0.6) break;

        const shelfTop = shelfY + 0.025;
        const maxHeight = 0.5;
        const clampedHeight = Math.min(height, maxHeight);
        const bookCenterY = shelfTop + clampedHeight / 2;

        // Lean and color
        const lean = seededRandom(seed + 8) * 0.08 - 0.04;
        const colorIndex = Math.floor(seededRandom(seed + 3) * bookColors.length);

        books.push({
          position: new THREE.Vector3(xPos, bookCenterY, -0.4),
          rotation: new THREE.Euler(0, 0, lean),
          scale: new THREE.Vector3(thickness, clampedHeight, depth),
          color: new THREE.Color(bookColors[colorIndex])
        });
      }
    });

    return books;
  }, [variant, style]);

  return (
    <group position={position} rotation={rotation}>
      {/* Bookshelf Frame */}
      {style === 'artdeco' ? (
        <>
          {/* Art Deco Black Frame */}
          <mesh position={[0, 2.5, -0.8]}>
            <boxGeometry args={[1.8, 5, 0.05]} />
            <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[-0.85, 2.5, -0.4]}>
            <boxGeometry args={[0.1, 5, 0.8]} />
            <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0.85, 2.5, -0.4]}>
            <boxGeometry args={[0.1, 5, 0.8]} />
            <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, 4.9, -0.4]}>
            <boxGeometry args={[1.8, 0.1, 0.8]} />
            <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.1, -0.4]}>
            <boxGeometry args={[1.8, 0.1, 0.8]} />
            <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.6} />
          </mesh>

          {/* Chrome accents */}
          {[-0.9, 0.9].map((x, i) => (
            <mesh key={i} position={[x, 2.5, -0.35]}>
              <boxGeometry args={[0.04, 5.2, 0.04]} />
              <meshStandardMaterial color="#c0c0c0" roughness={0.1} metalness={0.95} />
            </mesh>
          ))}
        </>
      ) : (
        <>
          {/* Standard Wood Frame */}
          <mesh position={[0, 2.5, -0.8]}>
            <boxGeometry args={[1.8, 5, 0.05]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
          <mesh position={[-0.85, 2.5, -0.4]}>
            <boxGeometry args={[0.1, 5, 0.8]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
          <mesh position={[0.85, 2.5, -0.4]}>
            <boxGeometry args={[0.1, 5, 0.8]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
          <mesh position={[0, 4.9, -0.4]}>
            <boxGeometry args={[1.8, 0.1, 0.8]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.1, -0.4]}>
            <boxGeometry args={[1.8, 0.1, 0.8]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>
        </>
      )}

      {/* Shelves */}
      {[0.8, 1.6, 2.4, 3.2, 4.0].map((y, i) => (
        <mesh key={`shelf-${i}`} position={[0, y, -0.4]}>
          <boxGeometry args={[1.7, 0.05, 0.75]} />
          <meshStandardMaterial
            color={style === 'artdeco' ? "#1a1a1a" : "#8b4513"}
            roughness={0.6}
            metalness={style === 'artdeco' ? 0.3 : 0.0}
          />
        </mesh>
      ))}

      {/* Instanced Books with page edges - All rendered in TWO draw calls! */}
      <InstancedBooks bookData={bookData} />
      <InstancedPageEdges bookData={bookData} />
    </group>
  );
};

// Instanced mesh component for all books
const InstancedBooks = ({ bookData }: { bookData: Array<{
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  color: THREE.Color;
}> }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Set instance transforms on mount and when data changes
  useEffect(() => {
    if (!meshRef.current) return;

    // Ensure instanceColor buffer exists
    if (!meshRef.current.instanceColor) {
      meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(
        new Float32Array(bookData.length * 3),
        3
      );
    }

    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();

    bookData.forEach((book, i) => {
      quaternion.setFromEuler(book.rotation);
      matrix.compose(book.position, quaternion, book.scale);

      meshRef.current!.setMatrixAt(i, matrix);
      meshRef.current!.setColorAt(i, book.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  }, [bookData]);

  if (bookData.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[null, null, bookData.length]} frustumCulled={false} castShadow>
      <boxGeometry />
      <meshStandardMaterial
        roughness={0.9}
        metalness={0.0}
        vertexColors
      />
    </instancedMesh>
  );
};

// Instanced page edges component
const InstancedPageEdges = ({ bookData }: { bookData: Array<{
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  color: THREE.Color;
}> }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    // Ensure instanceColor buffer exists
    if (!meshRef.current.instanceColor) {
      meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(
        new Float32Array(bookData.length * 3),
        3
      );
    }

    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const pageColor = new THREE.Color('#f4ede1'); // Cream paper color

    bookData.forEach((book, i) => {
      quaternion.setFromEuler(book.rotation);

      // Position page edge slightly in front of book spine
      const pagePosition = book.position.clone();
      const depthOffset = book.scale.z / 2 + 0.002;

      // Offset based on rotation
      const rotMatrix = new THREE.Matrix4().makeRotationFromEuler(book.rotation);
      const offsetVector = new THREE.Vector3(0, 0, depthOffset);
      offsetVector.applyMatrix4(rotMatrix);
      pagePosition.add(offsetVector);

      // Scale to be slightly smaller than book and very thin
      const pageScale = new THREE.Vector3(
        book.scale.x * 0.9,
        book.scale.y * 0.96,
        0.003
      );

      matrix.compose(pagePosition, quaternion, pageScale);

      meshRef.current!.setMatrixAt(i, matrix);
      meshRef.current!.setColorAt(i, pageColor);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  }, [bookData]);

  if (bookData.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[null, null, bookData.length]} frustumCulled={false}>
      <boxGeometry />
      <meshStandardMaterial roughness={0.95} metalness={0.0} vertexColors />
    </instancedMesh>
  );
};

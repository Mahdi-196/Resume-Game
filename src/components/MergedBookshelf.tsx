import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * MergedBookshelf - Performance optimized bookshelf using merged geometries
 * All books on each shelf are merged into a single geometry for massive performance gain
 * 5 meshes total (one per shelf) instead of ~100+ individual book meshes
 */
export const MergedBookshelf = ({
  position,
  rotation = [0, 0, 0],
  variant = 0
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  variant?: number;
}) => {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const bookColors = [
    "#8b0000", "#2e8b57", "#4b0082", "#800080", "#008b8b", "#b8860b",
    "#8b4513", "#2f4f4f", "#556b2f", "#8b008b", "#ff8c00", "#9932cc",
    "#dc143c", "#228b22", "#191970", "#8fbc8f", "#cd853f", "#4682b4",
    "#d2691e", "#8fbc8f", "#9acd32", "#20b2aa", "#87ceeb", "#dda0dd"
  ];

  // Generate merged geometry for each shelf
  const shelfGeometries = useMemo(() => {
    const shelfHeights = [0.8, 1.6, 2.4, 3.2, 4.0];

    return shelfHeights.map((shelfY, shelfIndex) => {
      const bookGeometries: THREE.BufferGeometry[] = [];
      const pageGeometries: THREE.BufferGeometry[] = [];
      const goldLeafGeometries: THREE.BufferGeometry[] = [];
      const ribbingGeometries: THREE.BufferGeometry[] = [];

      let currentX = -0.75;
      // More varied book count per shelf: 14-30 books (averages to ~22 books = 80% full)
      // Each shelf gets different fullness for realistic variation
      const bookCount = 14 + Math.floor(seededRandom(variant * 100 + shelfIndex * 10) * 16);

      for (let i = 0; i < bookCount; i++) {
        const seed = variant * 1000 + shelfIndex * 100 + i;
        const rand = (offset: number) => seededRandom(seed + offset);

        // Book dimensions
        const height = 0.25 + rand(0) * 0.35;
        const thickness = 0.025 + rand(1) * 0.04;
        const depth = 0.14 + rand(2) * 0.02;
        const lean = rand(8) * 0.08 - 0.04;

        const xPos = currentX + thickness / 2;
        currentX += thickness + 0.005;

        if (currentX > 0.8) break;

        const maxHeight = 0.5;
        const clampedHeight = Math.min(height, maxHeight);
        const shelfTop = shelfY + 0.025;
        const bookCenterY = shelfTop + clampedHeight / 2;

        // Create book cover geometry
        const coverGeo = new THREE.BoxGeometry(thickness, clampedHeight, depth);
        const coverMatrix = new THREE.Matrix4();
        // Rotate 180° on Y-axis to show spine, then apply lean
        const rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI);
        const leanMatrix = new THREE.Matrix4().makeRotationZ(lean);
        coverMatrix.multiplyMatrices(leanMatrix, rotationMatrix);
        coverMatrix.setPosition(xPos, bookCenterY, -0.2);
        coverGeo.applyMatrix4(coverMatrix);

        // Set color attribute for this book
        const colorIndex = Math.floor(rand(3) * bookColors.length);
        const color = new THREE.Color(bookColors[colorIndex]);
        const colorArray = new Float32Array(coverGeo.attributes.position.count * 3);
        for (let j = 0; j < coverGeo.attributes.position.count; j++) {
          colorArray[j * 3] = color.r;
          colorArray[j * 3 + 1] = color.g;
          colorArray[j * 3 + 2] = color.b;
        }
        coverGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        bookGeometries.push(coverGeo);

        // Page edges (front, top, bottom)
        const pageColor = new THREE.Color('#f4ede1');

        // Front page edge (positioned at the page side after 180° rotation)
        const frontPageGeo = new THREE.BoxGeometry(
          thickness * 0.92,
          clampedHeight * 0.96,
          0.005  // Slightly thicker to reduce aliasing
        );
        const frontPageMatrix = new THREE.Matrix4();
        const pageRotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI);
        const pageLeanMatrix = new THREE.Matrix4().makeRotationZ(lean);
        frontPageMatrix.multiplyMatrices(pageLeanMatrix, pageRotationMatrix);
        // After 180° Y rotation, pages should be on the opposite side
        const frontOffset = new THREE.Vector3(
          thickness * 0.48 * Math.cos(lean),
          thickness * 0.48 * Math.sin(lean),
          -depth / 2 - 0.003  // Increased offset to prevent z-fighting
        );
        frontPageMatrix.setPosition(
          xPos + frontOffset.x,
          bookCenterY + frontOffset.y,
          -0.2 + frontOffset.z
        );
        frontPageGeo.applyMatrix4(frontPageMatrix);

        const frontColorArray = new Float32Array(frontPageGeo.attributes.position.count * 3);
        for (let j = 0; j < frontPageGeo.attributes.position.count; j++) {
          frontColorArray[j * 3] = pageColor.r;
          frontColorArray[j * 3 + 1] = pageColor.g;
          frontColorArray[j * 3 + 2] = pageColor.b;
        }
        frontPageGeo.setAttribute('color', new THREE.BufferAttribute(frontColorArray, 3));
        pageGeometries.push(frontPageGeo);

        // Gold leaf (15% chance)
        if (rand(6) > 0.85) {
          const goldGeo = new THREE.BoxGeometry(
            0.006,  // Thicker to reduce aliasing
            clampedHeight * 0.15,
            depth * 0.85
          );
          const goldMatrix = new THREE.Matrix4();
          const goldRotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI);
          const goldLeanMatrix = new THREE.Matrix4().makeRotationZ(lean);
          goldMatrix.multiplyMatrices(goldLeanMatrix, goldRotationMatrix);
          const goldOffset = new THREE.Vector3(
            -thickness / 2 * Math.cos(lean) - 0.003 * Math.cos(lean),  // Increased offset
            -thickness / 2 * Math.sin(lean) - 0.003 * Math.sin(lean) + clampedHeight * 0.25,
            0
          );
          goldMatrix.setPosition(
            xPos + goldOffset.x,
            bookCenterY + goldOffset.y,
            -0.2 + goldOffset.z
          );
          goldGeo.applyMatrix4(goldMatrix);

          const goldColor = new THREE.Color('#d4af37');
          const goldColorArray = new Float32Array(goldGeo.attributes.position.count * 3);
          for (let j = 0; j < goldGeo.attributes.position.count; j++) {
            goldColorArray[j * 3] = goldColor.r;
            goldColorArray[j * 3 + 1] = goldColor.g;
            goldColorArray[j * 3 + 2] = goldColor.b;
          }
          goldGeo.setAttribute('color', new THREE.BufferAttribute(goldColorArray, 3));
          goldLeafGeometries.push(goldGeo);
        }

        // Ribbing (15% chance)
        if (rand(11) > 0.85) {
          [0.25, -0.15].forEach((yOffset) => {
            const ribGeo = new THREE.BoxGeometry(
              0.006,  // Slightly thicker to reduce aliasing
              0.012,
              depth * 0.92
            );
            const ribMatrix = new THREE.Matrix4();
            const ribRotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI);
            const ribLeanMatrix = new THREE.Matrix4().makeRotationZ(lean);
            ribMatrix.multiplyMatrices(ribLeanMatrix, ribRotationMatrix);
            const ribOffset = new THREE.Vector3(
              -thickness / 2 * Math.cos(lean) - 0.003 * Math.cos(lean),  // Increased offset
              -thickness / 2 * Math.sin(lean) - 0.003 * Math.sin(lean) + clampedHeight * yOffset,
              0
            );
            ribMatrix.setPosition(
              xPos + ribOffset.x,
              bookCenterY + ribOffset.y,
              -0.2 + ribOffset.z
            );
            ribGeo.applyMatrix4(ribMatrix);

            const ribColor = new THREE.Color(bookColors[colorIndex]).multiplyScalar(0.85);
            const ribColorArray = new Float32Array(ribGeo.attributes.position.count * 3);
            for (let j = 0; j < ribGeo.attributes.position.count; j++) {
              ribColorArray[j * 3] = ribColor.r;
              ribColorArray[j * 3 + 1] = ribColor.g;
              ribColorArray[j * 3 + 2] = ribColor.b;
            }
            ribGeo.setAttribute('color', new THREE.BufferAttribute(ribColorArray, 3));
            ribbingGeometries.push(ribGeo);
          });
        }
      }

      // Merge all geometries for this shelf and recompute normals
      const mergedBooks = bookGeometries.length > 0 ? mergeGeometries(bookGeometries) : null;
      if (mergedBooks) {
        mergedBooks.computeVertexNormals();
      }

      const mergedPages = pageGeometries.length > 0 ? mergeGeometries(pageGeometries) : null;
      if (mergedPages) {
        mergedPages.computeVertexNormals();
      }

      const mergedGold = goldLeafGeometries.length > 0 ? mergeGeometries(goldLeafGeometries) : null;
      if (mergedGold) {
        mergedGold.computeVertexNormals();
      }

      const mergedRibbing = ribbingGeometries.length > 0 ? mergeGeometries(ribbingGeometries) : null;
      if (mergedRibbing) {
        mergedRibbing.computeVertexNormals();
      }

      return {
        books: mergedBooks,
        pages: mergedPages,
        gold: mergedGold,
        ribbing: mergedRibbing
      };
    });
  }, [variant]);

  return (
    <group position={position} rotation={rotation}>
      {/* Bookshelf frame */}
      <mesh position={[0, 2.5, -0.8]}>
        <boxGeometry args={[1.8, 5, 0.05]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Side panels */}
      <mesh position={[-0.85, 2.5, -0.4]}>
        <boxGeometry args={[0.1, 5, 0.8]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>
      <mesh position={[0.85, 2.5, -0.4]}>
        <boxGeometry args={[0.1, 5, 0.8]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Top and bottom */}
      <mesh position={[0, 4.9, -0.4]}>
        <boxGeometry args={[1.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.1, -0.4]}>
        <boxGeometry args={[1.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Shelves */}
      {[0.8, 1.6, 2.4, 3.2, 4.0].map((y, i) => (
        <mesh key={`shelf-${i}`} position={[0, y, -0.4]}>
          <boxGeometry args={[1.7, 0.05, 0.75]} />
          <meshStandardMaterial color="#8b4513" roughness={0.6} />
        </mesh>
      ))}

      {/* Merged book geometries - One mesh per shelf! */}
      {shelfGeometries.map((shelf, i) => (
        <group key={`shelf-books-${i}`}>
          {/* Book covers */}
          {shelf.books && (
            <mesh geometry={shelf.books}>
              <meshStandardMaterial
                vertexColors
                roughness={0.9}
                metalness={0.05}
              />
            </mesh>
          )}

          {/* Page edges */}
          {shelf.pages && (
            <mesh geometry={shelf.pages}>
              <meshStandardMaterial
                vertexColors
                roughness={0.95}
                polygonOffset
                polygonOffsetFactor={1}
                polygonOffsetUnits={1}
              />
            </mesh>
          )}

          {/* Gold leaf */}
          {shelf.gold && (
            <mesh geometry={shelf.gold}>
              <meshStandardMaterial
                vertexColors
                metalness={0.85}
                roughness={0.25}
                emissive="#8b6914"
                emissiveIntensity={0.2}
                polygonOffset
                polygonOffsetFactor={2}
                polygonOffsetUnits={1}
              />
            </mesh>
          )}

          {/* Ribbing */}
          {shelf.ribbing && (
            <mesh geometry={shelf.ribbing}>
              <meshStandardMaterial
                vertexColors
                roughness={0.9}
                polygonOffset
                polygonOffsetFactor={2}
                polygonOffsetUnits={1}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Decorations */}
      {variant % 3 === 0 && (
        <mesh position={[0.6, 3.7, -0.65]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1]} />
          <meshStandardMaterial color="#8b7355" metalness={0.6} roughness={0.4} />
        </mesh>
      )}
    </group>
  );
};

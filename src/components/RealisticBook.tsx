import { useRef } from 'react';
import * as THREE from 'three';

/**
 * Book configuration interface
 */
export interface BookConfig {
  height: number;
  thickness: number;
  depth: number;
  color: string;
  spineColor?: string;
  hasGoldLeaf?: boolean;
  hasDustJacket?: boolean;
  worn?: number;
  lean?: number;
  pulledOut?: number;
  hasRibbing?: boolean;
  hasPageEdges?: boolean;
  bookStyle?: 'leather' | 'cloth' | 'modern' | 'antique';
}

/**
 * Realistic Book Component - Highly detailed 1930s-era book with authentic features
 *
 * Features:
 * - Visible page edges with cream/yellowed paper
 * - Spine details (ribs, gold lettering bands, wear marks)
 * - Dust jackets on select books
 * - Leather grain texture simulation
 * - Aging and wear effects
 * - Pull-out variation for shelf realism
 */
export const RealisticBook = ({
  config,
  position,
  rotation = [0, Math.PI, 0] // Default 180° rotation so spine faces viewer
}: {
  config: BookConfig;
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Calculate aged paper color based on wear
  const paperColor = new THREE.Color(
    config.worn && config.worn > 0.5 ? '#e8dcc0' : '#f4ede1'
  );

  // Determine material properties based on book style
  const getMaterialProps = () => {
    switch (config.bookStyle) {
      case 'leather':
        return { roughness: 0.9, metalness: 0.05 };
      case 'cloth':
        return { roughness: 0.95, metalness: 0.0 };
      case 'modern':
        return { roughness: 0.7, metalness: 0.1 };
      case 'antique':
        return { roughness: 0.95, metalness: 0.02 };
      default:
        return { roughness: 0.85, metalness: 0.05 };
    }
  };

  const matProps = getMaterialProps();
  const pullOffset = config.pulledOut || 0;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
    >
      <group rotation={[0, 0, config.lean || 0]}>
      {/* Main book cover body */}
      <mesh position={[0, 0, pullOffset]}>
        <boxGeometry args={[config.thickness, config.height, config.depth]} />
        <meshStandardMaterial
          color={config.color}
          roughness={matProps.roughness + (config.worn || 0) * 0.1}
          metalness={matProps.metalness}
        />
      </mesh>

      {/* Page edges - visible from top, bottom, and front */}
      {config.hasPageEdges !== false && (
        <>
          {/* Front page edge (most visible) */}
          <mesh position={[config.thickness * 0.48, 0, config.depth / 2 + 0.001 + pullOffset]}>
            <boxGeometry args={[config.thickness * 0.92, config.height * 0.96, 0.003]} />
            <meshStandardMaterial
              color={paperColor}
              roughness={0.95}
            />
          </mesh>

          {/* Top page edge */}
          <mesh position={[config.thickness * 0.48, config.height / 2 + 0.001, pullOffset]}>
            <boxGeometry args={[config.thickness * 0.92, 0.003, config.depth * 0.98]} />
            <meshStandardMaterial
              color={paperColor}
              roughness={0.95}
            />
          </mesh>

          {/* Bottom page edge */}
          <mesh position={[config.thickness * 0.48, -config.height / 2 - 0.001, pullOffset]}>
            <boxGeometry args={[config.thickness * 0.92, 0.003, config.depth * 0.98]} />
            <meshStandardMaterial
              color={paperColor}
              roughness={0.95}
            />
          </mesh>
        </>
      )}

      {/* Spine details on left side (visible face) */}
      <group position={[-config.thickness / 2, 0, pullOffset]}>
        {/* Spine base (different color option) */}
        {config.spineColor && (
          <mesh position={[-0.001, 0, 0]}>
            <boxGeometry args={[0.002, config.height, config.depth]} />
            <meshStandardMaterial
              color={config.spineColor}
              roughness={matProps.roughness}
            />
          </mesh>
        )}

        {/* Gold leaf title band - Optimized to single element */}
        {config.hasGoldLeaf && (
          <mesh position={[-0.002, config.height * 0.25, 0]}>
            <boxGeometry args={[0.003, config.height * 0.15, config.depth * 0.85]} />
            <meshStandardMaterial
              color="#d4af37"
              metalness={0.85}
              roughness={0.25}
              emissive="#8b6914"
              emissiveIntensity={0.2}
            />
          </mesh>
        )}

        {/* Ribbing on spine - Optimized to 2 ribs instead of 4 */}
        {config.hasRibbing && (
          <>
            {[0.25, -0.15].map((yOffset, i) => (
              <mesh
                key={`rib-${i}`}
                position={[-0.0015, config.height * yOffset, 0]}
              >
                <boxGeometry args={[0.004, 0.012, config.depth * 0.92]} />
                <meshStandardMaterial
                  color={new THREE.Color(config.color).multiplyScalar(0.85)}
                  roughness={0.9}
                />
              </mesh>
            ))}
          </>
        )}
      </group>

      {/* Removed dust jackets, wear effects, bookmarks, and embossing for performance optimization */}
      </group>
    </group>
  );
};

/**
 * Utility: Generate realistic book configuration with seeded randomness
 */
export const generateRealisticBook = (
  seed: number,
  colorPalette: string[],
  styleHint?: 'victorian' | 'artdeco' | 'library' | 'standard'
): BookConfig => {
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const rand = (offset: number) => seededRandom(seed + offset);

  // Determine book style based on hint
  let bookStyle: BookConfig['bookStyle'] = 'leather';
  if (styleHint === 'artdeco') {
    bookStyle = rand(10) > 0.7 ? 'modern' : rand(10) > 0.4 ? 'cloth' : 'leather';
  } else if (styleHint === 'victorian') {
    bookStyle = rand(10) > 0.6 ? 'antique' : 'leather';
  } else if (styleHint === 'library') {
    bookStyle = rand(10) > 0.7 ? 'antique' : rand(10) > 0.3 ? 'leather' : 'cloth';
  }

  const worn = rand(20);
  const isSpecial = rand(30) > 0.75;

  // Optimized: Reduced expensive features for better performance
  return {
    height: 0.25 + rand(0) * 0.35,
    thickness: 0.025 + rand(1) * 0.04,
    depth: 0.14 + rand(2) * 0.02,
    color: colorPalette[Math.floor(rand(3) * colorPalette.length)],
    spineColor: rand(4) > 0.8 ? colorPalette[Math.floor(rand(5) * colorPalette.length)] : undefined,
    hasGoldLeaf: rand(6) > 0.85, // Reduced from 0.65 to 0.85 (fewer gold leaf books)
    hasDustJacket: false, // Disabled for performance
    worn: worn,
    lean: rand(8) * 0.08 - 0.04,
    pulledOut: rand(9) > 0.95 ? rand(10) * 0.02 : 0, // Reduced pull-out frequency
    hasRibbing: rand(11) > 0.85, // Reduced from complex logic to simple 15% chance
    hasPageEdges: true,
    bookStyle: bookStyle,
  };
};

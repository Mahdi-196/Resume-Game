import { useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

/**
 * Globe with texture - wrapped in Suspense for texture loading
 */
const GlobeWithTexture = ({
  textureUrl,
  position,
  scale
}: {
  textureUrl: string;
  position: [number, number, number];
  scale: number;
}) => {
  const texture = useTexture(textureUrl);

  const material = useMemo(() => {
    // Enhanced contrast and vibrancy with optimized texture settings
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter; // Faster filtering
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false; // Disable mipmaps for performance

    return new THREE.MeshStandardMaterial({
      map: texture,
      color: "#ffffff", // No color tint - show true map colors
      roughness: 0.4,    // Slightly rougher for better performance
      metalness: 0.0,    // Non-metallic for paper-like appearance
      emissive: "#1a1510", // Subtle warm glow for depth
      emissiveIntensity: 0.1, // Reduced for performance
      envMapIntensity: 1.0 // Reduced for performance
    });
  }, [texture]);

  return (
    <mesh position={position} material={material}>
      <sphereGeometry args={[0.25 * scale, 16, 16]} />
    </mesh>
  );
};

/**
 * Procedural Antique Globe - Lightweight replacement for GLTF model
 * Uses simple geometry (sphere + torus + cylinder) instead of 447KB model
 */
export const ProceduralGlobe = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  textureUrl
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  textureUrl?: string;
}) => {
  // Shared materials for performance - enhanced contrast
  const materials = useMemo(() => ({
    globe: new THREE.MeshStandardMaterial({
      color: "#d4c5a9",
      roughness: 0.7,
      metalness: 0.1
    }),
    brass: new THREE.MeshStandardMaterial({
      color: "#b8860b", // Rich golden brass
      roughness: 0.25,   // Shinier for more reflections
      metalness: 0.85,   // More metallic for better highlights
      emissive: "#4a3820", // Warm metallic glow
      emissiveIntensity: 0.1
    }),
    wood: new THREE.MeshStandardMaterial({
      color: "#2d1b0e", // Deeper mahogany wood
      roughness: 0.8,
      metalness: 0.05,
      emissive: "#1a0f08", // Subtle warmth
      emissiveIntensity: 0.08
    })
  }), []);

  const globeRadius = 0.25 * scale;
  const baseHeight = 0.08 * scale;
  const standHeight = 0.15 * scale;

  // Calculate total height from base to get proper positioning
  const totalBaseAndStandHeight = baseHeight + standHeight;
  const globePosition: [number, number, number] = [0, totalBaseAndStandHeight + globeRadius, 0];

  return (
    <group position={position} rotation={rotation}>
      {/* Globe sphere - main feature (with optional texture) */}
      {textureUrl ? (
        <Suspense fallback={
          <mesh position={globePosition} material={materials.globe}>
            <sphereGeometry args={[globeRadius, 16, 16]} />
          </mesh>
        }>
          <GlobeWithTexture
            textureUrl={textureUrl}
            position={globePosition}
            scale={scale}
          />
        </Suspense>
      ) : (
        <mesh position={globePosition} material={materials.globe}>
          <sphereGeometry args={[globeRadius, 16, 16]} />
        </mesh>
      )}

      {/* Brass meridian arc (partial C-shape from pole to pole) */}
      <mesh
        position={globePosition}
        rotation={[0, Math.PI / 6, Math.PI / 2]} // Tilted for classic globe look
        material={materials.brass}
      >
        <torusGeometry
          args={[
            globeRadius + 0.01,  // radius
            0.008,               // tube thickness
            8,                   // radial segments
            32,                  // tubular segments
            Math.PI * 1.2        // arc angle (216 degrees, not full circle)
          ]}
        />
      </mesh>

      {/* Wooden stand/pedestal */}
      <mesh position={[0, baseHeight + standHeight / 2, 0]} material={materials.wood}>
        <cylinderGeometry args={[0.08 * scale, 0.1 * scale, standHeight, 8]} />
      </mesh>

      {/* Wooden base (circular platform) - sits on desk surface */}
      <mesh position={[0, baseHeight / 2, 0]} material={materials.wood}>
        <cylinderGeometry args={[0.12 * scale, 0.12 * scale, baseHeight, 12]} />
      </mesh>

      {/* Base edge trim (decorative ring) */}
      <mesh position={[0, baseHeight, 0]} material={materials.brass}>
        <torusGeometry args={[0.11 * scale, 0.006, 6, 16]} />
      </mesh>
    </group>
  );
};

import { useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * Persian Rug - 1930s vintage oriental rug with authentic texture
 * Uses real Persian rug image for authentic detail
 */
export const PersianRug = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Load texture using THREE.TextureLoader
    const loader = new THREE.TextureLoader();
    loader.load(
      '/rug.jpeg',
      (loadedTexture) => {
        // Crop 5% from top and bottom edges
        loadedTexture.repeat.y = 0.9; // Use 90% of texture (crop 5% top + 5% bottom)
        loadedTexture.offset.y = 0.05; // Start 5% from bottom
        loadedTexture.anisotropy = 16; // Anisotropic filtering for better quality at angles
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Error loading rug texture:', error);
      }
    );
  }, []);

  // Don't render until texture is loaded
  if (!texture) return null;

  return (
    <group position={position} rotation={rotation}>
      {/* Main rug with texture - proper 2731x3306px ratio (1:1.21) */}
      <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 2]} receiveShadow>
        <planeGeometry args={[11.5, 13.9]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
};

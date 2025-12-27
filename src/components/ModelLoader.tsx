import { useGLTF } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { useEffect } from 'react';

interface ModelLoaderProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  hideMeshes?: string[]; // Array of mesh names to hide (supports partial matching)
}

/**
 * Generic model loader component for GLTF/GLB files
 * Usage: <ModelLoader modelPath="/models/desk-lamp.glb" position={[x, y, z]} />
 */
const Model = ({ modelPath, position, rotation, scale, onClick, onPointerOver, onPointerOut, hideMeshes }: ModelLoaderProps) => {
  const gltf = useGLTF(modelPath);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    console.log('Loaded GLTF:', modelPath, gltf);

    // Ensure materials render properly and hide specified meshes
    if (gltf.scene) {
      // Log all mesh names for debugging
      console.log(`=== Meshes in ${modelPath} ===`);
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          console.log('  Mesh name:', child.name || 'unnamed');
        }
      });
      console.log('=========================');

      gltf.scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.side = 2; // THREE.DoubleSide - render both sides

          // Fix materials that appear black by ensuring proper rendering
          if (child.material.metalness !== undefined) {
            child.material.metalness = Math.min(child.material.metalness, 0.5);
          }
          if (child.material.roughness !== undefined && child.material.roughness === 0) {
            child.material.roughness = 0.4;
          }

          child.material.needsUpdate = true;
          child.castShadow = true;
          child.receiveShadow = true;

          // Hide meshes that match names in hideMeshes array
          if (hideMeshes && child.name) {
            const shouldHide = hideMeshes.some(hideName =>
              child.name.toLowerCase().includes(hideName.toLowerCase())
            );
            if (shouldHide) {
              child.visible = false;
              console.log('Hiding mesh:', child.name);
            }
          }
        }
      });
    }
  }, [gltf, modelPath, hideMeshes]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  if (!gltf || !gltf.scene) {
    console.error('Failed to load model:', modelPath);
    return null;
  }

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onPointerOver?.();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onPointerOut?.();
      }}
    >
      <primitive object={gltf.scene} />
    </group>
  );
};

export const ModelLoader = (props: ModelLoaderProps) => {
  return (
    <Suspense fallback={null}>
      <Model {...props} />
    </Suspense>
  );
};

// Preload models to avoid loading delays
export const preloadModel = (path: string) => {
  useGLTF.preload(path);
};

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface InteractiveDetectiveBoardProps {
  onInteraction: (type: string, data?: unknown) => void;
  onBoardClick?: () => void;
  showContent?: boolean;
  onContentClose?: () => void;
}

export const InteractiveDetectiveBoard = ({ onInteraction, onBoardClick, showContent }: InteractiveDetectiveBoardProps) => {
  // Track opacity for fade animation
  const previewGroupRef = useRef<THREE.Group>(null);
  const targetOpacity = useRef(1);
  const currentOpacity = useRef(1);

  // Animate opacity smoothly
  useFrame((state, delta) => {
    targetOpacity.current = showContent ? 0 : 1;

    // Smooth lerp transition
    currentOpacity.current += (targetOpacity.current - currentOpacity.current) * delta * 8;

    // Update opacity for all preview elements
    if (previewGroupRef.current) {
      previewGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach(m => {
              m.transparent = true;
              m.opacity = currentOpacity.current;
            });
          } else {
            mat.transparent = true;
            mat.opacity = currentOpacity.current;
          }
        }
      });
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    console.log('Board clicked!', { onBoardClick, hasCallback: !!onBoardClick });
    onBoardClick?.();
  };

  return (
    <>
    <group
      position={[0, 4.5, 9.9]}
      rotation={[0, Math.PI, 0]}
    >
      {/* Main Wooden Board Background - Light brown wood */}
      <mesh
        onClick={handleClick}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'crosshair';
        }}
      >
        <planeGeometry args={[12.5, 6.5]} />
        <meshStandardMaterial
          color="#D2B48C"
          roughness={0.7}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Wooden Borders - Dark brown wood (also clickable) */}
      <mesh position={[0, 3.25, 0.02]} onClick={handleClick}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -3.25, 0.02]} onClick={handleClick}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-6.25, 0, 0.02]} onClick={handleClick}>
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[6.25, 0, 0.02]} onClick={handleClick}>
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Preview content group - fades out on click */}
      <group ref={previewGroupRef}>
      {/* Header Bar - Top of board */}
      <mesh position={[0, 2.8, 0.03]}>
        <planeGeometry args={[11, 0.8]} />
        <meshStandardMaterial color="#1a0d00" />
      </mesh>
      <Text
        position={[0, 2.8, 0.04]}
        fontSize={0.35}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        CASE FILE: MAHDI GHALEB
      </Text>

      {/* Push pins */}
      <mesh position={[-4.5, 2.2, 0.03]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[4.5, 2.2, 0.03]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[-4.2, 0.5, 0.03]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[4.2, 0.5, 0.03]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[-4.5, -1.5, 0.03]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[4.5, -1.5, 0.03]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[-1.5, 1.5, 0.03]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[1.5, 1.5, 0.03]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Red yarn strings - web pattern */}
      <mesh position={[-3, 1.8, 0.02]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[3.5, 0.02, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>
      <mesh position={[3, 1.8, 0.02]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[3.5, 0.02, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>
      <mesh position={[-3, 0, 0.02]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[4, 0.02, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>
      <mesh position={[3, 0, 0.02]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[4, 0.02, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>
      <mesh position={[-2, -1, 0.02]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[3, 0.02, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>
      <mesh position={[2, -1, 0.02]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[3, 0.02, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>

      {/* Photo 1 - Top left (Polaroid style) */}
      <mesh position={[-4.5, 2, 0.02]} rotation={[0, 0, -0.08]}>
        <planeGeometry args={[1.3, 1.5]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      <mesh position={[-4.5, 2.1, 0.03]} rotation={[0, 0, -0.08]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
      <Text
        position={[-4.5, 1.3, 0.04]}
        fontSize={0.12}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.08]}
      >
        PROFILE
      </Text>

      {/* Photo 2 - Top right */}
      <mesh position={[4.5, 2, 0.02]} rotation={[0, 0, 0.1]}>
        <planeGeometry args={[1.3, 1.5]} />
        <meshStandardMaterial color="#F5F5F5" />
      </mesh>
      <mesh position={[4.5, 2.1, 0.03]} rotation={[0, 0, 0.1]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
      <Text
        position={[4.5, 1.3, 0.04]}
        fontSize={0.12}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0.1]}
      >
        LOCATION
      </Text>

      {/* Sticky note 1 - Yellow */}
      <mesh position={[-4.2, 0.3, 0.02]} rotation={[0, 0, -0.05]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial color="#FFEB3B" />
      </mesh>
      <Text
        position={[-4.2, 0.6, 0.03]}
        fontSize={0.15}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.05]}
      >
        SKILLS:
      </Text>
      <Text
        position={[-4.2, 0.3, 0.03]}
        fontSize={0.1}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.05]}
      >
        React
      </Text>
      <Text
        position={[-4.2, 0.15, 0.03]}
        fontSize={0.1}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.05]}
      >
        TypeScript
      </Text>
      <Text
        position={[-4.2, 0, 0.03]}
        fontSize={0.1}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.05]}
      >
        AWS
      </Text>

      {/* Sticky note 2 - Yellow */}
      <mesh position={[4.2, 0.3, 0.02]} rotation={[0, 0, 0.07]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial color="#FFEB3B" />
      </mesh>
      <Text
        position={[4.2, 0.5, 0.03]}
        fontSize={0.12}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0.07]}
      >
        EXPERIENCE
      </Text>
      <Text
        position={[4.2, 0.2, 0.03]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0.07]}
      >
        5+ Years
      </Text>

      {/* Newspaper clipping 1 */}
      <mesh position={[-4.5, -1.7, 0.02]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <Text
        position={[-4.5, -1.3, 0.03]}
        fontSize={0.12}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.12]}
      >
        PROJECTS
      </Text>
      <Text
        position={[-4.5, -1.6, 0.03]}
        fontSize={0.08}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.12]}
      >
        E-Commerce
      </Text>
      <Text
        position={[-4.5, -1.8, 0.03]}
        fontSize={0.08}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.12]}
      >
        Dashboard
      </Text>
      <Text
        position={[-4.5, -2, 0.03]}
        fontSize={0.08}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, -0.12]}
      >
        Chat App
      </Text>

      {/* Newspaper clipping 2 */}
      <mesh position={[4.5, -1.7, 0.02]} rotation={[0, 0, 0.1]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <Text
        position={[4.5, -1.3, 0.03]}
        fontSize={0.12}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0.1]}
      >
        CONTACT
      </Text>
      <Text
        position={[4.5, -1.6, 0.03]}
        fontSize={0.08}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0.1]}
      >
        Available
      </Text>
      <Text
        position={[4.5, -1.85, 0.03]}
        fontSize={0.08}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0.1]}
      >
        For Hire
      </Text>

      {/* Center card - Main call to action */}
      <mesh position={[0, 0, 0.02]} rotation={[0, 0, 0.02]}>
        <planeGeometry args={[3.5, 2]} />
        <meshStandardMaterial color="#FFFACD" />
      </mesh>
      <mesh position={[0, 0, 0.021]}>
        <planeGeometry args={[3.3, 1.8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[3.1, 1.6]} />
        <meshStandardMaterial color="#FFFACD" />
      </mesh>
      <Text
        position={[0, 0.6, 0.03]}
        fontSize={0.3}
        color="#8B0000"
        anchorX="center"
        anchorY="middle"
      >
        SUSPECT FILE
      </Text>
      <Text
        position={[0, 0.15, 0.03]}
        fontSize={0.22}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        MAHDI GHALEB
      </Text>
      <mesh position={[0, -0.35, 0.025]}>
        <planeGeometry args={[2.5, 0.5]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[0, -0.35, 0.03]}
        fontSize={0.16}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        CLICK TO INVESTIGATE
      </Text>
      </group>
    </group>

    </>
  );
};
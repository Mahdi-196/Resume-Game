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
        <planeGeometry args={[11, 0.7]} />
        <meshStandardMaterial color="#1a0d00" />
      </mesh>
      <Text
        position={[0, 2.8, 0.04]}
        fontSize={0.32}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Courier-New-Bold.woff"
      >
        CASE FILE: MAHDI GHALEB
      </Text>

      {/* Red yarn strings - connecting case files */}
      <mesh position={[-3.2, 1.2, 0.02]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.015, 2.8, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>
      <mesh position={[3.2, 1.2, 0.02]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.015, 2.8, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>
      <mesh position={[0, 1.9, 0.02]}>
        <boxGeometry args={[6.5, 0.015, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>
      <mesh position={[0, 0.4, 0.02]}>
        <boxGeometry args={[6.5, 0.015, 0.01]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>

      {/* Case File 1 - ABOUT ME (Top Left) */}
      <mesh position={[-3.2, 1.2, 0.03]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[-3.2, 1.7, 0.04]}>
        <planeGeometry args={[2.1, 0.3]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[-3.2, 1.7, 0.05]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        CASE FILE #001
      </Text>
      <Text
        position={[-3.2, 1.35, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        ABOUT ME
      </Text>
      <Text
        position={[-3.2, 1.05, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Full-Stack Dev
      </Text>
      <Text
        position={[-3.2, 0.9, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        3D Enthusiast
      </Text>
      <Text
        position={[-3.2, 0.75, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Problem Solver
      </Text>
      {/* Push pin */}
      <mesh position={[-3.2, 1.85, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Case File 2 - EDUCATION (Top Right) */}
      <mesh position={[3.2, 1.2, 0.03]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[3.2, 1.7, 0.04]}>
        <planeGeometry args={[2.1, 0.3]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[3.2, 1.7, 0.05]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        CASE FILE #002
      </Text>
      <Text
        position={[3.2, 1.35, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        EDUCATION
      </Text>
      <Text
        position={[3.2, 1.05, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Computer Science
      </Text>
      <Text
        position={[3.2, 0.9, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Self-Taught Dev
      </Text>
      <Text
        position={[3.2, 0.75, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Lifelong Learner
      </Text>
      {/* Push pin */}
      <mesh position={[3.2, 1.85, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Case File 3 - SKILLS (Bottom Left) */}
      <mesh position={[-3.2, -0.35, 0.03]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial color="#FFEB3B" />
      </mesh>
      <mesh position={[-3.2, 0.15, 0.04]}>
        <planeGeometry args={[2.1, 0.3]} />
        <meshStandardMaterial color="#1a0d00" />
      </mesh>
      <Text
        position={[-3.2, 0.15, 0.05]}
        fontSize={0.14}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        CASE FILE #003
      </Text>
      <Text
        position={[-3.2, -0.2, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        SKILLS
      </Text>
      <Text
        position={[-3.2, -0.5, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        React • TypeScript
      </Text>
      <Text
        position={[-3.2, -0.65, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Three.js • Node.js
      </Text>
      <Text
        position={[-3.2, -0.8, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        AWS • Docker
      </Text>
      {/* Push pin */}
      <mesh position={[-3.2, 0.3, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Case File 4 - PROJECTS (Bottom Right) */}
      <mesh position={[3.2, -0.35, 0.03]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[3.2, 0.15, 0.04]}>
        <planeGeometry args={[2.1, 0.3]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[3.2, 0.15, 0.05]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        CASE FILE #004
      </Text>
      <Text
        position={[3.2, -0.2, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        PROJECTS
      </Text>
      <Text
        position={[3.2, -0.5, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        E-Commerce
      </Text>
      <Text
        position={[3.2, -0.65, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Chat Application
      </Text>
      <Text
        position={[3.2, -0.8, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Analytics Dashboard
      </Text>
      {/* Push pin */}
      <mesh position={[3.2, 0.3, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Center card - Main call to action */}
      <mesh position={[0, -1.8, 0.03]}>
        <planeGeometry args={[4, 1.2]} />
        <meshStandardMaterial color="#1a0d00" />
      </mesh>
      <mesh position={[0, -1.8, 0.04]}>
        <planeGeometry args={[3.85, 1.05]} />
        <meshStandardMaterial color="#FFFACD" />
      </mesh>
      <Text
        position={[0, -1.55, 0.05]}
        fontSize={0.24}
        color="#8B0000"
        anchorX="center"
        anchorY="middle"
      >
        CLASSIFIED FILES
      </Text>
      <Text
        position={[0, -1.85, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        MAHDI GHALEB
      </Text>
      <mesh position={[0, -2.15, 0.045]}>
        <planeGeometry args={[3, 0.35]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[0, -2.15, 0.05]}
        fontSize={0.13}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        [ CLICK TO INVESTIGATE ]
      </Text>
      {/* Corner push pins for center card */}
      <mesh position={[-1.9, -1.2, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[1.9, -1.2, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      </group>
    </group>

    </>
  );
};
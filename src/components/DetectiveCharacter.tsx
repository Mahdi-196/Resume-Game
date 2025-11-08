
import { useRef, useState, useEffect, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DetectiveCharacterProps {
  position?: [number, number, number];
  onInteraction: (type: string, data?: unknown) => void;
  scale?: number;
  autoRotate?: boolean;
}

export const DetectiveCharacter = forwardRef<THREE.Group, DetectiveCharacterProps>(
  ({ 
    position = [0, 0, 0], 
    onInteraction, 
    scale = 1, 
    autoRotate = false 
  }, ref) => {
  
  const groupRef = useRef<THREE.Group>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [rotationY, setRotationY] = useState(0);

  // Auto rotation or walking animation
  useFrame((state) => {
    const currentRef = ref && 'current' in ref ? ref.current : groupRef.current;
    
    if (currentRef) {
      if (autoRotate) {
        currentRef.rotation.y += 0.01;
      } else if (isWalking) {
        // Simple walking animation - bob up and down
        currentRef.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      }
    }
  });

  // Simple patrol behavior when not auto-rotating
  useEffect(() => {
    if (autoRotate) return;
    
    const interval = setInterval(() => {
      setIsWalking(true);
      const newRotation = Math.random() * Math.PI * 2;
      setRotationY(newRotation);
      
      setTimeout(() => {
        setIsWalking(false);
      }, 2000); // Walk for 2 seconds
    }, 8000); // Every 8 seconds

    return () => clearInterval(interval);
  }, [autoRotate]);

  return (
    <group 
      ref={ref || groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      scale={[scale, scale, scale]}
      onClick={() => onInteraction('detective')}
      onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
    >
      {/* Detective Body - Long Coat */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.7, 1.4, 0.35]} />
        <meshStandardMaterial color="#2c1810" roughness={0.8} />
      </mesh>
      
      {/* Coat Lapels */}
      <mesh position={[-0.25, 1.4, 0.18]}>
        <boxGeometry args={[0.15, 0.4, 0.02]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.9} />
      </mesh>
      <mesh position={[0.25, 1.4, 0.18]}>
        <boxGeometry args={[0.15, 0.4, 0.02]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.9} />
      </mesh>
      
      {/* Detective Head - oval shaped */}
      <mesh position={[0, 1.9, 0]} scale={[0.9, 1.1, 0.95]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>

      {/* Mean Detective Face - Prominent Features */}

      {/* Eyes - larger, darker, more intense */}
      <mesh position={[-0.07, 1.93, 0.21]}>
        <sphereGeometry args={[0.017, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[0.07, 1.93, 0.21]}>
        <sphereGeometry args={[0.017, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Eyebrows - thick, heavily angled down for stern/mean look */}
      <mesh position={[-0.07, 1.97, 0.21]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.055, 0.014, 0.009]} />
        <meshStandardMaterial color="#1a0f0a" />
      </mesh>
      <mesh position={[0.07, 1.97, 0.21]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.055, 0.014, 0.009]} />
        <meshStandardMaterial color="#1a0f0a" />
      </mesh>

      {/* Nose - smaller */}
      <mesh position={[0, 1.88, 0.22]} scale={[0.8, 1, 1.2]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#b07550" />
      </mesh>

      {/* Mouth - stern, slightly downturned */}
      <mesh position={[0, 1.81, 0.21]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.05, 0.009, 0.007]} />
        <meshStandardMaterial color="#6a3015" />
      </mesh>

      {/* Mustache - thick, bushy, prominent */}
      <mesh position={[-0.032, 1.845, 0.215]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.045, 0.016, 0.01]} />
        <meshStandardMaterial color="#1a0f0a" />
      </mesh>
      <mesh position={[0.032, 1.845, 0.215]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.045, 0.016, 0.01]} />
        <meshStandardMaterial color="#1a0f0a" />
      </mesh>

      {/* Jawline - strong, defined */}
      <mesh position={[0, 1.74, 0.20]}>
        <boxGeometry args={[0.14, 0.035, 0.012]} />
        <meshStandardMaterial color="#b88660" />
      </mesh>

      {/* Detective Fedora Hat - smaller and sitting on head */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.20, 0.18, 0.18]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Hat Brim */}
      <mesh position={[0, 2.02, 0]}>
        <cylinderGeometry args={[0.30, 0.30, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Hat Band */}
      <mesh position={[0, 2.06, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.04]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      
      {/* Arms in Coat */}
      <mesh position={[-0.45, 1.2, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color="#2c1810" roughness={0.8} />
      </mesh>
      <mesh position={[0.45, 1.2, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color="#2c1810" roughness={0.8} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.45, 0.7, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#d4a574" roughness={0.7} />
      </mesh>
      <mesh position={[0.45, 0.7, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#d4a574" roughness={0.7} />
      </mesh>
      
      {/* Legs - Dark Trousers */}
      <mesh position={[-0.18, 0.3, 0]}>
        <boxGeometry args={[0.16, 0.9, 0.16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.18, 0.3, 0]}>
        <boxGeometry args={[0.16, 0.9, 0.16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* Detective Shoes - Dress Shoes */}
      <mesh position={[-0.18, -0.1, 0.12]}>
        <boxGeometry args={[0.2, 0.12, 0.35]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.18, -0.1, 0.12]}>
        <boxGeometry args={[0.2, 0.12, 0.35]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Coat Buttons */}
      <mesh position={[0, 1.5, 0.18]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.2, 0.18]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0.18]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      
      {/* Collar */}
      <mesh position={[0, 1.7, 0.1]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.6} />
      </mesh>
      
      {/* Tie */}
      <mesh position={[0, 1.5, 0.16]}>
        <boxGeometry args={[0.08, 0.3, 0.02]} />
        <meshStandardMaterial color="#8B0000" roughness={0.7} />
      </mesh>

      {/* Subtle lighting for the character */}
      <pointLight position={[0, 2.5, 1]} intensity={0.3} color="#ffd700" />
    </group>
  );
});

DetectiveCharacter.displayName = 'DetectiveCharacter';

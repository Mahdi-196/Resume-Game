import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Line } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';


interface InteractiveDetectiveBoardProps {
  onInteraction: (type: string, data?: unknown) => void;
  onBoardClick?: () => void;
  onCaseFileClick?: (caseFile: 'about' | 'education' | 'skills' | 'projects' | null) => void;
  showContent?: boolean;
  selectedCaseFile?: 'about' | 'education' | 'skills' | 'projects' | null;
  overlayVisible?: boolean;
  onContentClose?: () => void;
}

type ProjectDetail = 'refocused' | null;

// Link with progress circle component
const LinkWithProgress = ({ position }: { position: [number, number, number] }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const holdStartRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    holdStartRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      if (holdStartRef.current) {
        const elapsed = Date.now() - holdStartRef.current;
        const progress = Math.min(elapsed / 2000, 1);
        setHoldProgress(progress);

        if (progress >= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          window.open('https://refocused.app', '_blank');
          setHoldProgress(0);
          holdStartRef.current = null;
        }
      }
    }, 16);
  };

  const handlePointerUp = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setHoldProgress(0);
    holdStartRef.current = null;
  };

  return (
    <group position={position}>
      <group
        onClick={(e) => e.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerEnter={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
          handlePointerUp();
        }}
      >
        <mesh>
          <planeGeometry args={[2.5, 0.24]} />
          <meshStandardMaterial color="#CD853F" roughness={0.6} />
        </mesh>
        <Text position={[0.1, 0, 0.001]} fontSize={0.11} color="#1C1C1C" anchorX="center" anchorY="middle" letterSpacing={0.01}>
          🔗 refocused.app (Hold 2s)
        </Text>

        {/* Progress circle background */}
        <mesh position={[-1.05, 0, 0.001]}>
          <ringGeometry args={[0.10, 0.12, 32]} />
          <meshBasicMaterial color="#1C1C1C" opacity={0.3} transparent />
        </mesh>

        {/* Progress circle fill */}
        {holdProgress > 0 && (
          <mesh position={[-1.05, 0, 0.002]} rotation={[0, 0, -Math.PI / 2]}>
            <circleGeometry args={[0.11, 32, 0, holdProgress * Math.PI * 2]} />
            <meshBasicMaterial color="#1C1C1C" opacity={0.7} transparent />
          </mesh>
        )}
      </group>
    </group>
  );
};

export const InteractiveDetectiveBoard = ({ onInteraction, onBoardClick, onCaseFileClick, showContent, selectedCaseFile, overlayVisible }: InteractiveDetectiveBoardProps) => {
  const navigate = useNavigate();

  // Track which project detail is selected (for nested navigation)
  const [selectedProject, setSelectedProject] = useState<ProjectDetail>(null);

  // Track which paper is zoomed in (frontend, backend, or ai)
  const [zoomedPaper, setZoomedPaper] = useState<'frontend' | 'backend' | 'ai' | null>(null);

  // Reset zoomed paper when navigating away from ReFocused project
  useEffect(() => {
    if (selectedProject !== 'refocused') {
      setZoomedPaper(null);
    }
  }, [selectedProject]);

  // Track opacity for fade animations
  const previewGroupRef = useRef<THREE.Group>(null);
  const detailGroupRef = useRef<THREE.Group>(null);
  const previewTargetOpacity = useRef(1);
  const previewCurrentOpacity = useRef(1);
  const detailTargetOpacity = useRef(0);
  const detailCurrentOpacity = useRef(0);

  // Animate opacity smoothly - fade out preview when detail shown, fade in detail
  useFrame((state, delta) => {
    // Preview fade out/in
    previewTargetOpacity.current = selectedCaseFile ? 0 : 1;
    previewCurrentOpacity.current += (previewTargetOpacity.current - previewCurrentOpacity.current) * delta * 8;

    // Detail fade in/out
    detailTargetOpacity.current = selectedCaseFile ? 1 : 0;
    detailCurrentOpacity.current += (detailTargetOpacity.current - detailCurrentOpacity.current) * delta * 6;

    // Update opacity and visibility for preview elements
    if (previewGroupRef.current) {
      // Hide preview completely when opacity is very low
      previewGroupRef.current.visible = previewCurrentOpacity.current > 0.01;

      previewGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach(m => {
              m.transparent = true;
              m.opacity = previewCurrentOpacity.current;
            });
          } else {
            mat.transparent = true;
            mat.opacity = previewCurrentOpacity.current;
          }
        }
      });
    }

    // Update opacity and visibility for detail elements
    if (detailGroupRef.current) {
      // Hide detail completely when opacity is very low
      detailGroupRef.current.visible = detailCurrentOpacity.current > 0.01;

      detailGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach(m => {
              m.transparent = true;
              m.opacity = detailCurrentOpacity.current;
            });
          } else {
            mat.transparent = true;
            mat.opacity = detailCurrentOpacity.current;
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
        onClick={selectedProject === 'refocused' ? undefined : handleClick}
        onPointerEnter={() => {
          if (selectedProject !== 'refocused') {
            document.body.style.cursor = 'pointer';
          }
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
      <mesh position={[0, 3.25, 0.02]} onClick={selectedProject === 'refocused' ? undefined : handleClick}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -3.25, 0.02]} onClick={selectedProject === 'refocused' ? undefined : handleClick}>
        <boxGeometry args={[13, 0.25, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-6.25, 0, 0.02]} onClick={selectedProject === 'refocused' ? undefined : handleClick}>
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[6.25, 0, 0.02]} onClick={selectedProject === 'refocused' ? undefined : handleClick}>
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
      >
        CASE FILE: MAHDI GHALEB
      </Text>


      {/* Case File 1 - ABOUT ME (Top Left) */}
      <group
        onClick={(e) => {
          if (!showContent || selectedCaseFile) return; // Only clickable when board is zoomed and no detail view shown
          e.stopPropagation();
          onCaseFileClick?.('about');
        }}
        onPointerEnter={() => {
          if (showContent && !selectedCaseFile) document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => document.body.style.cursor = 'auto'}
        visible={!selectedCaseFile}
      >
      {/* Folder body - main manila envelope */}
      <mesh position={[-3.2, 1.2, 0.03]}>
        <boxGeometry args={[2.2, 1.3, 0.03]} />
        <meshStandardMaterial color="#C09858" roughness={0.9} />
      </mesh>
      {/* Folder tab at top */}
      <mesh position={[-3.2, 1.85, 0.045]}>
        <boxGeometry args={[2.2, 0.2, 0.025]} />
        <meshStandardMaterial color="#B58F4F" roughness={0.9} />
      </mesh>
      {/* File identifier label on top left */}
      <mesh position={[-4.15, 1.8, 0.06]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[-4.15, 1.8, 0.07]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        #001
      </Text>
      <Text
        position={[-3.2, 1.4, 0.05]}
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
      </group>

      {/* Case File 2 - EDUCATION (Top Right) */}
      <group
        onClick={(e) => {
          if (!showContent || selectedCaseFile) return; // Only clickable when board is zoomed and no detail view shown
          e.stopPropagation();
          onCaseFileClick?.('education');
        }}
        onPointerEnter={() => {
          if (showContent && !selectedCaseFile) document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => document.body.style.cursor = 'auto'}
        visible={!selectedCaseFile}
      >
      {/* Folder body - main manila envelope */}
      <mesh position={[3.2, 1.2, 0.03]}>
        <boxGeometry args={[2.2, 1.3, 0.03]} />
        <meshStandardMaterial color="#C09858" roughness={0.9} />
      </mesh>
      {/* Folder tab at top */}
      <mesh position={[3.2, 1.85, 0.045]}>
        <boxGeometry args={[2.2, 0.2, 0.025]} />
        <meshStandardMaterial color="#B58F4F" roughness={0.9} />
      </mesh>
      {/* File identifier label on top left */}
      <mesh position={[2.25, 1.8, 0.06]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[2.25, 1.8, 0.07]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        #002
      </Text>
      <Text
        position={[3.2, 1.4, 0.05]}
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
      </group>

      {/* Case File 3 - SKILLS (Bottom Left) */}
      <group
        onClick={(e) => {
          if (!showContent || selectedCaseFile) return; // Only clickable when board is zoomed and no detail view shown
          e.stopPropagation();
          onCaseFileClick?.('skills');
        }}
        onPointerEnter={() => {
          if (showContent && !selectedCaseFile) document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => document.body.style.cursor = 'auto'}
        visible={!selectedCaseFile}
      >
      {/* Folder body - manila envelope */}
      <mesh position={[-3.2, -1.35, 0.03]}>
        <boxGeometry args={[2.2, 1.3, 0.03]} />
        <meshStandardMaterial color="#C09858" roughness={0.9} />
      </mesh>
      {/* Folder tab at top */}
      <mesh position={[-3.2, -0.7, 0.045]}>
        <boxGeometry args={[2.2, 0.2, 0.025]} />
        <meshStandardMaterial color="#B58F4F" roughness={0.9} />
      </mesh>
      {/* File identifier label on top left */}
      <mesh position={[-4.15, -0.75, 0.06]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color="#1a0d00" />
      </mesh>
      <Text
        position={[-4.15, -0.75, 0.07]}
        fontSize={0.14}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        #003
      </Text>
      <Text
        position={[-3.2, -1.15, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        SKILLS
      </Text>
      <Text
        position={[-3.2, -1.5, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        React • TypeScript
      </Text>
      <Text
        position={[-3.2, -1.65, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Three.js • Node.js
      </Text>
      <Text
        position={[-3.2, -1.8, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        AWS • Docker
      </Text>
      {/* Push pin */}
      <mesh position={[-3.2, -0.7, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      </group>

      {/* Case File 4 - PROJECTS (Bottom Right) */}
      <group
        onClick={(e) => {
          if (!showContent || selectedCaseFile) return; // Only clickable when board is zoomed and no detail view shown
          e.stopPropagation();
          onCaseFileClick?.('projects');
        }}
        onPointerEnter={() => {
          if (showContent && !selectedCaseFile) document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => document.body.style.cursor = 'auto'}
        visible={!selectedCaseFile}
      >
      {/* Folder body - main manila envelope */}
      <mesh position={[3.2, -1.35, 0.03]}>
        <boxGeometry args={[2.2, 1.3, 0.03]} />
        <meshStandardMaterial color="#C09858" roughness={0.9} />
      </mesh>
      {/* Folder tab at top */}
      <mesh position={[3.2, -0.7, 0.045]}>
        <boxGeometry args={[2.2, 0.2, 0.025]} />
        <meshStandardMaterial color="#B58F4F" roughness={0.9} />
      </mesh>
      {/* File identifier label on top left */}
      <mesh position={[2.25, -0.75, 0.06]}>
        <planeGeometry args={[0.45, 0.25]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      <Text
        position={[2.25, -0.75, 0.07]}
        fontSize={0.14}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        #004
      </Text>
      <Text
        position={[3.2, -1.15, 0.05]}
        fontSize={0.18}
        color="#1a0d00"
        anchorX="center"
        anchorY="middle"
      >
        PROJECTS
      </Text>
      <Text
        position={[3.2, -1.5, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        E-Commerce
      </Text>
      <Text
        position={[3.2, -1.65, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Chat Application
      </Text>
      <Text
        position={[3.2, -1.8, 0.05]}
        fontSize={0.09}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Analytics Dashboard
      </Text>
      {/* Push pin */}
      <mesh position={[3.2, -0.7, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
      </mesh>
      </group>

      </group>
    </group>

    {/* DETAIL VIEWS - Fade in when a case file is selected */}
    {selectedCaseFile && (
      <group
        ref={detailGroupRef}
        position={[0, 4.5, 9.9]}
        rotation={[0, Math.PI, 0]}
      >

    {/* ABOUT ME DETAIL VIEW */}
    {selectedCaseFile === 'about' && (
      <>
        {/* Back Button */}
        <group
          position={[-5.5, 2.8, 0.04]}
          onClick={(e) => {
            e.stopPropagation();
            onCaseFileClick?.(null);
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          <mesh>
            <planeGeometry args={[1.2, 0.4]} />
            <meshStandardMaterial color="#1a0d00" />
          </mesh>
          <Text position={[0, 0, 0.01]} fontSize={0.15} color="#FFD700" anchorX="center" anchorY="middle">
            ← BACK
          </Text>
        </group>

        {/* Header Banner */}
        <mesh position={[0, 2.5, 0.03]}>
          <planeGeometry args={[11, 0.7]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[0, 2.5, 0.04]} fontSize={0.32} color="#FFD700" anchorX="center" anchorY="middle" letterSpacing={0.03}>
          CASE FILE #001: PROFESSIONAL SUMMARY
        </Text>

        {/* Document shadow */}
        <mesh position={[0.08, -0.08, 0.029]}>
          <planeGeometry args={[10.2, 4]} />
          <meshStandardMaterial color="#000000" opacity={0.2} transparent />
        </mesh>

        {/* Main Content Card - Professional Document */}
        <mesh position={[0, 0.3, 0.03]}>
          <planeGeometry args={[10, 3.8]} />
          <meshStandardMaterial color="#FFFEF0" roughness={0.95} />
        </mesh>

        {/* Document border */}
        <Line points={[[-4.95, 2.15, 0.031], [4.95, 2.15, 0.031], [4.95, -1.55, 0.031], [-4.95, -1.55, 0.031], [-4.95, 2.15, 0.031]]} color="#8B7355" lineWidth={2} />

        {/* Name header with underline */}
        <Text position={[0, 1.85, 0.04]} fontSize={0.30} color="#1a0d00" anchorX="center" anchorY="middle" letterSpacing={0.05}>
          MAHDI GHALEB
        </Text>
        <Line points={[[-2.5, 1.68, 0.04], [2.5, 1.68, 0.04]]} color="#8B0000" lineWidth={3} />

        {/* Title badge */}
        <mesh position={[0, 1.42, 0.04]}>
          <planeGeometry args={[6.5, 0.35]} />
          <meshStandardMaterial color="#FFE4B5" roughness={0.9} />
        </mesh>
        <Text position={[0, 1.42, 0.041]} fontSize={0.15} color="#8B0000" anchorX="center" anchorY="middle" letterSpacing={0.02}>
          Cloud & Full-Stack Engineer
        </Text>

        {/* Professional Summary Section */}
        <Text position={[0, 1.05, 0.04]} fontSize={0.12} color="#8B0000" anchorX="center" anchorY="middle" letterSpacing={0.05}>
          ═══ PROFESSIONAL SUMMARY ═══
        </Text>

        {/* Summary content - left aligned for readability */}
        <Text position={[-4.5, 0.75, 0.04]} fontSize={0.10} color="#1a0d00" anchorX="left" anchorY="middle" maxWidth={9}>
          Cloud & Full-Stack Engineer with deep, hands-on experience building, training, and
        </Text>
        <Text position={[-4.5, 0.60, 0.04]} fontSize={0.10} color="#1a0d00" anchorX="left" anchorY="middle" maxWidth={9}>
          deploying complex systems from the ground up. Highly skilled in the end-to-end MLOps
        </Text>
        <Text position={[-4.5, 0.45, 0.04]} fontSize={0.10} color="#1a0d00" anchorX="left" anchorY="middle" maxWidth={9}>
          pipeline (PyTorch, GCS), architecting high-performance FastAPI (Python) backends, and
        </Text>
        <Text position={[-4.5, 0.30, 0.04]} fontSize={0.10} color="#1a0d00" anchorX="left" anchorY="middle" maxWidth={9}>
          building modern Next.js (TypeScript) frontends. Eager to apply a comprehensive skill
        </Text>
        <Text position={[-4.5, 0.15, 0.04]} fontSize={0.10} color="#1a0d00" anchorX="left" anchorY="middle" maxWidth={9}>
          set to a challenging full-stack or cloud-native role.
        </Text>

        {/* Divider line */}
        <Line points={[[-4.5, -0.05, 0.04], [4.5, -0.05, 0.04]]} color="#C19A6B" lineWidth={1} />

        {/* Core Competencies Section */}
        <Text position={[0, -0.30, 0.04]} fontSize={0.11} color="#8B0000" anchorX="center" anchorY="middle" letterSpacing={0.04}>
          ═ CORE COMPETENCIES ═
        </Text>

        {/* Competencies in three columns */}
        <Text position={[-3.2, -0.55, 0.04]} fontSize={0.095} color="#333333" anchorX="left" anchorY="middle">
          ▪ MLOps & PyTorch
        </Text>
        <Text position={[-3.2, -0.70, 0.04]} fontSize={0.095} color="#333333" anchorX="left" anchorY="middle">
          ▪ Cloud Architecture
        </Text>
        <Text position={[-3.2, -0.85, 0.04]} fontSize={0.095} color="#333333" anchorX="left" anchorY="middle">
          ▪ FastAPI & Python
        </Text>

        <Text position={[0, -0.55, 0.04]} fontSize={0.095} color="#333333" anchorX="left" anchorY="middle">
          ▪ Next.js & React 19
        </Text>
        <Text position={[0, -0.70, 0.04]} fontSize={0.095} color="#333333" anchorX="left" anchorY="middle">
          ▪ TypeScript Expert
        </Text>
        <Text position={[0, -0.85, 0.04]} fontSize={0.095} color="#333333" anchorX="left" anchorY="middle">
          ▪ PostgreSQL & Redis
        </Text>

        <Text position={[3.2, -0.55, 0.04]} fontSize={0.095} color="#333333" anchorX="left" anchorY="middle">
          ▪ Docker & GCS
        </Text>
        <Text position={[3.2, -0.70, 0.04]} fontSize={0.095} color="#333333" anchorX="left" anchorY="middle">
          ▪ Security & Auth
        </Text>
        <Text position={[3.2, -0.85, 0.04]} fontSize={0.095} color="#333333" anchorX="left" anchorY="middle">
          ▪ System Design
        </Text>

        {/* Official stamp - bottom left */}
        <mesh position={[-3.8, -1.25, 0.04]} rotation={[0, 0, -0.15]}>
          <circleGeometry args={[0.35, 32]} />
          <meshStandardMaterial color="#8B0000" opacity={0.15} transparent />
        </mesh>
        <Text position={[-3.8, -1.25, 0.041]} fontSize={0.09} color="#8B0000" anchorX="center" anchorY="middle" rotation={[0, 0, -0.15]}>
          VERIFIED
        </Text>

        {/* Status badge - bottom right */}
        <mesh position={[3.8, -1.25, 0.04]}>
          <planeGeometry args={[1.4, 0.35]} />
          <meshStandardMaterial color="#006400" opacity={0.2} transparent />
        </mesh>
        <Text position={[3.8, -1.25, 0.041]} fontSize={0.095} color="#006400" anchorX="center" anchorY="middle">
          READY TO HIRE
        </Text>

        {/* Push pins at corners */}
        <mesh position={[-4.8, 2.1, 0.05]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[4.8, 2.1, 0.05]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[-4.8, -1.4, 0.05]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[4.8, -1.4, 0.05]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.5} roughness={0.3} />
        </mesh>
      </>
    )}

    {/* EDUCATION DETAIL VIEW */}
    {selectedCaseFile === 'education' && (
      <>
        {/* Back Button */}
        <group
          position={[-5.5, 2.8, 0.04]}
          onClick={(e) => {
            e.stopPropagation();
            onCaseFileClick?.(null);
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          <mesh>
            <planeGeometry args={[1.2, 0.4]} />
            <meshStandardMaterial color="#1a0d00" />
          </mesh>
          <Text position={[0, 0, 0.01]} fontSize={0.15} color="#FFD700" anchorX="center" anchorY="middle">
            ← BACK
          </Text>
        </group>

        {/* Header */}
        <mesh position={[0, 2.5, 0.03]}>
          <planeGeometry args={[10, 0.6]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[0, 2.5, 0.04]} fontSize={0.28} color="#FFFFFF" anchorX="center" anchorY="middle">
          CASE FILE #002: EDUCATION
        </Text>

        {/* Education Card 1 */}
        <mesh position={[-3.5, 0.8, 0.03]}>
          <planeGeometry args={[4.5, 2.8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        <mesh position={[-3.5, 2, 0.04]}>
          <planeGeometry args={[4.4, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[-3.5, 2, 0.05]} fontSize={0.15} color="#FFFFFF" anchorX="center" anchorY="middle">
          FORMAL EDUCATION
        </Text>
        <Text position={[-3.5, 1.5, 0.05]} fontSize={0.13} color="#1a0d00" anchorX="center" anchorY="middle">
          Computer Science
        </Text>
        <Text position={[-3.5, 1.25, 0.05]} fontSize={0.10} color="#654321" anchorX="center" anchorY="middle">
          Bachelor's Degree
        </Text>
        <Text position={[-3.5, 0.9, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          Focus: Software Engineering,
        </Text>
        <Text position={[-3.5, 0.75, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          Web Development, Data
        </Text>
        <Text position={[-3.5, 0.60, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          Structures & Algorithms
        </Text>
        <Text position={[-3.5, 0.25, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          GPA: 3.8/4.0
        </Text>

        {/* Education Card 2 */}
        <mesh position={[3.5, 0.8, 0.03]}>
          <planeGeometry args={[4.5, 2.8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        <mesh position={[3.5, 2, 0.04]}>
          <planeGeometry args={[4.4, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[3.5, 2, 0.05]} fontSize={0.15} color="#FFFFFF" anchorX="center" anchorY="middle">
          SELF-TAUGHT LEARNING
        </Text>
        <Text position={[3.5, 1.5, 0.05]} fontSize={0.13} color="#1a0d00" anchorX="center" anchorY="middle">
          Continuous Development
        </Text>
        <Text position={[3.5, 1.15, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • Advanced React & TypeScript
        </Text>
        <Text position={[3.5, 1.0, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • Three.js & WebGL Graphics
        </Text>
        <Text position={[3.5, 0.85, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • Cloud Architecture (AWS)
        </Text>
        <Text position={[3.5, 0.70, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • Microservices & DevOps
        </Text>
        <Text position={[3.5, 0.55, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={4}>
          • UI/UX Design Principles
        </Text>
        <Text position={[3.5, 0.2, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          100+ Online Courses Completed
        </Text>

        {/* Push pins */}
        <mesh position={[-3.5, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[3.5, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

      </>
    )}

    {/* SKILLS DETAIL VIEW */}
    {selectedCaseFile === 'skills' && (
      <>
        {/* Back Button */}
        <group
          position={[-5.5, 2.8, 0.04]}
          onClick={(e) => {
            e.stopPropagation();
            onCaseFileClick?.(null);
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          <mesh>
            <planeGeometry args={[1.2, 0.4]} />
            <meshStandardMaterial color="#1a0d00" />
          </mesh>
          <Text position={[0, 0, 0.01]} fontSize={0.15} color="#FFD700" anchorX="center" anchorY="middle">
            ← BACK
          </Text>
        </group>

        {/* Header */}
        <mesh position={[0, 2.5, 0.03]}>
          <planeGeometry args={[10, 0.6]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[0, 2.5, 0.04]} fontSize={0.28} color="#FFFFFF" anchorX="center" anchorY="middle">
          CASE FILE #003: SKILLS
        </Text>

        {/* Frontend Skills */}
        <mesh position={[-3.5, 0.8, 0.03]}>
          <planeGeometry args={[4.2, 2.8]} />
          <meshStandardMaterial color="#FFEB3B" />
        </mesh>
        <mesh position={[-3.5, 2, 0.04]}>
          <planeGeometry args={[4.1, 0.3]} />
          <meshStandardMaterial color="#1a0d00" />
        </mesh>
        <Text position={[-3.5, 2, 0.05]} fontSize={0.15} color="#FFD700" anchorX="center" anchorY="middle">
          FRONTEND
        </Text>
        <Text position={[-3.5, 1.55, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ React & Next.js
        </Text>
        <Text position={[-3.5, 1.35, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ TypeScript
        </Text>
        <Text position={[-3.5, 1.15, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Three.js & R3F
        </Text>
        <Text position={[-3.5, 0.95, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Tailwind CSS
        </Text>
        <Text position={[-3.5, 0.75, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Redux & Zustand
        </Text>
        <Text position={[-3.5, 0.55, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Responsive Design
        </Text>
        <Text position={[-3.5, 0.35, 0.05]} fontSize={0.10} color="#1a0d00" anchorX="center" anchorY="middle">
          ⭐ Accessibility
        </Text>

        {/* Backend Skills */}
        <mesh position={[0, 0.8, 0.03]}>
          <planeGeometry args={[4.2, 2.8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        <mesh position={[0, 2, 0.04]}>
          <planeGeometry args={[4.1, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[0, 2, 0.05]} fontSize={0.15} color="#FFFFFF" anchorX="center" anchorY="middle">
          BACKEND
        </Text>
        <Text position={[0, 1.55, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Node.js & Express
        </Text>
        <Text position={[0, 1.35, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Python & FastAPI
        </Text>
        <Text position={[0, 1.15, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ PostgreSQL & MongoDB
        </Text>
        <Text position={[0, 0.95, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ GraphQL & REST APIs
        </Text>
        <Text position={[0, 0.75, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Redis & Caching
        </Text>
        <Text position={[0, 0.55, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ WebSockets
        </Text>
        <Text position={[0, 0.35, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Microservices
        </Text>

        {/* DevOps & Tools */}
        <mesh position={[3.5, 0.8, 0.03]}>
          <planeGeometry args={[4.2, 2.8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        <mesh position={[3.5, 2, 0.04]}>
          <planeGeometry args={[4.1, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[3.5, 2, 0.05]} fontSize={0.15} color="#FFFFFF" anchorX="center" anchorY="middle">
          DEVOPS & TOOLS
        </Text>
        <Text position={[3.5, 1.55, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ AWS & Cloud
        </Text>
        <Text position={[3.5, 1.35, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Docker & K8s
        </Text>
        <Text position={[3.5, 1.15, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ CI/CD Pipelines
        </Text>
        <Text position={[3.5, 0.95, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Git & GitHub
        </Text>
        <Text position={[3.5, 0.75, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Linux & Bash
        </Text>
        <Text position={[3.5, 0.55, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Nginx & Load Bal.
        </Text>
        <Text position={[3.5, 0.35, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle">
          ⭐ Monitoring Tools
        </Text>

        {/* Push pins */}
        <mesh position={[-3.5, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[3.5, 2.3, 0.05]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

      </>
    )}

    {/* PROJECTS DETAIL VIEW */}
    {selectedCaseFile === 'projects' && (
      <>
        {/* Back Button - Top Left */}
        <group
          position={[-5.5, 2.8, 0.04]}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject(null); // Reset project detail if any
            onCaseFileClick?.(null); // Reset selection to go back to case files
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          <mesh>
            <planeGeometry args={[1.2, 0.4]} />
            <meshStandardMaterial color="#1a0d00" />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.15}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
          >
            ← BACK
          </Text>
        </group>

        {/* Header - Hidden when project selected */}
        {!selectedProject && (
        <>
        <mesh position={[0, 2.5, 0.03]}>
          <planeGeometry args={[10, 0.6]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text
          position={[0, 2.5, 0.04]}
          fontSize={0.28}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          CASE FILE #004: PROJECTS
        </Text>
        </>
        )}

        {/* Show project list or project detail */}
        {!selectedProject && (
        <>
        {/* TOP ROW - ReFocused Center (Larger), RespawnRoom Left, 3D Resume Right */}

        {/* Project 1 - ReFocused (Top Center - Larger) */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject('refocused');
          }}
          onPointerEnter={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            document.body.style.cursor = 'auto';
          }}
        >
        {/* Folder body */}
        <mesh position={[0, 0.3, 0.03]}>
          <boxGeometry args={[3.8, 2.4, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        {/* Folder tab */}
        <mesh position={[0, 1.5, 0.045]}>
          <boxGeometry args={[3.8, 0.22, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        {/* File identifier label */}
        <mesh position={[-1.675, 1.5, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[-1.675, 1.5, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #001
        </Text>
        {/* Project title */}
        <Text position={[0, 1.05, 0.05]} fontSize={0.22} color="#1a0d00" anchorX="center" anchorY="middle">
          ReFocused
        </Text>
        {/* Project description */}
        <Text position={[0, 0.65, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle" maxWidth={3.5}>
          Advanced productivity platform
        </Text>
        <Text position={[0, 0.48, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle" maxWidth={3.5}>
          with AI-powered focus sessions
        </Text>
        <Text position={[0, 0.31, 0.05]} fontSize={0.10} color="#333333" anchorX="center" anchorY="middle" maxWidth={3.5}>
          and intelligent task management
        </Text>
        {/* Tech stack */}
        <Text position={[0, -0.05, 0.05]} fontSize={0.09} color="#654321" anchorX="center" anchorY="middle">
          React • TypeScript • Node.js
        </Text>
        <Text position={[0, -0.22, 0.05]} fontSize={0.09} color="#654321" anchorX="center" anchorY="middle">
          PostgreSQL • Redis • OpenAI
        </Text>
        {/* Push pin */}
        <mesh position={[0, 1.5, 0.07]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>
        </group>

        {/* Project 2 - RespawnRoom (Top Left) */}
        <mesh position={[-4.5, 0.3, 0.03]}>
          <boxGeometry args={[3.0, 2.0, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        {/* Folder tab */}
        <mesh position={[-4.5, 1.3, 0.045]}>
          <boxGeometry args={[3.0, 0.2, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        {/* File identifier label */}
        <mesh position={[-5.775, 1.3, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[-5.775, 1.3, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #002
        </Text>
        {/* Project title */}
        <Text position={[-4.5, 0.9, 0.05]} fontSize={0.18} color="#1a0d00" anchorX="center" anchorY="middle">
          RespawnRoom
        </Text>
        {/* Project description */}
        <Text position={[-4.5, 0.55, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          Gaming community
        </Text>
        <Text position={[-4.5, 0.40, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          platform for events
        </Text>
        <Text position={[-4.5, 0.25, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          and tournaments
        </Text>
        {/* Tech stack */}
        <Text position={[-4.5, -0.10, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          Next.js • MongoDB
        </Text>
        <Text position={[-4.5, -0.25, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          WebSockets • AWS
        </Text>
        {/* Push pin */}
        <mesh position={[-4.5, 1.3, 0.07]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

        {/* Project 3 - 3D Resume (Top Right) */}
        <mesh position={[4.5, 0.3, 0.03]}>
          <boxGeometry args={[3.0, 2.0, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        {/* Folder tab */}
        <mesh position={[4.5, 1.3, 0.045]}>
          <boxGeometry args={[3.0, 0.2, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        {/* File identifier label */}
        <mesh position={[3.225, 1.3, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[3.225, 1.3, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #003
        </Text>
        {/* Project title */}
        <Text position={[4.5, 0.9, 0.05]} fontSize={0.18} color="#1a0d00" anchorX="center" anchorY="middle">
          3D Resume
        </Text>
        {/* Project description */}
        <Text position={[4.5, 0.55, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          Interactive detective
        </Text>
        <Text position={[4.5, 0.40, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          themed 3D portfolio
        </Text>
        <Text position={[4.5, 0.25, 0.05]} fontSize={0.09} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.7}>
          experience
        </Text>
        {/* Tech stack */}
        <Text position={[4.5, -0.10, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          React Three Fiber
        </Text>
        <Text position={[4.5, -0.25, 0.05]} fontSize={0.08} color="#654321" anchorX="center" anchorY="middle">
          Three.js • TypeScript
        </Text>
        {/* Push pin */}
        <mesh position={[4.5, 1.3, 0.07]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

        {/* BOTTOM ROW - 2 Smaller Boxes (moved down) */}

        {/* Project 4 - Side Projects (Bottom Left - Smaller) */}
        <mesh position={[-2.5, -2.1, 0.03]}>
          <boxGeometry args={[2.5, 1.6, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        {/* Folder tab */}
        <mesh position={[-2.5, -1.3, 0.045]}>
          <boxGeometry args={[2.5, 0.18, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        {/* File identifier label */}
        <mesh position={[-3.525, -1.3, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[-3.525, -1.3, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #004
        </Text>
        {/* Project title */}
        <Text position={[-2.5, -1.65, 0.05]} fontSize={0.16} color="#1a0d00" anchorX="center" anchorY="middle">
          Side Projects
        </Text>
        {/* Project description */}
        <Text position={[-2.5, -1.90, 0.05]} fontSize={0.08} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.3}>
          Various experimental
        </Text>
        <Text position={[-2.5, -2.03, 0.05]} fontSize={0.08} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.3}>
          projects and open-
        </Text>
        <Text position={[-2.5, -2.16, 0.05]} fontSize={0.08} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.3}>
          source contributions
        </Text>
        {/* Tech stack */}
        <Text position={[-2.5, -2.40, 0.05]} fontSize={0.075} color="#654321" anchorX="center" anchorY="middle">
          Multiple Technologies
        </Text>
        <Text position={[-2.5, -2.53, 0.05]} fontSize={0.075} color="#654321" anchorX="center" anchorY="middle">
          Experimental • Learning
        </Text>
        {/* Push pin */}
        <mesh position={[-2.5, -1.3, 0.07]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

        {/* Project 5 - AWS Cloud (Bottom Right - Smaller) */}
        <mesh position={[2.5, -2.1, 0.03]}>
          <boxGeometry args={[2.5, 1.6, 0.03]} />
          <meshStandardMaterial color="#C09858" roughness={0.9} />
        </mesh>
        {/* Folder tab */}
        <mesh position={[2.5, -1.3, 0.045]}>
          <boxGeometry args={[2.5, 0.18, 0.025]} />
          <meshStandardMaterial color="#B58F4F" roughness={0.9} />
        </mesh>
        {/* File identifier label */}
        <mesh position={[1.475, -1.3, 0.06]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <Text position={[1.475, -1.3, 0.07]} fontSize={0.13} color="#FFFFFF" anchorX="center" anchorY="middle">
          #005
        </Text>
        {/* Project title */}
        <Text position={[2.5, -1.65, 0.05]} fontSize={0.16} color="#1a0d00" anchorX="center" anchorY="middle">
          AWS Cloud
        </Text>
        {/* Project description */}
        <Text position={[2.5, -1.90, 0.05]} fontSize={0.08} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.3}>
          Cloud infrastructure
        </Text>
        <Text position={[2.5, -2.03, 0.05]} fontSize={0.08} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.3}>
          design and deployment
        </Text>
        <Text position={[2.5, -2.16, 0.05]} fontSize={0.08} color="#333333" anchorX="center" anchorY="middle" maxWidth={2.3}>
          expertise
        </Text>
        {/* Tech stack */}
        <Text position={[2.5, -2.40, 0.05]} fontSize={0.075} color="#654321" anchorX="center" anchorY="middle">
          EC2 • RDS • S3 • Lambda
        </Text>
        <Text position={[2.5, -2.53, 0.05]} fontSize={0.075} color="#654321" anchorX="center" anchorY="middle">
          CloudFront • Auto Scaling
        </Text>
        {/* Push pin */}
        <mesh position={[2.5, -1.3, 0.07]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
        </mesh>

        </>
        )}

        {/* ReFocused Detective Board Detail View - Three Paper Documents */}
        {selectedProject === 'refocused' && (
        <>
        {/* Header Background Panel */}
        <mesh position={[0, 1.85, 0.03]}>
          <planeGeometry args={[10.5, 1.8]} />
          <meshStandardMaterial color="#F5F5DC" roughness={0.95} />
        </mesh>

        {/* Decorative border */}
        <Line points={[[-5.2, 2.7, 0.031], [5.2, 2.7, 0.031], [5.2, 0.95, 0.031], [-5.2, 0.95, 0.031], [-5.2, 2.7, 0.031]]} color="#B8860B" lineWidth={3} />
        <Line points={[[-5.1, 2.6, 0.031], [5.1, 2.6, 0.031], [5.1, 1.05, 0.031], [-5.1, 1.05, 0.031], [-5.1, 2.6, 0.031]]} color="#1C1C1C" lineWidth={1} />

        {/* Project Title - Large and Prominent */}
        <Text position={[0, 2.30, 0.032]} fontSize={0.32} color="#1C1C1C" anchorX="center" anchorY="middle" letterSpacing={0.08}>
          ReFocused
        </Text>

        {/* Subtitle */}
        <Text position={[0, 2.08, 0.032]} fontSize={0.13} color="#2F2F2F" anchorX="center" anchorY="middle" letterSpacing={0.02}>
          An End-to-End AI Productivity Platform
        </Text>

        {/* Decorative divider */}
        <Line points={[[-4.2, 1.92, 0.032], [4.2, 1.92, 0.032]]} color="#B8860B" lineWidth={1} />

        {/* Professional Summary */}
        <Text position={[0, 1.72, 0.032]} fontSize={0.092} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={9.5}>
          A full-stack application with a custom 1.2B parameter LLM, a high-performance
        </Text>
        <Text position={[0, 1.58, 0.032]} fontSize={0.092} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={9.5}>
          FastAPI backend, and a modern Next.js frontend.
        </Text>

        {/* Bottom divider */}
        <Line points={[[-4.2, 1.40, 0.032], [4.2, 1.40, 0.032]]} color="#B8860B" lineWidth={1} />

        {/* Clickable link with hold animation */}
        <LinkWithProgress position={[0, 1.15, 0.033]} />


        {/* PAPER 1 - Frontend Repository (Left) */}
        <group
          position={
            !zoomedPaper ? [-4.2, -1.2, 0.03] :
            zoomedPaper === 'frontend' ? [0, -0.3, 0.06] :
            zoomedPaper === 'backend' ? [-4.0, -0.3, 0.04] :
            [0, 0, 0]  // Hidden when AI is zoomed (off screen)
          }
          scale={
            !zoomedPaper ? 1 :
            zoomedPaper === 'frontend' ? 1.4 :
            0.5  // Smaller when not focused
          }
          onClick={(e) => {
            e.stopPropagation();
            setZoomedPaper('frontend');
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
          visible={!zoomedPaper || zoomedPaper === 'frontend' || zoomedPaper === 'backend'}
        >
          {/* Paper shadow for depth */}
          <mesh position={[0.05, -0.05, -0.001]}>
            <planeGeometry args={[3.6, 3.2]} />
            <meshStandardMaterial color="#000000" opacity={0.15} transparent />
          </mesh>

          {/* Paper background */}
          <mesh>
            <planeGeometry args={[3.5, 3.2]} />
            <meshStandardMaterial color="#FAF0E6" roughness={0.95} />
          </mesh>

          {/* Paper border */}
          <Line points={[[-1.7, 1.55, 0.001], [1.7, 1.55, 0.001], [1.7, -1.55, 0.001], [-1.7, -1.55, 0.001], [-1.7, 1.55, 0.001]]} color="#B8860B" lineWidth={2} />

          {/* Header */}
          <mesh position={[0, 1.35, 0.001]}>
            <planeGeometry args={[3.4, 0.40]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.7} />
          </mesh>
          <Text position={[0, 1.35, 0.002]} fontSize={0.20} color="#FAF0E6" anchorX="center" anchorY="middle" letterSpacing={0.04}>
            FRONTEND
          </Text>

          {/* Decorative underline */}
          <Line points={[[-1.0, 1.17, 0.002], [1.0, 1.17, 0.002]]} color="#B8860B" lineWidth={2} />

          {/* Tech stack */}
          <Text position={[0, 0.80, 0.002]} fontSize={0.13} color="#1C1C1C" anchorX="center" anchorY="middle" letterSpacing={0.02}>
            Next.js 15 • React 19 • TypeScript
          </Text>

          {/* Content section */}
          <Text position={[0, 0.55, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Developed responsive web app using
          </Text>
          <Text position={[0, 0.40, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            Next.js 15, React 19, strict TypeScript
          </Text>
          <Text position={[0, 0.20, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Designed scalable state with TanStack
          </Text>
          <Text position={[0, 0.05, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            Query + React Context, no prop-drilling
          </Text>
          <Text position={[0, -0.15, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Engineered secure auth with silent token
          </Text>
          <Text position={[0, -0.30, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            refresh, dual-strategy (Cookies/JWT)
          </Text>
          <Text position={[0, -0.50, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Built 67+ reusable components: Quill.js
          </Text>
          <Text position={[0, -0.65, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            editor w/ encryption, SVG meditation tool
          </Text>
          <Text position={[0, -0.85, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Implemented multi-layer caching with
          </Text>
          <Text position={[0, -1.00, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            React Query + localStorage for sub-second UI
          </Text>

          {/* GitHub Link */}
          <group
            position={[0, -1.35, 0.002]}
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://github.com/Mahdi-196/ReFocused-frontend', '_blank');
            }}
            onPointerEnter={() => document.body.style.cursor = 'pointer'}
            onPointerLeave={() => document.body.style.cursor = 'auto'}
          >
            <mesh>
              <planeGeometry args={[2.8, 0.20]} />
              <meshStandardMaterial color="#B8860B" opacity={0.2} transparent />
            </mesh>
            <Text fontSize={0.085} color="#1C1C1C" anchorX="center" anchorY="middle">
              🔗 View on GitHub
            </Text>
          </group>

          {/* Push pins */}
          <mesh position={[-1.5, 1.5, 0.01]}>
            <sphereGeometry args={[0.10, 16, 16]} />
            <meshStandardMaterial color="#CD853F" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[1.5, 1.5, 0.01]}>
            <sphereGeometry args={[0.10, 16, 16]} />
            <meshStandardMaterial color="#CD853F" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>

        {/* PAPER 2 - Backend Repository (Center) */}
        <group
          position={
            !zoomedPaper ? [0, -1.2, 0.04] :
            zoomedPaper === 'frontend' ? [4.0, -0.3, 0.04] :
            zoomedPaper === 'backend' ? [0, -0.3, 0.06] :
            [-4.0, -0.3, 0.04]  // Left side when AI is zoomed
          }
          scale={
            !zoomedPaper ? 1 :
            zoomedPaper === 'backend' ? 1.4 :
            0.5  // Smaller when not focused
          }
          onClick={(e) => {
            e.stopPropagation();
            setZoomedPaper('backend');
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          {/* Paper shadow for depth */}
          <mesh position={[0.05, -0.05, -0.001]}>
            <planeGeometry args={[3.6, 3.2]} />
            <meshStandardMaterial color="#000000" opacity={0.15} transparent />
          </mesh>

          {/* Paper background */}
          <mesh>
            <planeGeometry args={[3.5, 3.2]} />
            <meshStandardMaterial color="#FAF0E6" roughness={0.95} />
          </mesh>

          {/* Paper border */}
          <Line points={[[-1.7, 1.55, 0.001], [1.7, 1.55, 0.001], [1.7, -1.55, 0.001], [-1.7, -1.55, 0.001], [-1.7, 1.55, 0.001]]} color="#B8860B" lineWidth={2} />

          {/* Header */}
          <mesh position={[0, 1.35, 0.001]}>
            <planeGeometry args={[3.4, 0.40]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.7} />
          </mesh>
          <Text position={[0, 1.35, 0.002]} fontSize={0.20} color="#FAF0E6" anchorX="center" anchorY="middle" letterSpacing={0.04}>
            BACKEND API
          </Text>

          {/* Decorative underline */}
          <Line points={[[-1.2, 1.17, 0.002], [1.2, 1.17, 0.002]]} color="#B8860B" lineWidth={2} />

          {/* Tech stack */}
          <Text position={[0, 0.80, 0.002]} fontSize={0.13} color="#1C1C1C" anchorX="center" anchorY="middle" letterSpacing={0.02}>
            FastAPI • Python • PostgreSQL • Redis
          </Text>

          {/* Content section */}
          <Text position={[0, 0.55, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Developed async-first API with FastAPI
          </Text>
          <Text position={[0, 0.40, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            + asyncpg: 140+ endpoints, less than 50ms avg
          </Text>
          <Text position={[0, 0.20, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Implemented multi-layer security: HTTP-Only
          </Text>
          <Text position={[0, 0.05, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            Cookies, Google OAuth 2.0, CSRF protection
          </Text>
          <Text position={[0, -0.15, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Designed observability stack: OpenTelemetry,
          </Text>
          <Text position={[0, -0.30, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            Prometheus, Sentry to monitor app health
          </Text>
          <Text position={[0, -0.50, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Deployed with multi-stage Docker build
          </Text>
          <Text position={[0, -0.65, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            for secure, non-root production containers
          </Text>
          <Text position={[0, -0.85, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Utilized async Redis cache to optimize
          </Text>
          <Text position={[0, -1.00, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            PostgreSQL: queries, sessions, rate limits
          </Text>

          {/* GitHub Link */}
          <group
            position={[0, -1.35, 0.002]}
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://github.com/Mahdi-196/ReFocused-backend', '_blank');
            }}
            onPointerEnter={() => document.body.style.cursor = 'pointer'}
            onPointerLeave={() => document.body.style.cursor = 'auto'}
          >
            <mesh>
              <planeGeometry args={[2.8, 0.20]} />
              <meshStandardMaterial color="#B8860B" opacity={0.2} transparent />
            </mesh>
            <Text fontSize={0.085} color="#1C1C1C" anchorX="center" anchorY="middle">
              🔗 View on GitHub
            </Text>
          </group>

          {/* Push pins */}
          <mesh position={[-1.5, 1.5, 0.01]}>
            <sphereGeometry args={[0.10, 16, 16]} />
            <meshStandardMaterial color="#CD853F" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[1.5, 1.5, 0.01]}>
            <sphereGeometry args={[0.10, 16, 16]} />
            <meshStandardMaterial color="#CD853F" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>

        {/* PAPER 3 - AI Model Repository (Right) */}
        <group
          position={
            !zoomedPaper ? [4.2, -1.2, 0.03] :
            zoomedPaper === 'ai' ? [0, -0.3, 0.06] :
            zoomedPaper === 'backend' ? [4.0, -0.3, 0.04] :
            [0, 0, 0]  // Hidden when frontend is zoomed
          }
          scale={
            !zoomedPaper ? 1 :
            zoomedPaper === 'ai' ? 1.4 :
            0.5  // Smaller when not focused
          }
          onClick={(e) => {
            e.stopPropagation();
            setZoomedPaper('ai');
          }}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
          visible={!zoomedPaper || zoomedPaper === 'ai' || zoomedPaper === 'backend'}
        >
          {/* Paper shadow for depth */}
          <mesh position={[0.05, -0.05, -0.001]}>
            <planeGeometry args={[3.6, 3.2]} />
            <meshStandardMaterial color="#000000" opacity={0.15} transparent />
          </mesh>

          {/* Paper background */}
          <mesh>
            <planeGeometry args={[3.5, 3.2]} />
            <meshStandardMaterial color="#FAF0E6" roughness={0.95} />
          </mesh>

          {/* Paper border */}
          <Line points={[[-1.7, 1.55, 0.001], [1.7, 1.55, 0.001], [1.7, -1.55, 0.001], [-1.7, -1.55, 0.001], [-1.7, 1.55, 0.001]]} color="#B8860B" lineWidth={2} />

          {/* Header */}
          <mesh position={[0, 1.35, 0.001]}>
            <planeGeometry args={[3.4, 0.40]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.7} />
          </mesh>
          <Text position={[0, 1.35, 0.002]} fontSize={0.20} color="#FAF0E6" anchorX="center" anchorY="middle" letterSpacing={0.04}>
            AI MODEL
          </Text>

          {/* Decorative underline */}
          <Line points={[[-0.9, 1.17, 0.002], [0.9, 1.17, 0.002]]} color="#B8860B" lineWidth={2} />

          {/* Tech stack */}
          <Text position={[0, 0.80, 0.002]} fontSize={0.13} color="#1C1C1C" anchorX="center" anchorY="middle" letterSpacing={0.02}>
            1.2B Params • GPT-NeoX • PyTorch
          </Text>

          {/* Content section */}
          <Text position={[0, 0.55, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Built and trained a 1.2B param LLM
          </Text>
          <Text position={[0, 0.40, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            from scratch to power AI-driven features
          </Text>
          <Text position={[0, 0.20, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Built an end-to-end MLOps pipeline for
          </Text>
          <Text position={[0, 0.05, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            data collection, cleaning, and tokenization
          </Text>
          <Text position={[0, -0.15, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Implemented fault-tolerant PyTorch training:
          </Text>
          <Text position={[0, -0.30, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            mixed-precision, non-blocking GCS uploads
          </Text>
          <Text position={[0, -0.50, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Designed LoRA fine-tuning workflows to
          </Text>
          <Text position={[0, -0.65, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            specialize for chat and instruction-following
          </Text>
          <Text position={[0, -0.85, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            • Engineered data pipeline in Python to parse,
          </Text>
          <Text position={[0, -1.00, 0.002]} fontSize={0.095} color="#2F2F2F" anchorX="center" anchorY="middle" maxWidth={3.2}>
            clean, shard datasets into .npz for training
          </Text>

          {/* GitHub Link */}
          <group
            position={[0, -1.35, 0.002]}
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://github.com/Mahdi-196/ReFocused-AI', '_blank');
            }}
            onPointerEnter={() => document.body.style.cursor = 'pointer'}
            onPointerLeave={() => document.body.style.cursor = 'auto'}
          >
            <mesh>
              <planeGeometry args={[2.8, 0.20]} />
              <meshStandardMaterial color="#B8860B" opacity={0.2} transparent />
            </mesh>
            <Text fontSize={0.085} color="#1C1C1C" anchorX="center" anchorY="middle">
              🔗 View on GitHub
            </Text>
          </group>

          {/* Push pins */}
          <mesh position={[-1.5, 1.5, 0.01]}>
            <sphereGeometry args={[0.10, 16, 16]} />
            <meshStandardMaterial color="#CD853F" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[1.5, 1.5, 0.01]}>
            <sphereGeometry args={[0.10, 16, 16]} />
            <meshStandardMaterial color="#CD853F" metalness={0.5} roughness={0.3} />
          </mesh>
        </group>

        {/* Navigation Arrows - Only show when zoomed */}
        {zoomedPaper && (
          <>
            {/* Left Arrow - Navigate to previous paper */}
            {(zoomedPaper === 'backend' || zoomedPaper === 'ai') && (
              <group
                position={[-5.5, -0.3, 0.07]}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedPaper(zoomedPaper === 'backend' ? 'frontend' : 'backend');
                }}
                onPointerEnter={() => document.body.style.cursor = 'pointer'}
                onPointerLeave={() => document.body.style.cursor = 'auto'}
              >
                <mesh>
                  <planeGeometry args={[0.7, 0.7]} />
                  <meshStandardMaterial color="#B8860B" opacity={0.8} transparent />
                </mesh>
                <Text position={[0, 0, 0.001]} fontSize={0.45} color="#1C1C1C" anchorX="center" anchorY="middle">
                  ←
                </Text>
              </group>
            )}

            {/* Right Arrow - Navigate to next paper */}
            {(zoomedPaper === 'frontend' || zoomedPaper === 'backend') && (
              <group
                position={[5.5, -0.3, 0.07]}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedPaper(zoomedPaper === 'frontend' ? 'backend' : 'ai');
                }}
                onPointerEnter={() => document.body.style.cursor = 'pointer'}
                onPointerLeave={() => document.body.style.cursor = 'auto'}
              >
                <mesh>
                  <planeGeometry args={[0.7, 0.7]} />
                  <meshStandardMaterial color="#B8860B" opacity={0.8} transparent />
                </mesh>
                <Text position={[0, 0, 0.001]} fontSize={0.45} color="#1C1C1C" anchorX="center" anchorY="middle">
                  →
                </Text>
              </group>
            )}

            {/* Close/Exit button - Bottom center */}
            <group
              position={[0, -2.8, 0.07]}
              onClick={(e) => {
                e.stopPropagation();
                setZoomedPaper(null);
              }}
              onPointerEnter={() => document.body.style.cursor = 'pointer'}
              onPointerLeave={() => document.body.style.cursor = 'auto'}
            >
              <mesh>
                <planeGeometry args={[1.5, 0.35]} />
                <meshStandardMaterial color="#8B0000" opacity={0.9} transparent />
              </mesh>
              <Text position={[0, 0, 0.001]} fontSize={0.14} color="#FAF0E6" anchorX="center" anchorY="middle">
                ✕ CLOSE
              </Text>
            </group>
          </>
        )}

        </>
        )}
      </>
    )}

      </group>
    )}

    </>
  );
};
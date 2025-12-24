import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { CaseFileCard } from './CaseFileCard';
import { PushPin } from '../shared/PushPin';
import { BOARD_CONFIG, COLORS, CASE_FILE_POSITIONS, SHARED_MATERIALS } from '../constants';
import type { CaseFile, ProjectDetail } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Board Preview component - displays the initial board view with 4 case files
 * Shows when no detail view is selected
 */
interface BoardPreviewProps {
  previewGroupRef: React.RefObject<THREE.Group>;
  showContent?: boolean;
  selectedCaseFile?: CaseFile;
  selectedProject: ProjectDetail;
  onCaseFileClick?: (caseFile: CaseFile) => void;
  onBoardClick?: () => void;
}

export const BoardPreview = ({
  previewGroupRef,
  showContent,
  selectedCaseFile,
  selectedProject,
  onCaseFileClick,
  onBoardClick
}: BoardPreviewProps) => {
  const textScale = getTextScale(); // 1.5x on mobile, 1x on desktop

  const handleClick = (e: any) => {
    e.stopPropagation();
    // Only zoom into board when it's closed (not already showing content)
    if (!showContent) {
      onBoardClick?.();
    }
  };

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    // Only zoom into board when it's closed (not already showing content)
    if (!showContent) {
      onBoardClick?.();
    }
  };

  return (
    <group
      position={BOARD_CONFIG.position}
      rotation={BOARD_CONFIG.rotation}
    >
      {/* Invisible click blocker - prevents clicks on board area from closing board */}
      <mesh
        position={[0, 0, -0.5]}
        onClick={(e) => e.stopPropagation()}
      >
        <planeGeometry args={[BOARD_CONFIG.size.width + 1, BOARD_CONFIG.size.height + 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Main Wooden Board Background */}
      <mesh
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerEnter={() => {
          // Only show pointer cursor when board is closed and can be clicked to zoom
          if (!showContent) {
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'crosshair';
        }}
      >
        <planeGeometry args={[BOARD_CONFIG.size.width, BOARD_CONFIG.size.height]} />
        <primitive object={SHARED_MATERIALS.lightWood} attach="material" />
      </mesh>

      {/* Wooden Borders - Dark brown wood */}
      {/* Top border */}
      <mesh
        position={[0, 3.25, 0.02]}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[13, 0.25, 0.08]} />
        <primitive object={SHARED_MATERIALS.darkWood} attach="material" />
      </mesh>

      {/* Bottom border */}
      <mesh
        position={[0, -3.25, 0.02]}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[13, 0.25, 0.08]} />
        <primitive object={SHARED_MATERIALS.darkWood} attach="material" />
      </mesh>

      {/* Left border */}
      <mesh
        position={[-6.25, 0, 0.02]}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <primitive object={SHARED_MATERIALS.darkWood} attach="material" />
      </mesh>

      {/* Right border */}
      <mesh
        position={[6.25, 0, 0.02]}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[0.25, 6.5, 0.08]} />
        <primitive object={SHARED_MATERIALS.darkWood} attach="material" />
      </mesh>

      {/* Preview content group - fades out when detail shown */}
      <group ref={previewGroupRef}>
        {/* Header Bar */}
        <mesh position={[0, 2.8, 0.03]}>
          <planeGeometry args={[11, 0.7]} />
          <primitive object={SHARED_MATERIALS.darkBrown} attach="material" />
        </mesh>
        <Text position={[0, 2.8, 0.04]} fontSize={0.32 * textScale} color={COLORS.gold} anchorX="center" anchorY="middle">
          CASE FILE: MAHDI GHALEB
        </Text>

        {/* Case File 1 - ABOUT ME (Left) */}
        <CaseFileCard
          position={[-4, 0, 0.03]}
          title="ABOUT ME"
          fileNumber="#001"
          items={['Full-Stack Dev', '3D Enthusiast', 'Problem Solver']}
          showContent={showContent}
          selectedCaseFile={selectedCaseFile}
          onClick={() => onCaseFileClick?.('about')}
        />

        {/* Case File 2 - PROJECTS (Center) */}
        <CaseFileCard
          position={[0, 0, 0.03]}
          title="PROJECTS"
          fileNumber="#002"
          items={['MedeSense', 'RespawnRoom', 'ReFocused', 'VibeLink & More']}
          showContent={showContent}
          selectedCaseFile={selectedCaseFile}
          onClick={() => onCaseFileClick?.('projects')}
        />

        {/* Case File 3 - SKILLS & EDUCATION (Right) */}
        <CaseFileCard
          position={[4, 0, 0.03]}
          title="SKILLS & EDUCATION"
          fileNumber="#003"
          items={['Computer Science', 'React • TypeScript • Three.js', 'Node.js • AWS • Docker']}
          showContent={showContent}
          selectedCaseFile={selectedCaseFile}
          onClick={() => onCaseFileClick?.('skillseducation')}
        />

      </group>
    </group>
  );
};

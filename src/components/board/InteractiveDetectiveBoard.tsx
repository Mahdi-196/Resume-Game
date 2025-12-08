import { useState } from 'react';
import { BoardPreview } from './preview/BoardPreview';
import { AboutDetail } from './details/AboutDetail';
import { SkillsEducationDetail } from './details/SkillsEducationDetail';
import { ProjectsDetail } from './details/ProjectsDetail';
import { useFadeAnimation } from './hooks/useFadeAnimation';
import { BOARD_CONFIG } from './constants';
import type { InteractiveDetectiveBoardProps, ProjectDetail, ZoomedPaper, RespawnPaper, SideProject } from './types';

/**
 * Main Interactive Detective Board component
 * Manages state and renders the appropriate view based on user selection
 */
export const InteractiveDetectiveBoard = ({
  onInteraction,
  onBoardClick,
  onCaseFileClick,
  showContent,
  selectedCaseFile,
  overlayVisible,
  onContentClose
}: InteractiveDetectiveBoardProps) => {
  // Track which project is selected (for nested navigation)
  const [selectedProject, setSelectedProject] = useState<ProjectDetail>(null);

  // Track which paper is zoomed for ReFocused (frontend, backend, or ai)
  const [zoomedPaper, setZoomedPaper] = useState<ZoomedPaper>(null);

  // Track which paper is zoomed for RespawnRoom (frontend or backend)
  const [respawnPaper, setRespawnPaper] = useState<RespawnPaper>(null);

  // Track which side project is selected
  const [selectedSideProject, setSelectedSideProject] = useState<SideProject>(null);

  // Use fade animation hook for smooth transitions
  const { previewGroupRef, detailGroupRef } = useFadeAnimation(selectedCaseFile);

  return (
    <>
      {/* Board Preview - shows when no detail view is selected */}
      <BoardPreview
        previewGroupRef={previewGroupRef}
        showContent={showContent}
        selectedCaseFile={selectedCaseFile}
        selectedProject={selectedProject}
        onCaseFileClick={onCaseFileClick}
        onBoardClick={onBoardClick}
      />

      {/* Detail Views - fade in when a case file is selected */}
      {selectedCaseFile && (
        <group
          ref={detailGroupRef}
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

          {/* About Me Detail */}
          {selectedCaseFile === 'about' && <AboutDetail onBack={() => onCaseFileClick?.(null)} />}

          {/* Skills & Education Detail */}
          {selectedCaseFile === 'skillseducation' && <SkillsEducationDetail onBack={() => onCaseFileClick?.(null)} />}

          {/* Projects Detail (with nested navigation) */}
          {selectedCaseFile === 'projects' && (
            <ProjectsDetail
              onBack={() => onCaseFileClick?.(null)}
              selectedProject={selectedProject}
              onProjectSelect={setSelectedProject}
              zoomedPaper={zoomedPaper}
              onPaperZoom={setZoomedPaper}
              respawnPaper={respawnPaper}
              onRespawnPaperZoom={setRespawnPaper}
              selectedSideProject={selectedSideProject}
              onSideProjectSelect={setSelectedSideProject}
            />
          )}
        </group>
      )}
    </>
  );
};

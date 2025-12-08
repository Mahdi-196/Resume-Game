import { useEffect } from 'react';
import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { ProjectsList } from '../projects/ProjectsList';
import { ReFocusedProject } from '../projects/ReFocusedProject';
import { RespawnRoomProject } from '../projects/RespawnRoomProject';
import { SideProjectsWrapper } from '../projects/SideProjectsWrapper';
import { COLORS } from '../constants';
import type { ProjectsDetailProps } from '../types';

/**
 * Projects detail view wrapper
 * Shows projects list, ReFocused detail, RespawnRoom detail, or Side Projects grid
 */
export const ProjectsDetail = ({
  onBack,
  selectedProject,
  onProjectSelect,
  zoomedPaper,
  onPaperZoom,
  respawnPaper,
  onRespawnPaperZoom,
  selectedSideProject,
  onSideProjectSelect
}: ProjectsDetailProps) => {
  // Reset zoomed papers when navigating away from projects
  useEffect(() => {
    if (selectedProject !== 'refocused') {
      onPaperZoom(null);
    }
    if (selectedProject !== 'respawnroom') {
      onRespawnPaperZoom(null);
    }
  }, [selectedProject, onPaperZoom, onRespawnPaperZoom]);

  return (
    <>
      {/* Back Button - Top Left - Hide when viewing side projects (they have their own) */}
      {selectedProject !== 'sideprojects' && (
        <BackButton
          onClick={() => {
            if (selectedProject) {
              // If viewing a project, go back to projects list
              onProjectSelect(null);
              onSideProjectSelect(null);
            } else {
              // If viewing projects list, go back to case files
              onBack();
            }
          }}
        />
      )}

      {/* Header - Hidden when project selected */}
      {!selectedProject && (
        <>
          <mesh position={[0, 2.5, 0.03]}>
            <planeGeometry args={[10, 0.6]} />
            <meshStandardMaterial color={COLORS.darkRed} />
          </mesh>
          <Text position={[0, 2.5, 0.04]} fontSize={0.28} color="#FFFFFF" anchorX="center" anchorY="middle">
            CASE FILE #002: PROJECTS
          </Text>
        </>
      )}

      {/* Show project list or project detail */}
      {!selectedProject ? (
        <ProjectsList onProjectSelect={onProjectSelect} />
      ) : selectedProject === 'refocused' ? (
        <ReFocusedProject zoomedPaper={zoomedPaper} onPaperZoom={onPaperZoom} />
      ) : selectedProject === 'respawnroom' ? (
        <RespawnRoomProject zoomedPaper={respawnPaper} onPaperZoom={onRespawnPaperZoom} />
      ) : selectedProject === 'sideprojects' ? (
        <SideProjectsWrapper
          selectedSideProject={selectedSideProject}
          onSideProjectSelect={onSideProjectSelect}
          onBack={() => onProjectSelect(null)}
        />
      ) : null}
    </>
  );
};

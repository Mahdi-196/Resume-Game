import { useEffect } from 'react';
import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { ProjectsList } from '../projects/ProjectsList';
import { ReFocusedProject } from '../projects/ReFocusedProject';
import { ResiliNetProject } from '../projects/ResiliNetProject';
import { MedeSenseProject } from '../projects/MedeSenseProject';
import { RespawnRoomProject } from '../projects/RespawnRoomProject';
import { FilmNoirResumeProject } from '../projects/FilmNoirResumeProject';
import { SideProjectsWrapper } from '../projects/SideProjectsWrapper';
import { COLORS, SHARED_MATERIALS } from '../constants';
import type { ProjectsDetailProps } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Projects detail view wrapper
 * Shows projects list or individual project details:
 * - ReFocused, ResiliNet, MedeSense, RespawnRoom, or Side Projects grid
 */
export const ProjectsDetail = ({
  onBack,
  selectedProject,
  onProjectSelect,
  zoomedPaper,
  onPaperZoom,
  respawnPaper,
  onRespawnPaperZoom,
  medesensePaper,
  onMedesensePaperZoom,
  resilinetPaper,
  onResilinetPaperZoom,
  filmnoirPaper,
  onFilmnoirPaperZoom,
  selectedSideProject,
  onSideProjectSelect
}: ProjectsDetailProps) => {
  const textScale = getTextScale();

  // Reset zoomed papers when navigating away from projects
  useEffect(() => {
    if (selectedProject !== 'refocused') {
      onPaperZoom(null);
    }
    if (selectedProject !== 'respawnroom') {
      onRespawnPaperZoom(null);
    }
    if (selectedProject !== 'medesense') {
      onMedesensePaperZoom(null);
    }
    if (selectedProject !== 'resilinet') {
      onResilinetPaperZoom(null);
    }
    if (selectedProject !== 'filmnoir') {
      onFilmnoirPaperZoom(null);
    }
  }, [selectedProject, onPaperZoom, onRespawnPaperZoom, onMedesensePaperZoom, onResilinetPaperZoom, onFilmnoirPaperZoom]);

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
            <primitive object={SHARED_MATERIALS.darkRed} attach="material" />
          </mesh>
          <Text position={[0, 2.5, 0.04]} fontSize={0.28 * textScale} color="#FFFFFF" anchorX="center" anchorY="middle">
            CASE FILE #002
          </Text>
        </>
      )}

      {/* Show project list or project detail */}
      {!selectedProject ? (
        <ProjectsList onProjectSelect={onProjectSelect} />
      ) : selectedProject === 'refocused' ? (
        <ReFocusedProject zoomedPaper={zoomedPaper} onPaperZoom={onPaperZoom} />
      ) : selectedProject === 'resilinet' ? (
        <ResiliNetProject zoomedPaper={resilinetPaper} onPaperZoom={onResilinetPaperZoom} />
      ) : selectedProject === 'medesense' ? (
        <MedeSenseProject zoomedPaper={medesensePaper} onPaperZoom={onMedesensePaperZoom} />
      ) : selectedProject === 'respawnroom' ? (
        <RespawnRoomProject zoomedPaper={respawnPaper} onPaperZoom={onRespawnPaperZoom} />
      ) : selectedProject === 'filmnoir' ? (
        <FilmNoirResumeProject zoomedPaper={filmnoirPaper} onPaperZoom={onFilmnoirPaperZoom} />
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

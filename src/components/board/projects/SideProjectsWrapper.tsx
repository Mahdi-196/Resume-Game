import { Text, Line } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { SideProjectsSelection } from './SideProjectsSelection';
import { PopUpTriviaProject } from './PopUpTriviaProject';
import { VibeLinkProject } from './VibeLinkProject';
import { GraphiBooksProject } from './GraphiBooksProject';
import { COLORS } from '../constants';
import type { SideProject } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Side Projects Wrapper - Shows selection grid or individual project detail
 */
interface SideProjectsWrapperProps {
  selectedSideProject: SideProject;
  onSideProjectSelect: (project: SideProject) => void;
  onBack: () => void;
}

export const SideProjectsWrapper = ({
  selectedSideProject,
  onSideProjectSelect,
  onBack
}: SideProjectsWrapperProps) => {
  const textScale = getTextScale();
  return (
    <>
      {/* Back Button - Always visible with smart behavior */}
      <BackButton
        onClick={() => {
          if (selectedSideProject) {
            onSideProjectSelect(null);
          } else {
            onBack();
          }
        }}
      />

      {/* Header - Always visible */}
      <mesh position={[0, 2.7, 0.03]}>
        <planeGeometry args={[10.5, 0.8]} />
        <meshStandardMaterial color={COLORS.creamPaper} roughness={0.95} />
      </mesh>

      <Line
        points={[
          [-5.2, 3.1, 0.031],
          [5.2, 3.1, 0.031],
          [5.2, 2.3, 0.031],
          [-5.2, 2.3, 0.031],
          [-5.2, 3.1, 0.031]
        ]}
        color={COLORS.brass}
        lineWidth={3}
      />

      <Text
        position={[0, 2.7, 0.032]}
        fontSize={0.22 * textScale}
        color={COLORS.primaryText}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {selectedSideProject ? selectedSideProject.toUpperCase() : 'ADDITIONAL PROJECTS'}
      </Text>

      {/* Show selection grid or individual project */}
      {!selectedSideProject ? (
        <SideProjectsSelection onProjectSelect={onSideProjectSelect} />
      ) : selectedSideProject === 'popuptrivia' ? (
        <PopUpTriviaProject />
      ) : selectedSideProject === 'vibelink' ? (
        <VibeLinkProject />
      ) : selectedSideProject === 'graphibooks' ? (
        <GraphiBooksProject />
      ) : null}
    </>
  );
};

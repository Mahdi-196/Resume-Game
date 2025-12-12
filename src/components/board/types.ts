/**
 * Type definitions for the Interactive Detective Board
 */

export type CaseFile = 'about' | 'skillseducation' | 'projects' | null;
export type ProjectDetail = 'refocused' | 'resilinet' | 'medesense' | 'respawnroom' | 'sideprojects' | null;
export type SideProject = 'popuptrivia' | 'vibelink' | 'graphibooks' | null;
export type ZoomedPaper = 'frontend' | 'backend' | 'ai' | null;
export type RespawnPaper = 'frontend' | 'backend' | null;

/**
 * Props for the main InteractiveDetectiveBoard component
 */
export interface InteractiveDetectiveBoardProps {
  onInteraction: (type: string, data?: unknown) => void;
  onBoardClick?: () => void;
  onCaseFileClick?: (caseFile: CaseFile) => void;
  showContent?: boolean;
  selectedCaseFile?: CaseFile;
  overlayVisible?: boolean;
  onContentClose?: () => void;
}

/**
 * Props for individual case file cards
 */
export interface CaseFileCardProps {
  position: [number, number, number];
  title: string;
  fileNumber: string;
  items: string[];
  showContent?: boolean;
  selectedCaseFile?: CaseFile;
  onClick: () => void;
  labelColor?: string;
}

/**
 * Props for detail view components
 */
export interface DetailViewProps {
  onBack: () => void;
}

/**
 * Props for project components
 */
export interface ProjectsDetailProps extends DetailViewProps {
  selectedProject: ProjectDetail;
  onProjectSelect: (project: ProjectDetail) => void;
  zoomedPaper: ZoomedPaper;
  onPaperZoom: (paper: ZoomedPaper) => void;
  respawnPaper: RespawnPaper;
  onRespawnPaperZoom: (paper: RespawnPaper) => void;
  selectedSideProject: SideProject;
  onSideProjectSelect: (project: SideProject) => void;
}

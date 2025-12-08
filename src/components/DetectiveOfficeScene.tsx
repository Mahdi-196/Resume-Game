import { OfficeRoom } from './OfficeRoom';
import { ExecutiveDesk } from './ExecutiveDesk';
import { OfficeWindow } from './OfficeWindow';
import { VictorianChair } from './VictorianChair';
import { InteractiveDetectiveBoard } from './board';
import { Bookshelf } from './Bookshelf';
import { VictorianDoor } from './VictorianDoor';
import { VictorianChandelier } from './VictorianChandelier';
import { FirstPersonDetectiveBody } from './FirstPersonDetectiveBody';
import { DetectiveCharacter } from './DetectiveCharacter';

interface DetectiveOfficeSceneProps {
  onInteraction: (type: string, data?: unknown) => void;
  lampOn: boolean;
  cameraControlsRef: React.RefObject<any>;
  onBoardClick: () => void;
  onCaseFileClick?: (caseFile: 'about' | 'education' | 'skills' | 'projects' | null) => void;
  showBoardContent?: boolean;
  selectedCaseFile?: 'about' | 'education' | 'skills' | 'projects' | null;
  overlayVisible?: boolean;
  onBoardContentClose?: () => void;
  isDetectiveMode?: boolean;
  showIntroDetective?: boolean;
}

export const DetectiveOfficeScene = ({
  onInteraction,
  lampOn,
  cameraControlsRef: _cameraControlsRef,
  onBoardClick,
  onCaseFileClick,
  showBoardContent = false,
  selectedCaseFile = null,
  overlayVisible = false,
  onBoardContentClose,
  isDetectiveMode = false,
  showIntroDetective = false
}: DetectiveOfficeSceneProps) => {
  return (
    <>
      {/* Office room structure (walls, floor, ceiling) */}
      <OfficeRoom />

      {/* Central desk only */}
      <ExecutiveDesk onInteraction={onInteraction} />

      {/* Window filling the wall opening */}
      <OfficeWindow />
      
      {/* Desk Chair */}
      <VictorianChair position={[0, 0, -3]} rotation={[0, 0, 0]} />
      
      {/* Click-off plane - positioned behind board to close it when clicking outside */}
      {showBoardContent && (
        <mesh
          position={[0, 4.5, 5]} // Behind the camera when zoomed to board
          onClick={(e) => {
            e.stopPropagation();
            console.log('Click-off activated');
            onCaseFileClick?.(null);
            onBoardContentClose?.();
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            console.log('Click-off pointer down activated');
            onCaseFileClick?.(null);
            onBoardContentClose?.();
          }}
        >
          <planeGeometry args={[200, 200]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      {/* Interactive Detective Board */}
      <InteractiveDetectiveBoard
        onInteraction={onInteraction}
        onBoardClick={onBoardClick}
        onCaseFileClick={onCaseFileClick}
        showContent={showBoardContent}
        selectedCaseFile={selectedCaseFile}
        overlayVisible={overlayVisible}
        onContentClose={onBoardContentClose}
      />
      
      {/* Asymmetrical Bookshelves - Left wall (3 bookshelves with gaps) */}
      <Bookshelf position={[-9.0, 0, -6]} rotation={[0, Math.PI / 2, 0]} variant={1} />
      <Bookshelf position={[-9.0, 0, 6]} rotation={[0, Math.PI / 2, 0]} variant={3} />
      
      {/* Right wall (3 touching bookshelves) */}
      <Bookshelf position={[9.0, 0, -3]} rotation={[0, -Math.PI / 2, 0]} variant={5} />
      <Bookshelf position={[9.0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} variant={3} />
      <Bookshelf position={[9.0, 0, 3]} rotation={[0, -Math.PI / 2, 0]} variant={6} />
      
      {/* Corner bookshelf - L-shaped arrangement */}
      <Bookshelf position={[-8, 0, -9]} rotation={[0, 0, 0]} variant={7} />
      
      {/* Victorian Door on right wall */}
      <VictorianDoor position={[9.5, 0, 8]} rotation={[0, -Math.PI / 2, 0]} onInteraction={onInteraction} />

      {/* Victorian Chandelier - lowered 10% for smaller room */}
      <VictorianChandelier position={[0, 8.1, 2]} isLit={lampOn} />

      {/* Detective character visible during intro animation */}
      {showIntroDetective && (
        <group>
          <DetectiveCharacter
            position={[0, 0, 0]}
            onInteraction={onInteraction}
            scale={1}
            autoRotate={false}
          />
          {/* Spotlight on detective during intro */}
          <spotLight
            position={[3, 5, 5]}
            target-position={[0, 2, 0]}
            intensity={3}
            angle={0.6}
            penumbra={0.5}
            color="#ffd700"
            castShadow
          />
        </group>
      )}

      {/* Detective character - always visible for customization */}
      {!showIntroDetective && (
        <group>
          <DetectiveCharacter
            position={[0, 0, 3]}
            onInteraction={onInteraction}
            scale={2}
            autoRotate={true}
          />
          {/* Spotlight to make character more visible */}
          <spotLight
            position={[2, 4, 5]}
            target-position={[0, 2, 3]}
            intensity={2}
            angle={0.5}
            penumbra={0.5}
            color="#ffffff"
          />
        </group>
      )}

      {/* First-person detective body view (visible when in detective mode) */}
      {isDetectiveMode && <FirstPersonDetectiveBody />}




    </>
  );
};
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
import { VictorianCouch } from './VictorianCouch';
import { VictorianArmchair } from './VictorianArmchair';
import { CoatRack } from './CoatRack';

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
  playerCharacterRef?: React.RefObject<any>;
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
  showIntroDetective = false,
  playerCharacterRef
}: DetectiveOfficeSceneProps) => {
  return (
    <>
      {/* Office room structure (walls, floor, ceiling) */}
      <OfficeRoom onMapClick={() => onInteraction('map')} />

      {/* Central desk only */}
      <ExecutiveDesk onInteraction={onInteraction} />

      {/* Window filling the wall opening */}
      <OfficeWindow />
      
      {/* Desk Chair */}
      <VictorianChair position={[0, 0, -6]} rotation={[0, 0, 0]} />
      
      {/* Click-off plane for board - positioned at walls to catch background clicks */}
      {showBoardContent && (
        <>
          <mesh
            position={[0, 4.5, 9.95]} // Just behind the board surface
            rotation={[0, Math.PI, 0]} // Face the camera
            onClick={(e) => {
              e.stopPropagation();
              console.log('Click-off activated - closing board/map');
              onBoardContentClose?.();
            }}
          >
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          {/* Click-off plane for map - positioned behind map on left wall */}
          <mesh
            position={[-9.95, 4.5, 0]} // Just behind the map surface (left wall)
            rotation={[0, Math.PI / 2, 0]} // Face the camera from left wall
            onClick={(e) => {
              e.stopPropagation();
              console.log('Map click-off activated - closing map');
              onBoardContentClose?.();
            }}
          >
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </>
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

      {/* Victorian Seating - Main couch and side armchair */}
      <group scale={[1.6, 1, 1.3]}>
        <VictorianCouch position={[0, 0, 1.5]} rotation={[0, 0, 0]} />
      </group>
      <VictorianArmchair position={[-3.5, 0, 3.5]} rotation={[0, Math.PI / 2, 0]} />

      {/* Asymmetrical Bookshelves - Left wall (3 bookshelves with gaps) */}}
      <Bookshelf position={[-9.0, 0, -6]} rotation={[0, Math.PI / 2, 0]} variant={1} />
      <Bookshelf position={[-9.0, 0, 6]} rotation={[0, Math.PI / 2, 0]} variant={3} />
      
      {/* Right wall (3 touching bookshelves) */}
      <Bookshelf position={[9.0, 0, -3]} rotation={[0, -Math.PI / 2, 0]} variant={5} />
      <Bookshelf position={[9.0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} variant={3} />
      <Bookshelf position={[9.0, 0, 3]} rotation={[0, -Math.PI / 2, 0]} variant={6} />
      
      {/* Corner bookshelf - L-shaped arrangement */}
      <Bookshelf position={[-8, 0, -9]} rotation={[0, 0, 0]} variant={7} />
      
      {/* Victorian Door on right wall */}
      <VictorianDoor position={[9.95, 0, 7.5]} rotation={[0, -Math.PI / 2, 0]} onInteraction={onInteraction} />

      {/* Coat Rack near entrance */}
      <CoatRack position={[8, 0, 8.5]} rotation={[0, 0, 0]} />

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

      {/* Detective character - player controlled (hidden in first-person) */}
      {!showIntroDetective && (
        <group visible={false}>
          <DetectiveCharacter
            ref={playerCharacterRef}
            position={[0, 0, 3]}
            onInteraction={onInteraction}
            scale={0.8}
            autoRotate={false}
            isPlayerControlled={true}
          />
        </group>
      )}

      {/* First-person detective body view (visible when in detective mode) */}
      {isDetectiveMode && <FirstPersonDetectiveBody />}




    </>
  );
};
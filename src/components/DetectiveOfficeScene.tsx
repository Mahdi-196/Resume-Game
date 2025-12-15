import { OfficeRoom } from './OfficeRoom';
import { ExecutiveDesk } from './ExecutiveDesk';
import { DetectiveDesk } from './DetectiveDesk';
import { DetectiveOfficeChair } from './DetectiveOfficeChair';
import { OfficeWindow } from './OfficeWindow';
import { VictorianChair } from './VictorianChair';
import { InteractiveDetectiveBoard } from './board';
import { Bookshelf } from './Bookshelf';
import { VictorianBookshelf } from './VictorianBookshelf';
import { ArtDecoBookshelf } from './ArtDecoBookshelf';
import { LibraryLadderBookshelf } from './LibraryLadderBookshelf';
import { VictorianDoor } from './VictorianDoor';
import { VictorianChandelier } from './VictorianChandelier';
import { FirstPersonDetectiveBody } from './FirstPersonDetectiveBody';
import { DetectiveCharacter } from './DetectiveCharacter';
import { VictorianCouch } from './VictorianCouch';
import { VictorianArmchair } from './VictorianArmchair';
import { CoatRack } from './CoatRack';
import { FilingCabinet } from './FilingCabinet';
import { WoodenCoffeeTable } from './WoodenCoffeeTable';
import { WoodenEndTable } from './WoodenEndTable';
import { SquareWoodenTable } from './SquareWoodenTable';

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


      {/* Filing Cabinets - Strategically placed for authentic office layout */}

      {/* Classic Vertical Metal Cabinet - Right wall, near desk for active case files */}
      <FilingCabinet
        position={[8.5, 0, -5]}
        rotation={[0, -Math.PI / 2, 0]}
        variant="classic"
      />

      {/* Detective Desk - Executive style with drawers (1.7x scale) - Against left wall */}
      <group scale={1.7}>
        <DetectiveDesk
          position={[-5.2, 0, -2.5]}
          rotation={[0, Math.PI / 2 + Math.PI, 0]}
        />
      </group>

      {/* Detective Office Chair - Moved east and rotated more north (1.7x scale) */}
      <group scale={1.7}>
        <DetectiveOfficeChair
          position={[-3.8, 0, -2.5]}
          rotation={[0, Math.PI / 2 + Math.PI + Math.PI / 10, 0]}
        />
      </group>

      {/* Lateral Wood Cabinet - Under map on right wall, wider along wall */}
      <group
        scale={[1, 1, 3]}
        onClick={(e) => e.stopPropagation()}
        onPointerOver={(e) => e.stopPropagation()}
        onPointerOut={(e) => e.stopPropagation()}
        raycast={() => null}
      >
        <FilingCabinet
          position={[9.4, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          variant="lateral"
        />
      </group>

      {/* Spotlight for map on right wall */}
      <spotLight
        position={[6, 4, 0]}
        target-position={[9.85, 3, 0]}
        intensity={2}
        angle={0.5}
        penumbra={0.3}
        color="#ffd700"
      />

      {/* Window filling the wall opening */}
      <OfficeWindow />

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

          {/* Click-off plane for map - positioned behind map on right wall */}
          <mesh
            position={[9.95, 4.5, 0]} // Just behind the map surface (right wall)
            rotation={[0, -Math.PI / 2, 0]} // Face the camera from right wall
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
      <VictorianArmchair position={[-4.0, 0, 3.5]} rotation={[0, Math.PI / 2 - Math.PI * 0.30, 0]} />

      {/* Right wall (2 original bookshelves with gap) */}
      <Bookshelf position={[9.0, 0, -3]} rotation={[0, -Math.PI / 2, 0]} variant={5} />
      <Bookshelf position={[9.0, 0, 3]} rotation={[0, -Math.PI / 2, 0]} variant={6} />

      {/* Left wall - Art Deco Bookshelf (1930s geometric with chrome and black frame) - Further along wall */}
      <ArtDecoBookshelf position={[-9.0, 0, 2]} rotation={[0, Math.PI / 2, 0]} variant={2} />

      {/* Back wall - Library Ladder Bookshelf (tall vintage with ladder) */}
      <LibraryLadderBookshelf position={[5, 0, 9.2]} rotation={[0, Math.PI, 0]} variant={3} />

      {/* Victorian Door on right wall */}
      <VictorianDoor position={[9.95, 0, 7.5]} rotation={[0, -Math.PI / 2, 0]} onInteraction={onInteraction} />

      {/* Coat Rack near entrance */}
      <CoatRack position={[8, 0, 8.5]} rotation={[0, 0, 0]} />

      {/* Wooden Tables - Practical furniture throughout the room */}

      {/* Large wooden coffee table in front of couch */}
      <WoodenCoffeeTable position={[0, 0, 3.8]} rotation={[0, 0, 0]} />

      {/* Wooden end table near armchair */}
      <WoodenEndTable position={[-5.5, 0, 4.5]} rotation={[0, 0, 0]} />

      {/* Wooden end table on right side of couch */}
      <WoodenEndTable position={[3, 0, 2.5]} rotation={[0, Math.PI / 4, 0]} />

      {/* Square wooden table - center display piece */}
      <SquareWoodenTable position={[4, 0, -3]} rotation={[0, 0, 0]} />

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
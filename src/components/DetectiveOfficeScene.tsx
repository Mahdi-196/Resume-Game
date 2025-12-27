import { useState } from 'react';
import { OfficeRoom } from './OfficeRoom';
import { ExecutiveDesk } from './ExecutiveDesk';
import { DetectiveDesk } from './DetectiveDesk';
import { DetectiveOfficeChair } from './DetectiveOfficeChair';
import { OfficeWindow } from './OfficeWindow';
import { VictorianChair } from './VictorianChair';
import { InteractiveDetectiveBoard } from './board';
import { VictorianDoor } from './VictorianDoor';
import { VictorianChandelier } from './VictorianChandelier';
import { FirstPersonDetectiveBody } from './FirstPersonDetectiveBody';
import { DetectiveCharacter } from './DetectiveCharacter';
import { FilingCabinet } from './FilingCabinet';
import { WoodenCoffeeTable } from './WoodenCoffeeTable';
import { WoodenEndTable } from './WoodenEndTable';
import { SquareWoodenTable } from './SquareWoodenTable';
import { CoffeeTableItems } from './CoffeeTableItems';
import { PersianRug } from './PersianRug';
import { ModelLoader } from './ModelLoader';

interface DetectiveOfficeSceneProps {
  onInteraction: (type: string, data?: unknown) => void;
  lampOn: boolean;
  cameraControlsRef: React.RefObject<any>;
  onBoardClick: () => void;
  onCaseFileClick?: (caseFile: 'profile' | 'portfolio' | null) => void;
  showBoardContent?: boolean;
  selectedCaseFile?: 'profile' | 'portfolio' | null;
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
  const [deskLampOn, setDeskLampOn] = useState(false);

  return (
    <>
      {/* Office room structure (walls, floor, ceiling) */}
      <OfficeRoom onMapClick={() => onInteraction('map')} />


      {/* Filing Cabinets - Strategically placed for authentic office layout */}

      {/* Classic Vertical Metal Cabinets - Left wall, near desk - Deeper */}
      <group scale={[1.15, 1, 1.5]}>
        <FilingCabinet
          position={[-7.5, 0, -6.5]}
          rotation={[0, 0, 0]}
          variant="classic"
        />
      </group>

      <group scale={[1.15, 1, 1.5]}>
        <FilingCabinet
          position={[-8.5, 0, -5.9]}
          rotation={[0, Math.PI / 2, 0]}
          variant="classic"
        />
      </group>

      <group scale={[1.15, 1, 1.5]}>
        <FilingCabinet
          position={[-8.5, 0, -4.9]}
          rotation={[0, Math.PI / 2, 0]}
          variant="classic"
        />
      </group>

      {/* Card Catalog Cabinet - Left wall, near Art Deco bookshelf for case files */}
      <group position={[-9.8, 0, -1.5]} scale={1.15}>
        <FilingCabinet
          position={[0, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          variant="card-catalog"
        />
      </group>


      {/* Detective Desk - Executive style with drawers (1.7x scale) - Against left wall */}
      <group scale={1.7}>
        <DetectiveDesk
          position={[-5.2, 0, -2.5]}
          rotation={[0, Math.PI / 2 + Math.PI, 0]}
        />
      </group>

      {/* Desk Items - Imported 3D models */}

      {/* Desk Lamp - positioned on desk surface, clickable to turn on/off */}
      <ModelLoader
        modelPath="/models/bankers_lamp/scene.gltf"
        position={[-9.5, 1.5, -2.5]}
        scale={2.0}
        rotation={[0, Math.PI / 2 + Math.PI / 6 + Math.PI / 9, 0]}
        onClick={() => setDeskLampOn(!deskLampOn)}
      />

      {/* Desk lamp light - only visible when lamp is on */}
      {deskLampOn && (
        <>
          <pointLight position={[-9.5, 1.95, -2.3]} intensity={1.5} color="#ffdb8c" distance={3} />
          <spotLight
            position={[-9.5, 1.95, -2.3]}
            target-position={[-9.5, 1.3, -2.5]}
            intensity={2}
            angle={0.6}
            penumbra={0.5}
            color="#ffdb8c"
          />
        </>
      )}

      {/* Magnifying Glass - detective tool on desk */}
      <ModelLoader
        modelPath="/models/magnifying_glass/scene.gltf"
        position={[-8.0, 1.5, -5.0]}
        scale={4.5}
        rotation={[0, Math.PI / 4, 0]}
      />

      {/* Antique Globe - decorative piece on desk */}
      <ModelLoader
        modelPath="/models/antique_globe/scene.gltf"
        position={[-11.0, 2.12, -5.1]}
        scale={2.08}
        rotation={[0, Math.PI / 6, 0]}
      />

      {/* Smoking Pipe - classic detective accessory on desk */}
      <ModelLoader
        modelPath="/models/smoking_pipe/scene.gltf"
        position={[-7.9, 1.60, -6.0]}
        scale={0.0035}
        rotation={[0, Math.PI / 3, 0]}
      />

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
          position={[9.6, 0, -1.0]}
          rotation={[0, -Math.PI / 2, 0]}
          variant="lateral"
        />
      </group>

      {/* Spotlight for map on right wall */}
      <spotLight
        position={[6, 4, -3]}
        target-position={[9.85, 3, -3]}
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
            position={[9.95, 4.5, -3]} // Just behind the map surface (right wall)
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

      {/* Persian Rug - Vintage oriental rug anchoring the seating area */}
      <PersianRug position={[0, 0.01, 0.5]} rotation={[0, Math.PI / 2, 0]} />

      {/* Right wall bookshelves - Dusty vintage bookshelves */}
      <ModelLoader
        modelPath="/models/dusty_bookshelf/scene.gltf"
        position={[9.0, 0, -6]}
        scale={2.0}
        rotation={[0, Math.PI / 2, 0]}
      />
      <ModelLoader
        modelPath="/models/dusty_bookshelf/scene.gltf"
        position={[9.0, 0, 0]}
        scale={2.0}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Victorian Door on right wall */}
      <VictorianDoor position={[9.95, 0, 7.5]} rotation={[0, -Math.PI / 2, 0]} onInteraction={onInteraction} />

      {/* Wooden Tables - Practical furniture throughout the room */}

      {/* Large wooden coffee table in front of couch */}
      <WoodenCoffeeTable position={[0, 0, 3.8]} rotation={[0, 0, 0]} />

      {/* Coffee table decorative items - whiskey set, ashtray, case files, etc. */}
      <CoffeeTableItems position={[0, 0, 3.8]} rotation={[0, 0, 0]} />

      {/* Vintage Seating - Small and large vintage couches */}

      {/* Small vintage couch */}
      <ModelLoader
        modelPath="/models/vintage_couch_small/scene.gltf"
        position={[-2.0, 0.7, 3.5]}
        scale={0.8}
        rotation={[0, Math.PI / 2 - Math.PI * 0.30, 0]}
      />

      {/* Larger vintage couch */}
      <ModelLoader
        modelPath="/models/vintage_couch_large/scene.gltf"
        position={[0, 0.5, 3.5]}
        scale={[1.5, 2.5, 2.5]}
        rotation={[0, 0, 0]}
        hideMeshes={['P-2']}
      />

      {/* Wooden end table near armchair */}
      <WoodenEndTable position={[-5.5, 0, 4.5]} rotation={[0, 0, 0]} />

      {/* Wooden end table in gap between chair and couch */}
      <WoodenEndTable position={[-3.3, 0, 2.5]} rotation={[0, Math.PI / 4, 0]} />

      {/* Victorian Chandelier - lowered 10% for smaller room */}
      <VictorianChandelier position={[0, 8.1, 2]} isLit={lampOn} />

      {/* Additional bright lighting for flying mode (non-detective mode) */}
      {!isDetectiveMode && (
        <>
          {/* Bright ambient light for flying mode */}
          <ambientLight intensity={1.5} color="#ffffff" />

          {/* Additional hemisphere light for overall brightness */}
          <hemisphereLight intensity={1.2} color="#ffffff" groundColor="#8b7355" />

          {/* Corner fill lights */}
          <pointLight position={[-8, 6, -8]} intensity={1.5} color="#fffaf0" distance={15} />
          <pointLight position={[8, 6, -8]} intensity={1.5} color="#fffaf0" distance={15} />
          <pointLight position={[-8, 6, 8]} intensity={1.5} color="#fffaf0" distance={15} />
          <pointLight position={[8, 6, 8]} intensity={1.5} color="#fffaf0" distance={15} />

          {/* Center ceiling light */}
          <pointLight position={[0, 8, 0]} intensity={2} color="#ffffff" distance={20} />
        </>
      )}

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
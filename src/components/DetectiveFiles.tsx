interface DetectiveFilesProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  type?: 'manila-folder' | 'legal-pad' | 'case-file' | 'newspaper' | 'envelope';
}

/**
 * Detective office files and documents
 * Creates various file types for authentic detective office feel
 */
export const DetectiveFiles = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  type = 'manila-folder'
}: DetectiveFilesProps) => {

  if (type === 'manila-folder') {
    // Classic manila folder
    return (
      <group position={position} rotation={rotation}>
        <mesh position={[0, 0.001, 0]}>
          <boxGeometry args={[0.35, 0.002, 0.45]} />
          <meshStandardMaterial color="#d4a574" roughness={0.9} />
        </mesh>
        {/* Tab on top */}
        <mesh position={[0.1, 0.003, -0.15]}>
          <boxGeometry args={[0.15, 0.002, 0.15]} />
          <meshStandardMaterial color="#d4a574" roughness={0.9} />
        </mesh>
      </group>
    );
  }

  if (type === 'legal-pad') {
    // Yellow legal pad with lines
    return (
      <group position={position} rotation={rotation}>
        <mesh position={[0, 0.002, 0]}>
          <boxGeometry args={[0.28, 0.004, 0.36]} />
          <meshStandardMaterial color="#fffacd" roughness={0.8} />
        </mesh>
        {/* Red margin line */}
        <mesh position={[-0.1, 0.005, 0]}>
          <boxGeometry args={[0.002, 0.001, 0.35]} />
          <meshStandardMaterial color="#cc0000" />
        </mesh>
      </group>
    );
  }

  if (type === 'case-file') {
    // Thick case file with papers visible
    return (
      <group position={position} rotation={rotation}>
        {/* Folder back */}
        <mesh position={[0, 0.001, 0]}>
          <boxGeometry args={[0.38, 0.002, 0.48]} />
          <meshStandardMaterial color="#8b7355" roughness={0.9} />
        </mesh>
        {/* Papers inside */}
        <mesh position={[0, 0.01, 0.02]}>
          <boxGeometry args={[0.35, 0.018, 0.42]} />
          <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
        </mesh>
        {/* Folder front (slightly open) */}
        <mesh position={[0.05, 0.022, 0.05]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[0.38, 0.002, 0.44]} />
          <meshStandardMaterial color="#8b7355" roughness={0.9} />
        </mesh>
        {/* String tie */}
        <mesh position={[0, 0.024, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
          <meshStandardMaterial color="#4a3520" />
        </mesh>
      </group>
    );
  }

  if (type === 'newspaper') {
    // Folded newspaper
    return (
      <group position={position} rotation={rotation}>
        {/* Front page */}
        <mesh position={[0, 0.001, 0]}>
          <boxGeometry args={[0.32, 0.002, 0.42]} />
          <meshStandardMaterial color="#e8e8d0" roughness={0.9} />
        </mesh>
        {/* Headline area (darker) */}
        <mesh position={[0, 0.003, 0.12]}>
          <boxGeometry args={[0.3, 0.001, 0.08]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
        </mesh>
        {/* Fold crease */}
        <mesh position={[0, 0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.002, 0.002, 0.32, 8]} />
          <meshStandardMaterial color="#c8c8b0" />
        </mesh>
      </group>
    );
  }

  if (type === 'envelope') {
    // Sealed envelope
    return (
      <group position={position} rotation={rotation}>
        {/* Envelope body */}
        <mesh position={[0, 0.001, 0]}>
          <boxGeometry args={[0.25, 0.002, 0.15]} />
          <meshStandardMaterial color="#f0ead6" roughness={0.8} />
        </mesh>
        {/* Flap */}
        <mesh position={[0, 0.003, -0.06]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.25, 0.002, 0.08]} />
          <meshStandardMaterial color="#ede4d0" roughness={0.8} />
        </mesh>
        {/* Wax seal */}
        <mesh position={[0, 0.006, -0.04]}>
          <cylinderGeometry args={[0.015, 0.015, 0.006, 12]} />
          <meshStandardMaterial color="#8b0000" roughness={0.6} metalness={0.2} />
        </mesh>
      </group>
    );
  }

  return null;
};

interface OfficePapersProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  type?: 'scattered' | 'file' | 'stack';
}

/**
 * Simple paper and file props for office environment
 * Creates basic paper meshes to add lived-in feel
 */
export const OfficePapers = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  type = 'scattered'
}: OfficePapersProps) => {
  const paperColor = '#f5f5dc'; // Aged paper color
  const fileColor = '#8b7355'; // Manila folder color

  if (type === 'file') {
    // Case file folder
    return (
      <group position={position} rotation={rotation}>
        {/* Folder back */}
        <mesh position={[0, 0.001, 0]}>
          <boxGeometry args={[0.35, 0.002, 0.45]} />
          <meshStandardMaterial color={fileColor} roughness={0.9} />
        </mesh>
        {/* Folder front (slightly open) */}
        <mesh position={[0, 0.003, 0.02]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.35, 0.002, 0.42]} />
          <meshStandardMaterial color={fileColor} roughness={0.9} />
        </mesh>
        {/* Papers inside */}
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[0.3, 0.002, 0.4]} />
          <meshStandardMaterial color={paperColor} roughness={0.8} />
        </mesh>
      </group>
    );
  }

  if (type === 'stack') {
    // Stack of papers
    return (
      <group position={position} rotation={rotation}>
        {[0, 0.01, 0.02, 0.03].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[0.28, 0.002, 0.36]} />
            <meshStandardMaterial color={paperColor} roughness={0.8} />
          </mesh>
        ))}
      </group>
    );
  }

  // Scattered single papers
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.28, 0.001, 0.36]} />
        <meshStandardMaterial color={paperColor} roughness={0.8} />
      </mesh>
    </group>
  );
};

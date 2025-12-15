/**
 * Heavy Oak Table - Wide, low table with robust construction
 * Features thick top, H-frame base, perfect for display
 */
export const HeavyOakTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const darkWood = "#2a1810"; // Dark mahogany
  const richWood = "#3d2817"; // Rich brown

  return (
    <group position={position} rotation={rotation}>
      {/* Wide, thick tabletop */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.1, 1.8]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Chunky beveled edge */}
      <mesh position={[0, 0.47, 0.91]}>
        <boxGeometry args={[2.62, 0.06, 0.06]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.47, -0.91]}>
        <boxGeometry args={[2.62, 0.06, 0.06]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>
      <mesh position={[1.31, 0.47, 0]}>
        <boxGeometry args={[0.06, 0.06, 1.82]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>
      <mesh position={[-1.31, 0.47, 0]}>
        <boxGeometry args={[0.06, 0.06, 1.82]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>

      {/* H-frame base structure */}

      {/* Two wide end frames */}
      {[-1.1, 1.1].map((x, i) => (
        <group key={`end-frame-${i}`} position={[x, 0, 0]}>
          {/* Vertical posts */}
          <mesh position={[-0.7, 0.2, 0]} castShadow>
            <boxGeometry args={[0.12, 0.4, 0.12]} />
            <meshStandardMaterial color={darkWood} roughness={0.75} />
          </mesh>
          <mesh position={[0.7, 0.2, 0]} castShadow>
            <boxGeometry args={[0.12, 0.4, 0.12]} />
            <meshStandardMaterial color={darkWood} roughness={0.75} />
          </mesh>

          {/* Horizontal stretcher between posts */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[1.4, 0.08, 0.1]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>

          {/* Top rail */}
          <mesh position={[0, 0.38, 0]}>
            <boxGeometry args={[1.52, 0.08, 0.14]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Central connecting beam (the "H" crossbar) */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[2.0, 0.1, 0.12]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>

      {/* Feet on each vertical post */}
      {[
        [-1.8, 0, 0],
        [-0.4, 0, 0],
        [0.4, 0, 0],
        [1.8, 0, 0],
      ].map((pos, i) => (
        <mesh key={`foot-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.16, 0.04, 0.16]} />
          <meshStandardMaterial color={darkWood} roughness={0.8} />
        </mesh>
      ))}

      {/* Decorative corner brackets */}
      {[
        [-1.1, 0.38, -0.8],
        [1.1, 0.38, -0.8],
        [-1.1, 0.38, 0.8],
        [1.1, 0.38, 0.8],
      ].map((pos, i) => (
        <mesh key={`bracket-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color={darkWood} roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
};

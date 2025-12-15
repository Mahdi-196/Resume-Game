/**
 * Large Square Table - Big square table with trestle base
 * Features thick square top, substantial legs, cross supports
 */
export const LargeSquareTable = ({
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
      {/* Large square tabletop - thick solid wood */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.1, 2.2]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Edge molding on all four sides */}
      {[
        [0, 0.52, 1.11, [2.22, 0.05, 0.05]],
        [0, 0.52, -1.11, [2.22, 0.05, 0.05]],
        [1.11, 0.52, 0, [0.05, 0.05, 2.22]],
        [-1.11, 0.52, 0, [0.05, 0.05, 2.22]],
      ].map((data, i) => {
        const [x, y, z, dims] = data as [number, number, number, number[]];
        return (
          <mesh key={`edge-${i}`} position={[x, y, z]}>
            <boxGeometry args={dims as [number, number, number]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>
        );
      })}

      {/* Diagonal wood grain pattern on top */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((offset, i) => (
        <mesh key={`grain-x-${i}`} position={[offset, 0.551, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.01, 0.001, 3.0]} />
          <meshStandardMaterial color={richWood} roughness={0.8} />
        </mesh>
      ))}

      {/* Trestle base - two end supports */}
      {[-0.9, 0.9].map((z, i) => (
        <group key={`trestle-${i}`} position={[0, 0, z]}>
          {/* Two vertical posts */}
          <mesh position={[-0.85, 0.22, 0]} castShadow>
            <boxGeometry args={[0.12, 0.44, 0.12]} />
            <meshStandardMaterial color={darkWood} roughness={0.75} />
          </mesh>
          <mesh position={[0.85, 0.22, 0]} castShadow>
            <boxGeometry args={[0.12, 0.44, 0.12]} />
            <meshStandardMaterial color={darkWood} roughness={0.75} />
          </mesh>

          {/* Angled support braces */}
          <mesh position={[-0.5, 0.15, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.08, 0.6, 0.1]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>
          <mesh position={[0.5, 0.15, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.08, 0.6, 0.1]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>

          {/* Top beam connecting posts */}
          <mesh position={[0, 0.42, 0]}>
            <boxGeometry args={[1.82, 0.1, 0.14]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>

          {/* Bottom stretcher */}
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[1.6, 0.08, 0.1]} />
            <meshStandardMaterial color={darkWood} roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Long connecting beam between trestles */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.12, 0.1, 1.6]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>

      {/* Four feet */}
      {[
        [-0.85, 0, -0.9],
        [0.85, 0, -0.9],
        [-0.85, 0, 0.9],
        [0.85, 0, 0.9],
      ].map((pos, i) => (
        <mesh key={`foot-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.16, 0.04, 0.16]} />
          <meshStandardMaterial color={darkWood} roughness={0.8} />
        </mesh>
      ))}

      {/* Decorative metal-look corner plates */}
      {[
        [-0.85, 0.42, -0.9],
        [0.85, 0.42, -0.9],
        [-0.85, 0.42, 0.9],
        [0.85, 0.42, 0.9],
      ].map((pos, i) => (
        <mesh key={`plate-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.14, 0.12, 0.14]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
};

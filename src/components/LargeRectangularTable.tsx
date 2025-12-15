/**
 * Large Rectangular Table - Massive solid wood table for central placement
 * Features thick plank top, chunky legs, no drawers - pure display table
 */
export const LargeRectangularTable = ({
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
      {/* Massive thick tabletop - wood plank style */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.12, 1.6]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Visible wood grain/plank lines on top */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((z, i) => (
        <mesh key={`grain-${i}`} position={[0, 0.661, z]}>
          <boxGeometry args={[3.0, 0.002, 0.01]} />
          <meshStandardMaterial
            color={richWood}
            roughness={0.75}
          />
        </mesh>
      ))}

      {/* Thick edge molding */}
      <mesh position={[0, 0.58, 0.81]}>
        <boxGeometry args={[3.02, 0.06, 0.06]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.58, -0.81]}>
        <boxGeometry args={[3.02, 0.06, 0.06]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>

      {/* Four massive legs - very thick and sturdy */}
      {[
        [-1.4, 0, -0.7],
        [1.4, 0, -0.7],
        [-1.4, 0, 0.7],
        [1.4, 0, 0.7],
      ].map((pos, i) => (
        <group key={`leg-${i}`} position={pos as [number, number, number]}>
          {/* Main leg - chunky square post */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.15, 0.5, 0.15]} />
            <meshStandardMaterial color={darkWood} roughness={0.75} />
          </mesh>

          {/* Leg base/foot */}
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.18, 0.06, 0.18]} />
            <meshStandardMaterial color={richWood} roughness={0.8} />
          </mesh>

          {/* Top mounting block */}
          <mesh position={[0, 0.48, 0]}>
            <boxGeometry args={[0.18, 0.06, 0.18]} />
            <meshStandardMaterial color={richWood} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Support beams between legs (for extra sturdiness) */}
      {/* Long beams (X-axis) */}
      <mesh position={[0, 0.15, -0.7]}>
        <boxGeometry args={[2.6, 0.08, 0.08]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.15, 0.7]}>
        <boxGeometry args={[2.6, 0.08, 0.08]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>

      {/* Short beams (Z-axis) */}
      <mesh position={[-1.4, 0.15, 0]}>
        <boxGeometry args={[0.08, 0.08, 1.2]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>
      <mesh position={[1.4, 0.15, 0]}>
        <boxGeometry args={[0.08, 0.08, 1.2]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>
    </group>
  );
};

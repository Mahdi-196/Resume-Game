/**
 * Square Wooden Table - Larger square table for center placement
 * Features thick solid wood construction, no drawers, simple and sturdy
 */
export const SquareWoodenTable = ({
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
      {/* Square tabletop - thick solid wood */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.08, 1.4]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Beveled edge trim on all sides */}
      <mesh position={[0, 0.47, 0.71]}>
        <boxGeometry args={[1.42, 0.04, 0.04]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.47, -0.71]}>
        <boxGeometry args={[1.42, 0.04, 0.04]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>
      <mesh position={[0.71, 0.47, 0]}>
        <boxGeometry args={[0.04, 0.04, 1.42]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>
      <mesh position={[-0.71, 0.47, 0]}>
        <boxGeometry args={[0.04, 0.04, 1.42]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>

      {/* Apron/frame under table */}
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[1.3, 0.12, 1.3]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Decorative corner brackets */}
      {[
        [-0.6, 0.38, -0.6],
        [0.6, 0.38, -0.6],
        [-0.6, 0.38, 0.6],
        [0.6, 0.38, 0.6],
      ].map((pos, i) => (
        <mesh key={`bracket-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.08, 0.14, 0.08]} />
          <meshStandardMaterial color={darkWood} roughness={0.75} />
        </mesh>
      ))}

      {/* Four thick legs - square profile */}
      {[
        [-0.6, 0, -0.6],
        [0.6, 0, -0.6],
        [-0.6, 0, 0.6],
        [0.6, 0, 0.6],
      ].map((pos, i) => (
        <group key={`leg-${i}`} position={pos as [number, number, number]}>
          {/* Main leg - thick square */}
          <mesh position={[0, 0.16, 0]} castShadow>
            <boxGeometry args={[0.1, 0.32, 0.1]} />
            <meshStandardMaterial color={darkWood} roughness={0.7} />
          </mesh>

          {/* Leg cap/base */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.11, 0.04, 0.11]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>

          {/* Top mounting block */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.11, 0.04, 0.11]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Cross-brace supports between legs (X pattern underneath) */}
      <group position={[0, 0.1, 0]}>
        {/* Diagonal brace 1 */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.06]} />
          <meshStandardMaterial color={richWood} roughness={0.7} />
        </mesh>

        {/* Diagonal brace 2 */}
        <mesh rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.06]} />
          <meshStandardMaterial color={richWood} roughness={0.7} />
        </mesh>

        {/* Center junction block */}
        <mesh>
          <boxGeometry args={[0.12, 0.07, 0.12]} />
          <meshStandardMaterial color={darkWood} roughness={0.75} />
        </mesh>
      </group>
    </group>
  );
};

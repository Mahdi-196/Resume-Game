/**
 * Console Table - 1930s narrow wall table for entryway/hallway
 * Features slender profile, decorative legs, single drawer
 */
export const ConsoleTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const darkWood = "#2a1810"; // Dark mahogany
  const richWood = "#3d2817"; // Rich brown
  const brassColor = "#b8860b"; // Polished brass
  const marbleTop = "#e8dcc0"; // Cream marble accent

  return (
    <group position={position} rotation={rotation}>
      {/* Narrow rectangular tabletop */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.05, 0.35]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Decorative edge molding */}
      <mesh position={[0, 0.88, 0.18]}>
        <boxGeometry args={[1.22, 0.03, 0.03]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.88, -0.18]}>
        <boxGeometry args={[1.22, 0.03, 0.03]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>

      {/* Marble accent strip on top */}
      <mesh position={[0, 0.925, 0]}>
        <boxGeometry args={[1.15, 0.01, 0.3]} />
        <meshStandardMaterial
          color={marbleTop}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      {/* Single drawer */}
      <group position={[0, 0.72, -0.145]}>
        {/* Drawer front */}
        <mesh>
          <boxGeometry args={[0.9, 0.15, 0.03]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>

        {/* Drawer panel inset */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.85, 0.12, 0.01]} />
          <meshStandardMaterial color={richWood} roughness={0.65} />
        </mesh>

        {/* Decorative brass pull (ornate ring) */}
        <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.04, 0.008, 12, 16]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Ring attachment plate */}
        <mesh position={[0, 0, -0.025]}>
          <cylinderGeometry args={[0.015, 0.015, 0.01, 8]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* Frame/apron below drawer */}
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[1.15, 0.08, 0.32]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Decorative center medallion on apron */}
      <mesh position={[0, 0.62, -0.17]}>
        <cylinderGeometry args={[0.05, 0.05, 0.01, 16]} />
        <meshStandardMaterial
          color={brassColor}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Four tapered legs (slender elegant style) */}
      {[
        [-0.52, 0, -0.14],
        [0.52, 0, -0.14],
        [-0.52, 0, 0.14],
        [0.52, 0, 0.14],
      ].map((pos, i) => (
        <group key={`leg-${i}`} position={pos as [number, number, number]}>
          {/* Upper leg section */}
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 0.5, 12]} />
            <meshStandardMaterial color={darkWood} roughness={0.7} />
          </mesh>

          {/* Decorative collar at top */}
          <mesh position={[0, 0.58, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.04, 12]} />
            <meshStandardMaterial
              color={brassColor}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* Lower leg section (more tapered) */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.025, 0.03, 0.1, 12]} />
            <meshStandardMaterial color={darkWood} roughness={0.7} />
          </mesh>

          {/* Brass foot cap */}
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.03, 0.035, 0.02, 12]} />
            <meshStandardMaterial
              color={brassColor}
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}

      {/* Lower shelf (optional display tier) */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1.0, 0.03, 0.28]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Shelf edge trim */}
      <mesh position={[0, 0.14, 0.145]}>
        <boxGeometry args={[1.0, 0.02, 0.02]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>

      {/* Corner brackets connecting legs */}
      {[
        [-0.52, 0.15, -0.14],
        [0.52, 0.15, -0.14],
        [-0.52, 0.15, 0.14],
        [0.52, 0.15, 0.14],
      ].map((pos, i) => (
        <mesh key={`bracket-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
          <meshStandardMaterial color={darkWood} roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
};

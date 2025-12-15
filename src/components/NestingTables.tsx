/**
 * Nesting Tables Set - 1930s Art Deco style (set of 3 tables that nest together)
 * Features stepped heights, geometric design, chrome accents
 */
export const NestingTables = ({
  position,
  rotation = [0, 0, 0],
  spread = false // If true, displays tables separated; if false, nested together
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  spread?: boolean;
}) => {
  const blackLacquer = "#1a1a1a"; // High-gloss black
  const chromeColor = "#c0c0c0"; // Chrome/silver
  const accentGold = "#d4af37"; // Art Deco gold accent

  const createTable = (
    size: number,
    height: number,
    offsetX: number,
    offsetZ: number
  ) => (
    <group position={[offsetX, 0, offsetZ]}>
      {/* Tabletop with beveled edge */}
      <mesh position={[0, height, 0]} castShadow receiveShadow>
        <boxGeometry args={[size, 0.03, size * 0.7]} />
        <meshStandardMaterial
          color={blackLacquer}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Gold accent strip on top */}
      <mesh position={[0, height + 0.016, 0]}>
        <boxGeometry args={[size * 0.9, 0.005, size * 0.6]} />
        <meshStandardMaterial
          color={accentGold}
          metalness={0.85}
          roughness={0.2}
          emissive={accentGold}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Chrome edge frame */}
      {[
        [0, height, (size * 0.7) / 2 + 0.01, [size + 0.02, 0.02, 0.02]],
        [0, height, -(size * 0.7) / 2 - 0.01, [size + 0.02, 0.02, 0.02]],
        [size / 2 + 0.01, height, 0, [0.02, 0.02, size * 0.7 + 0.02]],
        [-size / 2 - 0.01, height, 0, [0.02, 0.02, size * 0.7 + 0.02]],
      ].map((data, i) => {
        const [x, y, z, dims] = data as [number, number, number, number[]];
        return (
          <mesh key={`frame-${i}`} position={[x, y, z]}>
            <boxGeometry args={dims as [number, number, number]} />
            <meshStandardMaterial
              color={chromeColor}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      {/* Four chrome legs with geometric design */}
      {[
        [-size / 2 + 0.08, 0, -(size * 0.7) / 2 + 0.08],
        [size / 2 - 0.08, 0, -(size * 0.7) / 2 + 0.08],
        [-size / 2 + 0.08, 0, (size * 0.7) / 2 - 0.08],
        [size / 2 - 0.08, 0, (size * 0.7) / 2 - 0.08],
      ].map((legPos, i) => (
        <group key={`leg-${i}`} position={legPos as [number, number, number]}>
          {/* Main leg tube */}
          <mesh position={[0, height / 2, 0]}>
            <cylinderGeometry args={[0.015, 0.02, height, 12]} />
            <meshStandardMaterial
              color={chromeColor}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>

          {/* Top connector */}
          <mesh position={[0, height - 0.02, 0]}>
            <boxGeometry args={[0.03, 0.03, 0.03]} />
            <meshStandardMaterial
              color={accentGold}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>

          {/* Base foot */}
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.025, 0.02, 0.02, 12]} />
            <meshStandardMaterial
              color={blackLacquer}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Decorative geometric pattern on front edge */}
      <group position={[0, height - 0.08, (size * 0.7) / 2 + 0.005]}>
        {/* Vertical accent lines */}
        {[-size / 3, 0, size / 3].map((x, i) => (
          <mesh key={`accent-${i}`} position={[x, 0, 0]}>
            <boxGeometry args={[0.008, 0.12, 0.008]} />
            <meshStandardMaterial
              color={accentGold}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );

  return (
    <group position={position} rotation={rotation}>
      {/* Large table */}
      {createTable(
        0.5,
        0.5,
        spread ? -0.35 : 0,
        spread ? 0 : 0
      )}

      {/* Medium table */}
      {createTable(
        0.4,
        0.4,
        spread ? 0 : 0.05,
        spread ? 0 : 0.05
      )}

      {/* Small table */}
      {createTable(
        0.3,
        0.3,
        spread ? 0.35 : 0.1,
        spread ? 0 : 0.1
      )}
    </group>
  );
};

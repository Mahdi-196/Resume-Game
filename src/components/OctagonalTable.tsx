/**
 * Octagonal Accent Table - 1930s Victorian with inlay work
 * Features octagonal top with decorative veneer pattern, carved base
 */
export const OctagonalTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const darkWood = "#2a1810"; // Dark mahogany
  const richWood = "#3d2817"; // Rich brown
  const lightWood = "#8b6f47"; // Light walnut for inlay
  const brassColor = "#b8860b"; // Polished brass

  return (
    <group position={position} rotation={rotation}>
      {/* Octagonal tabletop */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.04, 8]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Top edge trim (octagonal) */}
      <mesh position={[0, 0.64, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.02, 8]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>

      {/* Light wood inlay pattern - octagonal star */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.sin(angle) * 0.25;
        const z = Math.cos(angle) * 0.25;
        return (
          <group key={`inlay-${i}`} rotation={[0, angle, 0]}>
            {/* Radial inlay strip */}
            <mesh position={[0, 0.67, 0.15]}>
              <boxGeometry args={[0.015, 0.002, 0.3]} />
              <meshStandardMaterial
                color={lightWood}
                roughness={0.5}
                metalness={0.05}
              />
            </mesh>
          </group>
        );
      })}

      {/* Center medallion */}
      <mesh position={[0, 0.671, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.003, 8]} />
        <meshStandardMaterial
          color={lightWood}
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Brass center accent */}
      <mesh position={[0, 0.672, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.002, 16]} />
        <meshStandardMaterial
          color={brassColor}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Decorative corner brass details */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const x = Math.sin(angle) * 0.4;
        const z = Math.cos(angle) * 0.4;
        return (
          <mesh key={`corner-${i}`} position={[x, 0.67, z]}>
            <cylinderGeometry args={[0.012, 0.012, 0.002, 8]} />
            <meshStandardMaterial
              color={brassColor}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      {/* Upper column section */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.15, 8]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Decorative carved band */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.09, 0.015, 12, 8]} />
        <meshStandardMaterial color={darkWood} roughness={0.75} />
      </mesh>

      {/* Middle column with octagonal cross-section */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.3, 8]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>

      {/* Carved details on middle column */}
      {[0.15, 0, -0.15].map((y, i) => (
        <mesh key={`band-${i}`} position={[0, y + 0.25, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.02, 8]} />
          <meshStandardMaterial color={richWood} roughness={0.72} />
        </mesh>
      ))}

      {/* Lower base section (wider, stable) */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.2, 0.08, 0.06, 8]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Base platform */}
      <mesh position={[0, 0.025, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 8]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>

      {/* Eight small feet at base corners */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const x = Math.sin(angle) * 0.2;
        const z = Math.cos(angle) * 0.2;
        return (
          <group key={`foot-${i}`} position={[x, 0.015, z]}>
            {/* Small wooden foot */}
            <mesh>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshStandardMaterial color={darkWood} roughness={0.75} />
            </mesh>

            {/* Brass cap on foot */}
            <mesh position={[0, -0.01, 0]}>
              <cylinderGeometry args={[0.015, 0.02, 0.01, 12]} />
              <meshStandardMaterial
                color={brassColor}
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>
          </group>
        );
      })}

      {/* Decorative brass rings on column */}
      {[0.37, 0.13].map((y, i) => (
        <mesh key={`ring-${i}`} position={[0, y, 0]}>
          <torusGeometry args={[0.08, 0.008, 12, 8]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* Top brass finial */}
      <mesh position={[0, 0.63, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial
          color={brassColor}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

/**
 * Wooden End Table - Solid wood side/end table
 * Features simple rectangular design, single drawer, sturdy construction
 */
export const WoodenEndTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const darkWood = "#2a1810"; // Dark mahogany
  const richWood = "#3d2817"; // Rich brown
  const brassColor = "#b8860b"; // Polished brass

  return (
    <group position={position} rotation={rotation}>
      {/* Rectangular tabletop */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.05, 0.5]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Top edge molding */}
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.72, 0.03, 0.52]} />
        <meshStandardMaterial color={richWood} roughness={0.7} />
      </mesh>

      {/* Drawer */}
      <group position={[0, 0.45, -0.22]}>
        {/* Drawer front */}
        <mesh>
          <boxGeometry args={[0.55, 0.12, 0.03]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>

        {/* Drawer panel */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.5, 0.1, 0.01]} />
          <meshStandardMaterial color={richWood} roughness={0.65} />
        </mesh>

        {/* Brass drawer pull */}
        <mesh position={[0, 0, -0.015]}>
          <cylinderGeometry args={[0.012, 0.012, 0.04, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* Table body/frame */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.65, 0.15, 0.45]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>

      {/* Four legs */}
      {[
        [-0.3, 0, -0.2],
        [0.3, 0, -0.2],
        [-0.3, 0, 0.2],
        [0.3, 0, 0.2],
      ].map((pos, i) => (
        <group key={`leg-${i}`} position={pos as [number, number, number]}>
          {/* Main leg - slightly tapered */}
          <mesh position={[0, 0.19, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.04, 0.38, 12]} />
            <meshStandardMaterial color={darkWood} roughness={0.7} />
          </mesh>

          {/* Bottom foot */}
          <mesh position={[0, 0.015, 0]}>
            <cylinderGeometry args={[0.045, 0.04, 0.03, 12]} />
            <meshStandardMaterial color={richWood} roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Lower shelf */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.03, 0.4]} />
        <meshStandardMaterial color={richWood} roughness={0.65} />
      </mesh>
    </group>
  );
};

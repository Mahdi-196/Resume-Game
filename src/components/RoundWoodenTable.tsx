/**
 * Round Wooden Table - Large circular table with thick pedestal base
 * Features solid wood round top, central column support
 */
export const RoundWoodenTable = ({
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
      {/* Large round tabletop */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Edge trim around top */}
      <mesh position={[0, 0.52, 0]}>
        <torusGeometry args={[1.2, 0.04, 16, 32]} />
        <meshStandardMaterial color={richWood} roughness={0.75} />
      </mesh>

      {/* Decorative wood rings on top */}
      {[0.8, 0.5, 0.2].map((radius, i) => (
        <mesh key={`ring-${i}`} position={[0, 0.551, 0]}>
          <torusGeometry args={[radius, 0.008, 12, 32]} />
          <meshStandardMaterial color={richWood} roughness={0.8} />
        </mesh>
      ))}

      {/* Central pedestal column */}
      <group position={[0, 0.27, 0]}>
        {/* Top collar */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.25, 0.2, 0.08, 16]} />
          <meshStandardMaterial color={richWood} roughness={0.75} />
        </mesh>

        {/* Main column */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
          <meshStandardMaterial color={darkWood} roughness={0.75} />
        </mesh>

        {/* Decorative bands on column */}
        {[0.22, 0.1, -0.02].map((y, i) => (
          <mesh key={`band-${i}`} position={[0, y, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.03, 16]} />
            <meshStandardMaterial color={richWood} roughness={0.8} />
          </mesh>
        ))}

        {/* Lower column section (widens) */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.25, 0.2, 0.16, 16]} />
          <meshStandardMaterial color={richWood} roughness={0.75} />
        </mesh>

        {/* Bottom collar */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.3, 0.25, 0.06, 16]} />
          <meshStandardMaterial color={darkWood} roughness={0.75} />
        </mesh>
      </group>

      {/* Four curved feet extending from base */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const endX = Math.sin(angle) * 0.9;
        const endZ = Math.cos(angle) * 0.9;

        return (
          <group key={`foot-${i}`} rotation={[0, angle, 0]}>
            {/* Curved foot extending outward */}
            <mesh position={[0.45, 0.06, 0]} rotation={[0, 0, -0.15]}>
              <boxGeometry args={[0.8, 0.12, 0.15]} />
              <meshStandardMaterial color={richWood} roughness={0.75} />
            </mesh>

            {/* Foot end cap */}
            <mesh position={[0.82, 0.03, 0]}>
              <boxGeometry args={[0.12, 0.06, 0.18]} />
              <meshStandardMaterial color={darkWood} roughness={0.8} />
            </mesh>
          </group>
        );
      })}

      {/* Center base disc */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.08, 16]} />
        <meshStandardMaterial color={darkWood} roughness={0.75} />
      </mesh>
    </group>
  );
};

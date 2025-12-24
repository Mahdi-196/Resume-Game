/**
 * Coffee Table Items - 1930s Film Noir themed decorative objects
 * Features whiskey decanter, crystal glasses, ashtray, case files
 */
export const CoffeeTableItems = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const glassColor = "#e8f4f8"; // Crystal glass
  const whiskyColor = "#d4a574"; // Amber whisky
  const paperColor = "#f4e8d0"; // Aged paper
  const ashColor = "#3a3a3a"; // Dark gray ashtray
  const brassColor = "#b8860b"; // Brass
  const leatherBrown = "#654321"; // Leather binding

  return (
    <group position={position} rotation={rotation}>
      {/* Crystal Whiskey Decanter - Center */}
      <group position={[0, 0.49, 0]}>
        {/* Decanter base - Optimized material */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 0.1, 8]} />
          <meshStandardMaterial
            color="#d4e8f0"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>

        {/* Decanter body - Optimized material */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 8]} />
          <meshStandardMaterial
            color="#d4e8f0"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>

        {/* Whisky liquid inside */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.08, 8]} />
          <meshStandardMaterial
            color="#c89850"
            transparent
            opacity={0.95}
            roughness={0.2}
            emissive="#c89850"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Decanter neck - Optimized material */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.08, 8]} />
          <meshStandardMaterial
            color="#d4e8f0"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>

        {/* Crystal stopper - Optimized material */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.04, 0.025, 0.06, 8]} />
          <meshStandardMaterial
            color="#d4e8f0"
            transparent
            opacity={0.65}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};

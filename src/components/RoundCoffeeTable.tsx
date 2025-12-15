/**
 * Round Coffee Table - 1930s Victorian style with carved pedestal base
 * Features round marble-effect top, ornate center column, claw feet
 */
export const RoundCoffeeTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const darkWood = "#2a1810"; // Dark mahogany
  const richWood = "#3d2817"; // Rich brown
  const brassColor = "#b8860b"; // Polished brass
  const marbleTop = "#e8dcc0"; // Cream marble effect

  return (
    <group position={position} rotation={rotation}>
      {/* Round marble-effect tabletop */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.04, 32]} />
        <meshStandardMaterial
          color={marbleTop}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      {/* Brass edge trim around top */}
      <mesh position={[0, 0.49, 0]}>
        <torusGeometry args={[0.6, 0.015, 16, 32]} />
        <meshStandardMaterial
          color={brassColor}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Decorative inlay pattern on top */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.sin(angle) * 0.35;
        const z = Math.cos(angle) * 0.35;
        return (
          <mesh key={`inlay-${i}`} position={[x, 0.52, z]}>
            <cylinderGeometry args={[0.015, 0.015, 0.005, 8]} />
            <meshStandardMaterial
              color={brassColor}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      {/* Central pedestal column - ornate Victorian */}
      <group position={[0, 0.25, 0]}>
        {/* Top collar */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.12, 0.08, 0.06, 16]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>

        {/* Main column with carved details */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.24, 16]} />
          <meshStandardMaterial color={richWood} roughness={0.65} />
        </mesh>

        {/* Carved rings on column */}
        {[0.15, 0.05, -0.05].map((y, i) => (
          <mesh key={`ring-${i}`} position={[0, y, 0]}>
            <torusGeometry args={[0.09, 0.012, 12, 16]} />
            <meshStandardMaterial color={darkWood} roughness={0.75} />
          </mesh>
        ))}

        {/* Middle bulge (turned wood effect) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>

        {/* Lower column section */}
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.24, 16]} />
          <meshStandardMaterial color={richWood} roughness={0.65} />
        </mesh>

        {/* Bottom collar */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.13, 0.12, 0.04, 16]} />
          <meshStandardMaterial color={darkWood} roughness={0.7} />
        </mesh>
      </group>

      {/* Four curved legs extending from base (cabriole style) */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const baseX = Math.sin(angle) * 0.1;
        const baseZ = Math.cos(angle) * 0.1;
        const endX = Math.sin(angle) * 0.45;
        const endZ = Math.cos(angle) * 0.45;

        return (
          <group key={`leg-${i}`} rotation={[0, angle, 0]}>
            {/* Upper leg curve */}
            <mesh position={[0.1, 0.08, 0]} rotation={[0, 0, -0.3]}>
              <cylinderGeometry args={[0.04, 0.05, 0.15, 12]} />
              <meshStandardMaterial color={darkWood} roughness={0.7} />
            </mesh>

            {/* Knee joint */}
            <mesh position={[0.22, 0.06, 0]}>
              <sphereGeometry args={[0.055, 12, 12]} />
              <meshStandardMaterial color={darkWood} roughness={0.7} />
            </mesh>

            {/* Lower leg curve */}
            <mesh position={[0.33, 0.03, 0]} rotation={[0, 0, 0.2]}>
              <cylinderGeometry args={[0.04, 0.03, 0.12, 12]} />
              <meshStandardMaterial color={darkWood} roughness={0.7} />
            </mesh>

            {/* Claw foot */}
            <mesh position={[0.42, 0.015, 0]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial color={darkWood} roughness={0.75} />
            </mesh>

            {/* Brass ball under foot */}
            <mesh position={[0.45, 0.01, 0]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial
                color={brassColor}
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>
          </group>
        );
      })}

      {/* Brass finial on top of pedestal */}
      <mesh position={[0, 0.48, 0]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial
          color={brassColor}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

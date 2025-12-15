/**
 * Smoking Table - 1930s gentleman's side table with circular top
 * Features ashtray indent, magazine rack, art deco styling
 */
export const SmokingTable = ({
  position,
  rotation = [0, 0, 0]
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const darkWood = "#2a1810"; // Dark mahogany
  const richWood = "#3d2817"; // Rich brown
  const chromeColor = "#c0c0c0"; // Chrome/silver
  const brassColor = "#b8860b"; // Polished brass
  const glassColor = "#e8f4f8"; // Glass insert tint

  return (
    <group position={position} rotation={rotation}>
      {/* Round tabletop */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.04, 32]} />
        <meshStandardMaterial
          color={darkWood}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Chrome edge ring */}
      <mesh position={[0, 0.6, 0]}>
        <torusGeometry args={[0.35, 0.012, 16, 32]} />
        <meshStandardMaterial
          color={chromeColor}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Glass ashtray insert (recessed) */}
      <mesh position={[0, 0.605, 0]}>
        <cylinderGeometry args={[0.15, 0.13, 0.025, 32]} />
        <meshStandardMaterial
          color={glassColor}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Ashtray rim */}
      <mesh position={[0, 0.615, 0]}>
        <torusGeometry args={[0.15, 0.008, 12, 32]} />
        <meshStandardMaterial
          color={chromeColor}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Four cigarette rests on rim */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.sin(angle) * 0.15;
        const z = Math.cos(angle) * 0.15;
        return (
          <mesh
            key={`rest-${i}`}
            position={[x, 0.62, z]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.025, 0.008, 0.05]} />
            <meshStandardMaterial
              color={chromeColor}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      {/* Decorative brass inlay around edge */}
      <mesh position={[0, 0.621, 0]}>
        <torusGeometry args={[0.28, 0.005, 12, 32]} />
        <meshStandardMaterial
          color={brassColor}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Upper shelf ring */}
      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[0.25, 0.015, 16, 32]} />
        <meshStandardMaterial color={darkWood} roughness={0.7} />
      </mesh>

      {/* Three chrome legs (Art Deco tripod design) */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2 + Math.PI / 6;
        const baseX = Math.sin(angle) * 0.28;
        const baseZ = Math.cos(angle) * 0.28;

        return (
          <group key={`leg-${i}`} rotation={[0, angle, 0]}>
            {/* Upper leg section (slight outward angle) */}
            <mesh position={[0.12, 0.35, 0]} rotation={[0, 0, -0.15]}>
              <cylinderGeometry args={[0.018, 0.025, 0.4, 16]} />
              <meshStandardMaterial
                color={chromeColor}
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>

            {/* Lower leg section */}
            <mesh position={[0.24, 0.12, 0]} rotation={[0, 0, 0.1]}>
              <cylinderGeometry args={[0.02, 0.018, 0.24, 16]} />
              <meshStandardMaterial
                color={chromeColor}
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>

            {/* Brass connector joint */}
            <mesh position={[0.18, 0.24, 0]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial
                color={brassColor}
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>

            {/* Top mounting bracket */}
            <mesh position={[0.06, 0.53, 0]}>
              <boxGeometry args={[0.04, 0.04, 0.04]} />
              <meshStandardMaterial
                color={brassColor}
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>

            {/* Circular foot pad */}
            <mesh position={[0.3, 0.01, 0]}>
              <cylinderGeometry args={[0.035, 0.03, 0.02, 16]} />
              <meshStandardMaterial
                color={darkWood}
                roughness={0.7}
              />
            </mesh>

            {/* Rubber/brass foot tip */}
            <mesh position={[0.3, 0.005, 0]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial
                color={brassColor}
                metalness={0.85}
                roughness={0.3}
              />
            </mesh>
          </group>
        );
      })}

      {/* Lower magazine/newspaper rack (curved metal) */}
      <group position={[0, 0.15, 0]}>
        {/* Bottom panel */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.02, 32]} />
          <meshStandardMaterial
            color={chromeColor}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Side rails (curved) */}
        {[0, Math.PI].map((angle, i) => (
          <mesh
            key={`rail-${i}`}
            position={[Math.sin(angle) * 0.2, 0.08, Math.cos(angle) * 0.2]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.015, 0.15, 0.4]} />
            <meshStandardMaterial
              color={chromeColor}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Front/back end caps */}
        {[Math.PI / 2, -Math.PI / 2].map((angle, i) => (
          <mesh
            key={`cap-${i}`}
            position={[Math.sin(angle) * 0.2, 0.08, Math.cos(angle) * 0.2]}
            rotation={[0, angle + Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.015, 0.15, 0.015]} />
            <meshStandardMaterial
              color={chromeColor}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Decorative Art Deco sunburst pattern on top */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.sin(angle) * 0.22;
        const z = Math.cos(angle) * 0.22;
        return (
          <mesh
            key={`ray-${i}`}
            position={[x, 0.622, z]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.003, 0.001, 0.06]} />
            <meshStandardMaterial
              color={brassColor}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

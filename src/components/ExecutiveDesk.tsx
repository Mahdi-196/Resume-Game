// Executive Desk Component - Cleared
export const ExecutiveDesk = ({ onInteraction }: { onInteraction: (type: string) => void }) => {
  return (
    <group position={[0, 0, -4.5]} rotation={[0, Math.PI, 0]}>
      {/* Desk Surface */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#3d2817" roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Desk Legs */}
      <mesh position={[-1.8, 0.5, -0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[1.8, 0.5, -0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[-1.8, 0.5, 0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[1.8, 0.5, 0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>

      {/* Classic 1930s Pyramid Rotary Telephone */}
      <group position={[-1.2, 1.06, 0.1]} rotation={[0, Math.PI/4, 0]} scale={2.5}>
        {/* Main pyramid body - single smooth shape */}
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.11, 0.15, 0.12, 32]} />
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={0.2}
            metalness={0.6}
            envMapIntensity={1}
          />
        </mesh>

        {/* Base trim ring */}
        <mesh position={[0, 0.005, 0]}>
          <cylinderGeometry args={[0.155, 0.155, 0.01, 32]} />
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>

        {/* Top platform - flat surface */}
        <mesh position={[0, 0.125, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.005, 32]} />
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>

        {/* Rotary dial on front face - angled outward */}
        <group position={[0, 0.07, 0.13]} rotation={[Math.PI/5, 0, 0]}>
          {/* Dial outer rim - black */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.008, 32]} />
            <meshStandardMaterial
              color="#0f0f0f"
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>

          {/* White/silver dial plate */}
          <mesh position={[0, 0.005, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.001, 32]} />
            <meshStandardMaterial
              color="#e8e8e8"
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>

          {/* Center label area with metallic finish */}
          <mesh position={[0, 0.006, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.001, 24]} />
            <meshStandardMaterial
              color="#c0c0c0"
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          {/* Finger holes - cleaner and smaller */}
          {[...Array(10)].map((_, i) => {
            const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
            const radius = 0.032;
            return (
              <mesh
                key={`hole-${i}`}
                position={[
                  Math.sin(angle) * radius,
                  0.005,
                  Math.cos(angle) * radius
                ]}
              >
                <cylinderGeometry args={[0.004, 0.004, 0.002, 12]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
              </mesh>
            );
          })}
        </group>

        {/* Bell housing domes - metal bells under the cradle */}
        <mesh position={[-0.04, 0.128, 0]} castShadow>
          <sphereGeometry args={[0.015, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>

        <mesh position={[0.04, 0.128, 0]} castShadow>
          <sphereGeometry args={[0.015, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>

        {/* Handset cradle fork arms */}
        <mesh position={[-0.04, 0.133, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.015, 12]} />
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        <mesh position={[0.04, 0.133, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.015, 12]} />
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>

        {/* Handset sitting on cradle - clearly visible on top */}
        <group position={[0, 0.155, 0]}>
          {/* Main handset body - smooth curved handle */}
          <mesh rotation={[0, Math.PI/2, 0]} castShadow>
            <capsuleGeometry args={[0.014, 0.1, 10, 20]} />
            <meshStandardMaterial
              color="#0f0f0f"
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>

          {/* Left earpiece bell - FACING DOWN (wide end up, narrow down) */}
          <mesh position={[-0.055, 0, 0]} rotation={[-Math.PI/2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.018, 0.022, 20]} />
            <meshStandardMaterial
              color="#0f0f0f"
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>

          {/* Left speaker grille at BOTTOM of bell (facing down) */}
          <mesh position={[-0.055, -0.012, 0]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.001, 16]} />
            <meshStandardMaterial
              color="#4a4a4a"
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>

          {/* Right mouthpiece bell - FACING DOWN (wide end up, narrow down) */}
          <mesh position={[0.055, 0, 0]} rotation={[-Math.PI/2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.018, 0.022, 20]} />
            <meshStandardMaterial
              color="#0f0f0f"
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>

          {/* Right speaker grille at BOTTOM of bell (facing down) */}
          <mesh position={[0.055, -0.012, 0]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.001, 16]} />
            <meshStandardMaterial
              color="#4a4a4a"
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        </group>

        {/* Coiled telephone cord - cleaner coils */}
        <group position={[-0.07, 0.03, -0.09]}>
          {[...Array(12)].map((_, i) => (
            <mesh
              key={`cord-${i}`}
              position={[
                -i * 0.008,
                -i * 0.005,
                -i * 0.007
              ]}
              rotation={[Math.PI/4, i * 0.35, 0]}
            >
              <torusGeometry args={[0.007, 0.002, 8, 12]} />
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.6}
                metalness={0.1}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};
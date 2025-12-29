
interface VictorianDoorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  onInteraction?: (type: string, data?: unknown) => void;
}

export const VictorianDoor = ({
  position,
  rotation = [0, 0, 0],
  onInteraction
}: VictorianDoorProps) => {
  // Door is now non-interactive (always closed)
  const doorAngle = 0;

  return (
    <group position={position} rotation={rotation}>
      {/* Door Frame */}
      <group>
        {/* Left Frame */}
        <mesh position={[-1.1, 2.5, 0]} frustumCulled>
          <boxGeometry args={[0.2, 5, 0.3]} />
          <meshStandardMaterial color="#4a3728" roughness={0.8} />
        </mesh>

        {/* Right Frame */}
        <mesh position={[1.1, 2.5, 0]} frustumCulled>
          <boxGeometry args={[0.2, 5, 0.3]} />
          <meshStandardMaterial color="#4a3728" roughness={0.8} />
        </mesh>

        {/* Top Frame */}
        <mesh position={[0, 5.1, 0]} frustumCulled>
          <boxGeometry args={[2.4, 0.2, 0.3]} />
          <meshStandardMaterial color="#4a3728" roughness={0.8} />
        </mesh>

        {/* Bottom Frame/Threshold */}
        <mesh position={[0, 0.1, 0]} frustumCulled>
          <boxGeometry args={[2.4, 0.2, 0.3]} />
          <meshStandardMaterial color="#4a3728" roughness={0.8} />
        </mesh>
      </group>

      {/* Door Panel (pivots around left edge) */}
      <group position={[-1, 0, 0]} rotation={[0, doorAngle, 0]}>
        <group position={[1, 0, 0]}>
          {/* Main Door Panel - Non-interactive */}
          <mesh position={[0, 2.5, 0]} frustumCulled>
            <boxGeometry args={[2, 4.8, 0.1]} />
            <meshStandardMaterial color="#654321" roughness={0.7} />
          </mesh>

          {/* Door Panels - Victorian Style */}
          {/* Upper Panel */}
          <mesh position={[0, 3.5, 0.06]} frustumCulled>
            <boxGeometry args={[1.6, 1.4, 0.02]} />
            <meshStandardMaterial color="#5a3a1f" roughness={0.8} />
          </mesh>

          {/* Lower Panel */}
          <mesh position={[0, 1.5, 0.06]} frustumCulled>
            <boxGeometry args={[1.6, 1.4, 0.02]} />
            <meshStandardMaterial color="#5a3a1f" roughness={0.8} />
          </mesh>

          {/* Frosted Glass Panel - Upper */}
          <mesh position={[0, 3.5, 0.08]} frustumCulled>
            <boxGeometry args={[1.2, 1, 0.01]} />
            <meshStandardMaterial
              color="#e6f3ff"
              transparent
              opacity={0.6}
              roughness={0.1}
            />
          </mesh>

          {/* Glass Frame - Vertical */}
          <mesh position={[0, 3.5, 0.09]} frustumCulled>
            <boxGeometry args={[0.02, 1.2, 0.01]} />
            <meshStandardMaterial color="#4a3728" />
          </mesh>

          {/* Glass Frame - Horizontal */}
          <mesh position={[0, 3.5, 0.09]} frustumCulled>
            <boxGeometry args={[1.4, 0.02, 0.01]} />
            <meshStandardMaterial color="#4a3728" />
          </mesh>

          {/* Door Handle */}
          <mesh position={[0.8, 2.5, 0.15]} frustumCulled>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Handle Base */}
          <mesh position={[0.8, 2.5, 0.1]} frustumCulled>
            <cylinderGeometry args={[0.03, 0.03, 0.08, 6]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Keyhole */}
          <mesh position={[0.8, 2.3, 0.12]} frustumCulled>
            <cylinderGeometry args={[0.01, 0.01, 0.02, 6]} />
            <meshStandardMaterial color="#2a1810" />
          </mesh>


          {/* Door Hinges */}
          <mesh position={[-0.95, 3.5, 0.05]} frustumCulled>
            <boxGeometry args={[0.1, 0.3, 0.12]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.4} />
          </mesh>

          <mesh position={[-0.95, 1.5, 0.05]} frustumCulled>
            <boxGeometry args={[0.1, 0.3, 0.12]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
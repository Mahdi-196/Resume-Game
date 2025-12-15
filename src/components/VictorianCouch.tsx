interface VictorianCouchProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const VictorianCouch = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: VictorianCouchProps) => {
  // Rich Victorian color palette
  const velvetColor = '#5a1a1a'; // Deep burgundy velvet
  const woodColor = '#1a0f0a'; // Very dark wood
  const cushionColor = '#4a1515'; // Slightly lighter burgundy for depth

  return (
    <group position={position} rotation={rotation}>
      {/* Wooden base frame */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.15, 1.1]} />
        <meshStandardMaterial
          color={woodColor}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Main sofa body - lower section */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.3, 0.95]} />
        <meshStandardMaterial
          color={velvetColor}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Seat platform */}
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.9, 0.18, 0.9]} />
        <meshStandardMaterial
          color={velvetColor}
          roughness={0.88}
          metalness={0.0}
        />
      </mesh>

      {/* Backrest main body - solid and substantial */}
      <mesh position={[0, 1.15, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[2.9, 1.0, 0.25]} />
        <meshStandardMaterial
          color={velvetColor}
          roughness={0.88}
          metalness={0.0}
        />
      </mesh>

      {/* Backrest padding layer */}
      <mesh position={[0, 1.15, -0.28]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.92, 0.12]} />
        <meshStandardMaterial
          color={cushionColor}
          roughness={0.92}
          metalness={0.0}
        />
      </mesh>

      {/* Backrest top rail - rounded Victorian style */}
      <mesh position={[0, 1.68, -0.35]} castShadow rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.08, 2.85, 12, 24]} />
        <meshStandardMaterial
          color={woodColor}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Left armrest */}
      <group position={[-1.5, 0.75, 0]}>
        {/* Arm main body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.6, 0.95]} />
          <meshStandardMaterial
            color={velvetColor}
            roughness={0.88}
            metalness={0.0}
          />
        </mesh>
        {/* Wooden arm cap */}
        <mesh position={[0, 0.45, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.06, 0.7, 10, 20]} />
          <meshStandardMaterial
            color={woodColor}
            roughness={0.3}
            metalness={0.25}
          />
        </mesh>
      </group>

      {/* Right armrest */}
      <group position={[1.5, 0.75, 0]}>
        {/* Arm main body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.6, 0.95]} />
          <meshStandardMaterial
            color={velvetColor}
            roughness={0.88}
            metalness={0.0}
          />
        </mesh>
        {/* Wooden arm cap */}
        <mesh position={[0, 0.45, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.06, 0.7, 10, 20]} />
          <meshStandardMaterial
            color={woodColor}
            roughness={0.3}
            metalness={0.25}
          />
        </mesh>
      </group>

      {/* Victorian wooden legs - front left */}
      <group position={[-1.35, 0.1, 0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Front right */}
      <group position={[1.35, 0.1, 0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Back left */}
      <group position={[-1.35, 0.1, -0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Back right */}
      <group position={[1.35, 0.1, -0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.35, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Button tufting on backrest - subtle detail */}
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <group key={`button-${i}`}>
          <mesh position={[x, 0.95, -0.23]} castShadow>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial
              color={woodColor}
              roughness={0.4}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[x, 1.35, -0.23]} castShadow>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial
              color={woodColor}
              roughness={0.4}
              metalness={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

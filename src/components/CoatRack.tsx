interface CoatRackProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// Victorian Coat Rack with Fedora Hat
export const CoatRack = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: CoatRackProps) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Base - circular weighted base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.1]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Central post - tall dark wood pole */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 1.9]} />
        <meshStandardMaterial color="#3d2817" roughness={0.7} />
      </mesh>

      {/* Decorative cap on top */}
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#4a3728" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Hook 1 - Front */}
      <group position={[0, 1.7, 0]} rotation={[0, 0, 0]}>
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25]} />
          <meshStandardMaterial color="#2a1810" roughness={0.7} />
        </mesh>
        {/* Hook tip curve */}
        <mesh position={[0.25, -0.05, 0]}>
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial color="#2a1810" roughness={0.7} />
        </mesh>
      </group>

      {/* Hook 2 - Right */}
      <group position={[0, 1.7, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25]} />
          <meshStandardMaterial color="#2a1810" roughness={0.7} />
        </mesh>
        <mesh position={[0.25, -0.05, 0]}>
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial color="#2a1810" roughness={0.7} />
        </mesh>
      </group>

      {/* Hook 3 - Back */}
      <group position={[0, 1.7, 0]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25]} />
          <meshStandardMaterial color="#2a1810" roughness={0.7} />
        </mesh>
        <mesh position={[0.25, -0.05, 0]}>
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial color="#2a1810" roughness={0.7} />
        </mesh>
      </group>

      {/* Hook 4 - Left */}
      <group position={[0, 1.7, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25]} />
          <meshStandardMaterial color="#2a1810" roughness={0.7} />
        </mesh>
        <mesh position={[0.25, -0.05, 0]}>
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial color="#2a1810" roughness={0.7} />
        </mesh>
      </group>

      {/* Fedora Hat on front hook - iconic noir element */}
      <group position={[0.28, 1.72, 0]} rotation={[0, 0.1, -0.1]}>
        {/* Hat crown */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Hat brim */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Hat band */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.125, 0.125, 0.02]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.6} />
        </mesh>
        {/* Hat top */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.11, 0.12, 0.01]} />
          <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
};

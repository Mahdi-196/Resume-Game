interface VictorianChandelierProps {
  position: [number, number, number];
  isLit?: boolean;
}

export const VictorianChandelier = ({ 
  position, 
  isLit = true 
}: VictorianChandelierProps) => {
  return (
    <group position={position}>
      {/* Main chandelier body */}
      <group position={[0, -0.5, 0]}>
        {/* Central brass column - Further reduced segments */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.225, 0.225, 1.8, 8]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Ornate top cap - Further reduced segments */}
        <mesh position={[0, 1.05, 0]}>
          <sphereGeometry args={[0.3, 12, 10]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Decorative ring - Further reduced segments */}
        <mesh position={[0, 0.3, 0]}>
          <torusGeometry args={[0.375, 0.06, 8, 12]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Bottom ornamental piece - Further reduced segments */}
        <mesh position={[0, -1.2, 0]}>
          <coneGeometry args={[0.18, 0.45, 8]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Arms extending outward for candles - Reduced to 4 arms for performance */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            {/* Curved arm - Reduced segments */}
            <mesh position={[0.75, -0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.045, 0.045, 0.9, 6]} />
              <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Candle holder - Reduced segments */}
            <mesh position={[1.2, 0.15, 0]}>
              <cylinderGeometry args={[0.075, 0.06, 0.24, 6]} />
              <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Candle - Reduced segments */}
            <mesh position={[1.2, 0.45, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.36, 6]} />
              <meshStandardMaterial color="#fffacd" roughness={0.6} />
            </mesh>

            {/* Flame (when lit) - Reduced segments */}
            {isLit && (
              <mesh position={[1.2, 0.69, 0]}>
                <coneGeometry args={[0.024, 0.12, 4]} />
                <meshBasicMaterial color="#ff6b00" />
              </mesh>
            )}

            {/* Single crystal drop per arm */}
            <mesh position={[1.2, -0.12, 0]}>
              <octahedronGeometry args={[0.055]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.9}
                roughness={0.1}
                metalness={0.1}
              />
            </mesh>
          </group>
        ))}

        {/* Optimized hanging crystal strands - Reduced to 4 strands, 1 crystal each */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <group key={`crystal-${i}`} rotation={[0, angle, 0]}>
            {/* Single crystal per strand */}
            <mesh position={[0.36, -0.6, 0]}>
              <octahedronGeometry args={[0.035]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.8}
                roughness={0.1}
                metalness={0.1}
              />
            </mesh>
          </group>
        ))}

        {/* Central hanging crystal - 1.5x original size */}
        <mesh position={[0, -1.8, 0]}>
          <octahedronGeometry args={[0.12]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.9} 
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Ceiling chain/mounting - Further reduced to 5 links */}
      <group position={[0, 3.75, 0]}>
        {/* Optimized chain links - Minimal count for performance */}
        {[0, 0.5, 1.0, 1.5, 2.0].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, i % 2 * Math.PI / 2]}>
            <torusGeometry args={[0.045, 0.012, 6, 10]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Ceiling mounting plate - Further reduced segments */}
        <mesh position={[0, 2.4, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 8]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Decorative ceiling medallion - Further reduced segments */}
        <mesh position={[0, 2.475, 0]}>
          <cylinderGeometry args={[0.225, 0.225, 0.03, 12]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Ornate ceiling details - Further reduced segments */}
        <mesh position={[0, 2.505, 0]}>
          <torusGeometry args={[0.18, 0.0225, 8, 12]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Single center light for chandelier */}
      {isLit && (
        <>
          {/* Single central light */}
          <pointLight
            position={[0, -2.4, 0]}
            color="#ffcc77"
            intensity={18.0}
            distance={35}
            decay={1.5}
          />
        </>
      )}
    </group>
  );
};
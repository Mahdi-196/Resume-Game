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
        {/* Central brass column - Optimized segments */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.225, 0.225, 1.8, 12]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Ornate top cap - Optimized segments */}
        <mesh position={[0, 1.05, 0]}>
          <sphereGeometry args={[0.3, 16, 12]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Decorative ring - Optimized segments */}
        <mesh position={[0, 0.3, 0]}>
          <torusGeometry args={[0.375, 0.06, 12, 16]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Bottom ornamental piece - Optimized segments */}
        <mesh position={[0, -1.2, 0]}>
          <coneGeometry args={[0.18, 0.45, 12]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Arms extending outward for candles - Optimized segments */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            {/* Curved arm - Optimized segments */}
            <mesh position={[0.75, -0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.045, 0.045, 0.9, 8]} />
              <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Candle holder - Optimized segments */}
            <mesh position={[1.2, 0.15, 0]}>
              <cylinderGeometry args={[0.075, 0.06, 0.24, 8]} />
              <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Candle - Optimized segments */}
            <mesh position={[1.2, 0.45, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.36, 8]} />
              <meshStandardMaterial color="#fffacd" roughness={0.6} />
            </mesh>

            {/* Flame (when lit) - Optimized segments */}
            {isLit && (
              <mesh position={[1.2, 0.69, 0]}>
                <coneGeometry args={[0.024, 0.12, 6]} />
                <meshBasicMaterial color="#ff6b00" />
              </mesh>
            )}

            {/* Wax drips - Optimized segments */}
            <mesh position={[1.2, 0.27, 0]}>
              <coneGeometry args={[0.015, 0.06, 6]} />
              <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
            </mesh>

            {/* Crystal drops - 1.5x original size */}
            <mesh position={[1.05, -0.15, 0]}>
              <octahedronGeometry args={[0.06]} />
              <meshStandardMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.9} 
                roughness={0.1}
                metalness={0.1}
              />
            </mesh>

            <mesh position={[1.35, -0.09, 0]}>
              <octahedronGeometry args={[0.045]} />
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

        {/* Optimized hanging crystal strands - Reduced from 8 to 4 strands, 2 crystals each */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <group key={`crystal-${i}`} rotation={[0, angle, 0]}>
            {/* Crystal strand - Reduced complexity */}
            {[0, -0.36].map((yOffset, j) => (
              <mesh key={j} position={[0.36, yOffset - 0.6, 0]}>
                <octahedronGeometry args={[0.03 + j * 0.01]} />
                <meshStandardMaterial
                  color="#ffffff"
                  transparent
                  opacity={0.8}
                  roughness={0.1}
                  metalness={0.1}
                />
              </mesh>
            ))}
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

      {/* Ceiling chain/mounting - Optimized from 16 to 8 links */}
      <group position={[0, 3.75, 0]}>
        {/* Optimized chain links - Reduced count for performance */}
        {[0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, i % 2 * Math.PI / 2]}>
            <torusGeometry args={[0.045, 0.012]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Ceiling mounting plate - Optimized segments */}
        <mesh position={[0, 2.4, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 12]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Decorative ceiling medallion - Optimized segments */}
        <mesh position={[0, 2.475, 0]}>
          <cylinderGeometry args={[0.225, 0.225, 0.03, 16]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Ornate ceiling details - Optimized segments */}
        <mesh position={[0, 2.505, 0]}>
          <torusGeometry args={[0.18, 0.0225, 12, 16]} />
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
import * as THREE from 'three';

// Enhanced Window - Centered on back wall
export const OfficeWindow = () => {
  return (
    <group position={[0, 3.5, -9.9]}> {/* Centered on back wall, flush with wall like whiteboard */}
      {/* Large Window Frame - 80% of wall width, shorter height */}
      <mesh position={[-7.8, 0, 0]}>
        <boxGeometry args={[0.3, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[7.8, 0, 0]}>
        <boxGeometry args={[0.3, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[15.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, -3.2, 0]}>
        <boxGeometry args={[15.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      
      {/* Window Mullions - Classic Office Style */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.15, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[-3.9, 0, 0]}>
        <boxGeometry args={[0.15, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[3.9, 0, 0]}>
        <boxGeometry args={[0.15, 6, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[15.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[15.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      
      {/* Window Glass Panes - Simple semi-transparent glass */}
      {/* Outer columns (left and right) */}
      {[-5.8125, 5.8125].map((x, i) => (
        <group key={`outer-pane-group-${i}`}>
          {/* Top row pane */}
          <mesh position={[x, 2.3625, 0.1]}>
            <planeGeometry args={[3.675, 1.375]} />
            <meshStandardMaterial
              color="#404050"
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Middle row pane */}
          <mesh position={[x, 0, 0.1]}>
            <planeGeometry args={[3.675, 3.05]} />
            <meshStandardMaterial
              color="#404050"
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Bottom row pane */}
          <mesh position={[x, -2.3625, 0.1]}>
            <planeGeometry args={[3.675, 1.375]} />
            <meshStandardMaterial
              color="#404050"
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
      {/* Inner columns (center-left and center-right) */}
      {[-1.95, 1.95].map((x, i) => (
        <group key={`inner-pane-group-${i}`}>
          {/* Top row pane */}
          <mesh position={[x, 2.3625, 0.1]}>
            <planeGeometry args={[3.75, 1.375]} />
            <meshStandardMaterial
              color="#404050"
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Middle row pane */}
          <mesh position={[x, 0, 0.1]}>
            <planeGeometry args={[3.75, 3.05]} />
            <meshStandardMaterial
              color="#404050"
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Bottom row pane */}
          <mesh position={[x, -2.3625, 0.1]}>
            <planeGeometry args={[3.75, 1.375]} />
            <meshStandardMaterial
              color="#404050"
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
      
      {/* Simple Night Sky */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[30, 15]} />
        <meshStandardMaterial
          color="#0a0a1a"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Window Sill */}
      <mesh position={[0, -3.5, -0.1]}>
        <boxGeometry args={[16, 0.3, 0.6]} />
        <meshStandardMaterial color="#4a3728" roughness={0.6} />
      </mesh>
    </group>
  );
};
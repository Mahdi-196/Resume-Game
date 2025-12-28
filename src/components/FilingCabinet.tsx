// Filing Cabinet Component - Three 1930s vintage styles
import React from 'react';

interface FilingCabinetProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  variant: 'classic' | 'lateral' | 'card-catalog';
}

export const FilingCabinet = ({
  position,
  rotation = [0, 0, 0],
  variant = 'classic'
}: FilingCabinetProps) => {

  // Disable pointer events to prevent zoom on click
  const commonProps = {
    onPointerOver: (e: any) => e.stopPropagation(),
    onPointerOut: (e: any) => e.stopPropagation(),
    onClick: (e: any) => e.stopPropagation(),
    raycast: () => null // Completely disable raycasting
  };

  // Classic Vertical Filing Cabinet - Traditional tall 4-drawer office style
  if (variant === 'classic') {
    return (
      <group position={position} rotation={rotation} {...commonProps}>
        {/* Main cabinet body */}
        <mesh position={[0, 1.4, 0]} {...commonProps}>
          <boxGeometry args={[0.55, 2.8, 0.7]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Four drawers with handles and label holders */}
        {[0, 1, 2, 3].map((i) => {
          const yPos = 0.3 + i * 0.7;
          return (
            <group key={`drawer-${i}`}>
              {/* Drawer front panel - slightly recessed */}
              <mesh position={[0, yPos, 0.33]}>
                <boxGeometry args={[0.5, 0.6, 0.06]} />
                <meshStandardMaterial color="#3a3a3a" roughness={0.3} metalness={0.7} />
              </mesh>

              {/* Brass pull handle */}
              <mesh position={[0, yPos - 0.15, 0.37]}>
                <boxGeometry args={[0.12, 0.03, 0.02]} />
                <meshStandardMaterial color="#b8860b" roughness={0.2} metalness={0.9} />
              </mesh>

              {/* Label holder frame - brass */}
              <mesh position={[0, yPos + 0.15, 0.37]}>
                <boxGeometry args={[0.25, 0.08, 0.01]} />
                <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.7} />
              </mesh>

              {/* White label card */}
              <mesh position={[0, yPos + 0.15, 0.375]}>
                <boxGeometry args={[0.23, 0.06, 0.005]} />
                <meshStandardMaterial color="#e8e4d0" roughness={0.8} />
              </mesh>
            </group>
          );
        })}

        {/* Top rim detail */}
        <mesh position={[0, 2.82, 0]}>
          <boxGeometry args={[0.57, 0.04, 0.72]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>
    );
  }

  // Lateral Filing Cabinet - Low, wide 1930s office style
  if (variant === 'lateral') {
    return (
      <group position={position} rotation={rotation} {...commonProps}>
        {/* Main cabinet body - wider and shorter */}
        <mesh position={[0, 0.7, 0]} {...commonProps}>
          <boxGeometry args={[1.2, 1.4, 0.6]} />
          <meshStandardMaterial color="#3d2817" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Wood grain top surface */}
        <mesh position={[0, 1.42, 0]}>
          <boxGeometry args={[1.22, 0.04, 0.62]} />
          <meshStandardMaterial color="#5c4033" roughness={0.5} metalness={0.1} />
        </mesh>

        {/* Two horizontal drawers stacked */}
        {[0, 1].map((i) => {
          const yPos = 0.4 + i * 0.6;
          return (
            <group key={`drawer-${i}`}>
              {/* Drawer front - wood panel */}
              <mesh position={[0, yPos, 0.28]}>
                <boxGeometry args={[1.1, 0.5, 0.06]} />
                <meshStandardMaterial color="#4a352a" roughness={0.6} metalness={0.1} />
              </mesh>

              {/* Two brass handles side by side */}
              <mesh position={[-0.3, yPos, 0.32]}>
                <cylinderGeometry args={[0.02, 0.02, 0.08]} />
                <meshStandardMaterial color="#b8860b" roughness={0.2} metalness={0.9} />
              </mesh>
              <mesh position={[0.3, yPos, 0.32]}>
                <cylinderGeometry args={[0.02, 0.02, 0.08]} />
                <meshStandardMaterial color="#b8860b" roughness={0.2} metalness={0.9} />
              </mesh>

              {/* Decorative brass trim on drawer */}
              <mesh position={[0, yPos - 0.2, 0.32]}>
                <boxGeometry args={[0.9, 0.01, 0.01]} />
                <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.7} />
              </mesh>
            </group>
          );
        })}

        {/* Decorative corner brackets - Art Deco style */}
        {[-0.55, 0.55].map((x) => (
          <>
            <mesh key={`bracket-top-${x}`} position={[x, 1.35, 0.28]}>
              <boxGeometry args={[0.04, 0.08, 0.02]} />
              <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh key={`bracket-bot-${x}`} position={[x, 0.05, 0.28]}>
              <boxGeometry args={[0.04, 0.08, 0.02]} />
              <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.7} />
            </mesh>
          </>
        ))}
      </group>
    );
  }

  // Card Catalog Style - Victorian library aesthetic with small drawers
  if (variant === 'card-catalog') {
    return (
      <group position={position} rotation={rotation} {...commonProps}>
        {/* Main cabinet frame - rich dark wood */}
        <mesh position={[0, 1.2, 0]} {...commonProps}>
          <boxGeometry args={[0.9, 2.4, 0.5]} />
          <meshStandardMaterial color="#2a1810" roughness={0.5} metalness={0.1} />
        </mesh>

        {/* Decorative top molding */}
        <mesh position={[0, 2.42, 0]}>
          <boxGeometry args={[0.95, 0.06, 0.55]} />
          <meshStandardMaterial color="#1a0f08" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Grid of small drawers - 3 columns × 8 rows = 24 small drawers */}
        {Array.from({ length: 8 }).map((_, row) => (
          <React.Fragment key={`row-${row}`}>
            {Array.from({ length: 3 }).map((_, col) => {
            const xPos = -0.28 + col * 0.28;
            const yPos = 0.3 + row * 0.28;

            return (
              <group key={`drawer-${row}-${col}`}>
                {/* Small drawer front */}
                <mesh position={[xPos, yPos, 0.23]}>
                  <boxGeometry args={[0.26, 0.26, 0.04]} />
                  <meshStandardMaterial color="#3d2817" roughness={0.6} metalness={0.1} />
                </mesh>

                {/* Tiny brass knob */}
                <mesh position={[xPos, yPos, 0.26]}>
                  <sphereGeometry args={[0.015, 12, 12]} />
                  <meshStandardMaterial color="#b8860b" roughness={0.2} metalness={0.9} />
                </mesh>

                {/* Label slot */}
                <mesh position={[xPos, yPos + 0.08, 0.255]}>
                  <boxGeometry args={[0.18, 0.04, 0.005]} />
                  <meshStandardMaterial color="#e8e4d0" roughness={0.8} />
                </mesh>

                {/* Brass label frame */}
                <mesh position={[xPos, yPos + 0.08, 0.25]}>
                  <boxGeometry args={[0.19, 0.045, 0.003]} />
                  <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.7} />
                </mesh>
              </group>
            );
          })}
          </React.Fragment>
        ))}

        {/* Decorative vertical dividers between columns */}
        {[-0.14, 0.14].map((x) => (
          <mesh key={`divider-${x}`} position={[x, 1.2, 0.24]}>
            <boxGeometry args={[0.015, 2.3, 0.01]} />
            <meshStandardMaterial color="#1a0f08" roughness={0.7} />
          </mesh>
        ))}

        {/* Victorian style brass corner protectors */}
        {[-0.42, 0.42].map((x) => (
          <>
            <mesh key={`corner-top-${x}`} position={[x, 2.3, 0.23]}>
              <boxGeometry args={[0.03, 0.12, 0.02]} />
              <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh key={`corner-bot-${x}`} position={[x, 0.1, 0.23]}>
              <boxGeometry args={[0.03, 0.12, 0.02]} />
              <meshStandardMaterial color="#8b7355" roughness={0.3} metalness={0.7} />
            </mesh>
          </>
        ))}
      </group>
    );
  }

  return null;
};

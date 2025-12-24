import { useMemo, memo } from 'react';
import * as THREE from 'three';
import { PUSH_PIN } from '../constants';

/**
 * Reusable Push Pin component
 * Used to visually "pin" documents to the board
 * Optimized with shared geometry for common radius and React.memo to prevent unnecessary re-renders
 */
interface PushPinProps {
  position: [number, number, number];
  color?: string;
  radius?: number;
}

// Shared geometry for the default radius (most common case)
// Using 12x12 segments instead of 16x16 - visually identical at this scale but more performant
const DEFAULT_SPHERE_GEOMETRY = new THREE.SphereGeometry(PUSH_PIN.radius, 12, 12);

export const PushPin = memo(({
  position,
  color = PUSH_PIN.color,
  radius = PUSH_PIN.radius
}: PushPinProps) => {
  // Use shared geometry for default radius, create custom geometry for non-default
  const geometry = useMemo(() => {
    if (radius === PUSH_PIN.radius) {
      return DEFAULT_SPHERE_GEOMETRY;
    }
    return new THREE.SphereGeometry(radius, 12, 12);
  }, [radius]);

  return (
    <mesh position={position} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        metalness={PUSH_PIN.metalness}
        roughness={PUSH_PIN.roughness}
      />
    </mesh>
  );
});

PushPin.displayName = 'PushPin';

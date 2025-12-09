import { Event } from '@react-three/fiber';

export interface ThreeEvent extends Event {
  stopPropagation(): void;
  point: {
    x: number;
    y: number;
    z: number;
  };
}

// Collision detection types
export interface CollisionBox {
  id: string;              // Unique identifier (e.g., "desk", "couch")
  minX: number;            // Minimum X boundary
  maxX: number;            // Maximum X boundary
  minY: number;            // Minimum Y boundary
  maxY: number;            // Maximum Y boundary
  minZ: number;            // Minimum Z boundary
  maxZ: number;            // Maximum Z boundary
  isStatic: boolean;       // Always true for furniture (future-proofing)
}

export interface CollisionResult {
  collided: boolean;
  correctedX: number;      // X position after collision resolution
  correctedZ: number;      // Z position after collision resolution
  collidedWith?: string;   // ID of object collided with (for debugging)
}
import { CollisionBox, CollisionResult } from '@/types/three';

/**
 * Collision world definition for the Detective Office scene
 * All measurements are in Three.js units based on actual object positions and dimensions
 */
export const DETECTIVE_OFFICE_COLLISIONS: CollisionBox[] = [
  // Room walls (with slight buffer for collision detection)
  {
    id: 'wall_back',
    minX: -10, maxX: 10,
    minY: 0, maxY: 9,
    minZ: -10.2, maxZ: -9.8,
    isStatic: true
  },
  {
    id: 'wall_front',
    minX: -10, maxX: 10,
    minY: 0, maxY: 9,
    minZ: 9.8, maxZ: 10.2,
    isStatic: true
  },
  {
    id: 'wall_left',
    minX: -10.2, maxX: -9.8,
    minY: 0, maxY: 9,
    minZ: -10, maxZ: 10,
    isStatic: true
  },
  {
    id: 'wall_right',
    minX: 9.8, maxX: 10.2,
    minY: 0, maxY: 9,
    minZ: -10, maxZ: 10,
    isStatic: true
  },

  // Executive desk at [0, 0, -4.5], 4 units wide × 2 units deep
  {
    id: 'desk',
    minX: -2, maxX: 2,
    minY: 0, maxY: 1.1,
    minZ: -5.5, maxZ: -3.5,
    isStatic: true
  },

  // Couch at [0, 0, 1.5], scaled 1.6x width (3.2 units wide × 1.3 deep)
  {
    id: 'couch',
    minX: -1.6, maxX: 1.6,
    minY: 0, maxY: 1.7,
    minZ: 0.85, maxZ: 2.15,
    isStatic: true
  },

  // Victorian armchair at [-3.5, 0, 3.5] rotated π/2
  {
    id: 'armchair',
    minX: -4.1, maxX: -2.9,
    minY: 0, maxY: 1.7,
    minZ: 2.9, maxZ: 4.1,
    isStatic: true
  },

  // Side table 1 at [-3, 0, 2] - cylindrical table approximated as box
  {
    id: 'side_table_1',
    minX: -3.4, maxX: -2.6,
    minY: 0, maxY: 0.7,
    minZ: 1.6, maxZ: 2.4,
    isStatic: true
  },

  // Side table 2 at [-1, 0, 4]
  {
    id: 'side_table_2',
    minX: -1.4, maxX: -0.6,
    minY: 0, maxY: 0.7,
    minZ: 3.6, maxZ: 4.4,
    isStatic: true
  },

  // Side table 3 at [-5.5, 0, 4]
  {
    id: 'side_table_3',
    minX: -5.9, maxX: -5.1,
    minY: 0, maxY: 0.7,
    minZ: 3.6, maxZ: 4.4,
    isStatic: true
  },

  // Bookshelf 1 - left wall at [-9.0, 0, -6] rotated 90° (1.8 depth in Z, 0.8 width in X)
  {
    id: 'bookshelf_1',
    minX: -9.8, maxX: -8.6,
    minY: 0, maxY: 5,
    minZ: -6.9, maxZ: -5.1,
    isStatic: true
  },

  // Bookshelf 2 - left wall at [-9.0, 0, 6] rotated 90°
  {
    id: 'bookshelf_2',
    minX: -9.8, maxX: -8.6,
    minY: 0, maxY: 5,
    minZ: 5.1, maxZ: 6.9,
    isStatic: true
  },

  // Bookshelf 3 - right wall at [9.0, 0, -3] rotated -90°
  {
    id: 'bookshelf_3',
    minX: 8.6, maxX: 9.8,
    minY: 0, maxY: 5,
    minZ: -3.9, maxZ: -2.1,
    isStatic: true
  },

  // Bookshelf 4 - right wall at [9.0, 0, 0] rotated -90°
  {
    id: 'bookshelf_4',
    minX: 8.6, maxX: 9.8,
    minY: 0, maxY: 5,
    minZ: -0.9, maxZ: 0.9,
    isStatic: true
  },

  // Bookshelf 5 - right wall at [9.0, 0, 3] rotated -90°
  {
    id: 'bookshelf_5',
    minX: 8.6, maxX: 9.8,
    minY: 0, maxY: 5,
    minZ: 2.1, maxZ: 3.9,
    isStatic: true
  },

  // Bookshelf 6 - corner at [-8, 0, -9] no rotation
  {
    id: 'bookshelf_6',
    minX: -8.9, maxX: -7.1,
    minY: 0, maxY: 5,
    minZ: -9.8, maxZ: -8.6,
    isStatic: true
  },

  // Victorian desk chair at [0, 0, -6] (0.8 × 0.8 seat)
  {
    id: 'desk_chair',
    minX: -0.5, maxX: 0.5,
    minY: 0, maxY: 1.6,
    minZ: -6.5, maxZ: -5.5,
    isStatic: true
  },

  // Victorian door at [9.5, 0, 8] rotated -π/2
  {
    id: 'door',
    minX: 9.3, maxX: 9.7,
    minY: 0, maxY: 3,
    minZ: 7.5, maxZ: 8.5,
    isStatic: true
  },
];

/**
 * Checks if two axis-aligned bounding boxes intersect on the XZ plane
 * Used for basic collision detection in 2D horizontal space
 */
function aabbIntersects(
  playerMinX: number,
  playerMaxX: number,
  playerMinZ: number,
  playerMaxZ: number,
  box: CollisionBox
): boolean {
  return (
    playerMinX < box.maxX &&
    playerMaxX > box.minX &&
    playerMinZ < box.maxZ &&
    playerMaxZ > box.minZ
  );
}

/**
 * Resolves collision by implementing sliding behavior along obstacle surfaces
 * If diagonal movement hits an obstacle, tries moving along one axis at a time
 * This creates smooth "sliding along walls" movement
 */
function resolveCollisionWithSliding(
  currentX: number,
  currentZ: number,
  newX: number,
  newZ: number,
  playerRadius: number,
  obstacle: CollisionBox
): CollisionResult {
  // Try moving only in X direction (slide along Z axis)
  const xOnlyMinX = newX - playerRadius;
  const xOnlyMaxX = newX + playerRadius;
  const xOnlyMinZ = currentZ - playerRadius;
  const xOnlyMaxZ = currentZ + playerRadius;

  if (!aabbIntersects(xOnlyMinX, xOnlyMaxX, xOnlyMinZ, xOnlyMaxZ, obstacle)) {
    // X movement is safe, cancel Z movement
    return {
      collided: true,
      correctedX: newX,
      correctedZ: currentZ,
      collidedWith: obstacle.id,
    };
  }

  // Try moving only in Z direction (slide along X axis)
  const zOnlyMinX = currentX - playerRadius;
  const zOnlyMaxX = currentX + playerRadius;
  const zOnlyMinZ = newZ - playerRadius;
  const zOnlyMaxZ = newZ + playerRadius;

  if (!aabbIntersects(zOnlyMinX, zOnlyMaxX, zOnlyMinZ, zOnlyMaxZ, obstacle)) {
    // Z movement is safe, cancel X movement
    return {
      collided: true,
      correctedX: currentX,
      correctedZ: newZ,
      collidedWith: obstacle.id,
    };
  }

  // Both axes are blocked - prevent all movement
  return {
    collided: true,
    correctedX: currentX,
    correctedZ: currentZ,
    collidedWith: obstacle.id,
  };
}

/**
 * Main collision detection function
 * Checks if moving from current position to new position causes collision
 * Returns corrected position with sliding behavior if collision detected
 *
 * @param currentX - Current X position
 * @param currentZ - Current Z position
 * @param newX - Intended new X position
 * @param newZ - Intended new Z position
 * @param playerRadius - Collision radius around player (default: 0.4 units)
 * @returns CollisionResult with corrected position and collision status
 */
export function checkCollision(
  currentX: number,
  currentZ: number,
  newX: number,
  newZ: number,
  playerRadius: number = 0.4
): CollisionResult {
  // Create player AABB from intended position and radius
  const playerMinX = newX - playerRadius;
  const playerMaxX = newX + playerRadius;
  const playerMinZ = newZ - playerRadius;
  const playerMaxZ = newZ + playerRadius;

  // Check collision against each static object in the scene
  for (const box of DETECTIVE_OFFICE_COLLISIONS) {
    if (aabbIntersects(playerMinX, playerMaxX, playerMinZ, playerMaxZ, box)) {
      // Collision detected - resolve with sliding behavior
      return resolveCollisionWithSliding(
        currentX,
        currentZ,
        newX,
        newZ,
        playerRadius,
        box
      );
    }
  }

  // No collision - movement is valid
  return {
    collided: false,
    correctedX: newX,
    correctedZ: newZ,
  };
}

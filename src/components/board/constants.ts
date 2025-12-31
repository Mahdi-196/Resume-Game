/**
 * Constants for the Interactive Detective Board
 * Centralized colors, positions, and configuration values
 */

import * as THREE from 'three';

// Board configuration
export const BOARD_CONFIG = {
  position: [0, 4.5, 9.9] as [number, number, number],
  rotation: [0, Math.PI, 0] as [number, number, number],
  size: {
    width: 12.5,
    height: 6.5,
  },
};

// Color palette
export const COLORS = {
  // Wood tones
  lightWood: '#D2B48C',
  darkWood: '#654321',
  manila: '#C09858',
  manilaTab: '#B58F4F',

  // Background and text
  darkBrown: '#1a0d00',
  offWhite: '#FFFEF0',
  creamPaper: '#F5F5DC',
  antiquePaper: '#FAF0E6',

  // Metallic accents (aged copper/bronze theme)
  copper: '#B87333',        // Rich copper for primary accents
  bronze: '#CD7F32',        // Classic bronze for borders and lines
  darkCopper: '#8B4513',    // Aged copper/saddle brown for text
  brass: '#CD7F32',         // Mapped to bronze for backwards compatibility
  gold: '#B87333',          // Mapped to copper for backwards compatibility

  // Accent colors
  darkRed: '#8B0000',
  deepRed: '#cc0000',
  darkGreen: '#006400',
  yellow: '#FFEB3B',        // Kept for reference (not actively used)
  tan: '#C19A6B',

  // Text colors
  primaryText: '#1C1C1C',
  secondaryText: '#2F2F2F',
  tertiaryText: '#333333',
  brownText: '#654321',
};

// Animation speeds
export const ANIMATION = {
  fadeSpeed: {
    preview: 20,  // Fast fade out to prevent overlap with detail headers
    detail: 12,   // Quick fade in for smooth transition
  },
  opacityThreshold: 0.01,
};

// Case file positions (for preview cards)
export const CASE_FILE_POSITIONS = {
  aboutMe: [-3.2, 1.2, 0.03] as [number, number, number],
  education: [3.2, 1.2, 0.03] as [number, number, number],
  skills: [-3.2, -1.35, 0.03] as [number, number, number],
  projects: [3.2, -1.35, 0.03] as [number, number, number],
};

// Push pin configuration
export const PUSH_PIN = {
  radius: 0.08,
  metalness: 0.3,
  roughness: 0.4,
  color: COLORS.deepRed,
};

// Material settings
export const MATERIALS = {
  wood: {
    roughness: 0.7,
    metalness: 0.1,
  },
  paper: {
    roughness: 0.95,
    metalness: 0,
  },
  manila: {
    roughness: 0.9,
    metalness: 0,
  },
};

// Shared material instances to prevent recreation on every render
// Reusing materials significantly reduces GPU overhead
export const SHARED_MATERIALS = {
  darkWood: new THREE.MeshStandardMaterial({
    color: COLORS.darkWood,
    roughness: MATERIALS.wood.roughness,
    metalness: MATERIALS.wood.metalness,
    side: THREE.DoubleSide,
  }),
  lightWood: new THREE.MeshStandardMaterial({
    color: COLORS.lightWood,
    roughness: MATERIALS.wood.roughness,
    metalness: MATERIALS.wood.metalness,
    side: THREE.DoubleSide,
  }),
  manila: new THREE.MeshStandardMaterial({
    color: COLORS.manila,
    roughness: MATERIALS.manila.roughness,
    metalness: MATERIALS.manila.metalness,
  }),
  manilaTab: new THREE.MeshStandardMaterial({
    color: COLORS.manilaTab,
    roughness: MATERIALS.manila.roughness,
    metalness: MATERIALS.manila.metalness,
  }),
  darkRed: new THREE.MeshStandardMaterial({
    color: COLORS.darkRed,
  }),
  darkBrown: new THREE.MeshStandardMaterial({
    color: COLORS.darkBrown,
  }),
};

// Text size multiplier for mobile
export const MOBILE_TEXT_SCALE = 1.5; // 50% larger text on mobile

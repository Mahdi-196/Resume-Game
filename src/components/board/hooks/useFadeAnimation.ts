import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ANIMATION } from '../constants';
import type { CaseFile } from '../types';

/**
 * Custom hook to handle smooth fade animations for preview and detail groups
 * Manages opacity transitions when switching between case file views
 */
export const useFadeAnimation = (selectedCaseFile: CaseFile) => {
  // Refs for the preview and detail groups
  const previewGroupRef = useRef<THREE.Group>(null);
  const detailGroupRef = useRef<THREE.Group>(null);

  // Target and current opacity tracking
  const previewTargetOpacity = useRef(1);
  const previewCurrentOpacity = useRef(1);
  const detailTargetOpacity = useRef(0);
  const detailCurrentOpacity = useRef(0);

  // Reset opacities immediately when case file changes to prevent lingering
  useEffect(() => {
    if (!selectedCaseFile) {
      // Closing detail - reset detail to 0
      detailCurrentOpacity.current = 0;
      if (detailGroupRef.current) {
        detailGroupRef.current.visible = false;
        // Force reset all materials to fully opaque when closing
        detailGroupRef.current.traverse((child) => {
          if ((child as THREE.Mesh).material) {
            const mat = (child as THREE.Mesh).material;
            if (Array.isArray(mat)) {
              mat.forEach((m) => {
                m.opacity = 0;
                m.transparent = true;
              });
            } else {
              mat.opacity = 0;
              mat.transparent = true;
            }
          }
        });
      }
    } else {
      // Opening detail - immediately hide preview (especially the header)
      previewCurrentOpacity.current = 0;
      if (previewGroupRef.current) {
        previewGroupRef.current.visible = false;
      }
      detailCurrentOpacity.current = 0; // Start from 0 when opening a new detail
    }
  }, [selectedCaseFile]);

  // Animate opacity smoothly on each frame
  useFrame((state, delta) => {
    // Fade out preview when detail is shown, fade in when not
    previewTargetOpacity.current = selectedCaseFile ? 0 : 1;

    // Use faster fade speed when closing to prevent header lingering
    const previewFadeSpeed = selectedCaseFile ? 25 : ANIMATION.fadeSpeed.preview; // Much faster fade out
    previewCurrentOpacity.current +=
      (previewTargetOpacity.current - previewCurrentOpacity.current) * delta * previewFadeSpeed;

    // Fade in detail when case file selected, fade out when not
    detailTargetOpacity.current = selectedCaseFile ? 1 : 0;

    // Use faster fade speed to prevent lingering
    const fadeSpeed = selectedCaseFile ? ANIMATION.fadeSpeed.detail : 20; // Faster fade out
    detailCurrentOpacity.current +=
      (detailTargetOpacity.current - detailCurrentOpacity.current) * delta * fadeSpeed;

    // Apply opacity to all materials in the preview group
    if (previewGroupRef.current) {
      // Hide completely when opacity is very low (optimization)
      previewGroupRef.current.visible = previewCurrentOpacity.current > ANIMATION.opacityThreshold;

      previewGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
              m.transparent = true;
              m.opacity = previewCurrentOpacity.current;
              m.needsUpdate = true; // Force material update
            });
          } else {
            mat.transparent = true;
            mat.opacity = previewCurrentOpacity.current;
            mat.needsUpdate = true; // Force material update
          }
        }
      });
    }

    // Apply opacity to all materials in the detail group
    if (detailGroupRef.current) {
      // Hide completely when opacity is very low (optimization)
      detailGroupRef.current.visible = detailCurrentOpacity.current > ANIMATION.opacityThreshold;

      detailGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => {
              m.transparent = true;
              m.opacity = detailCurrentOpacity.current;
              m.needsUpdate = true; // Force material update
            });
          } else {
            mat.transparent = true;
            mat.opacity = detailCurrentOpacity.current;
            mat.needsUpdate = true; // Force material update
          }
        }
      });
    }
  });

  return {
    previewGroupRef,
    detailGroupRef,
  };
};

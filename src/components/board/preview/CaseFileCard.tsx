import { memo } from 'react';
import { Text } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { COLORS, SHARED_MATERIALS } from '../constants';
import type { CaseFileCardProps } from '../types';
import { getTextScale } from '@/utils/detectMobile';

/**
 * Reusable Case File Card component
 * Displays a manila folder with title and items
 * Memoized to prevent unnecessary re-renders
 */
export const CaseFileCard = memo(({
  position,
  title,
  fileNumber,
  items,
  showContent,
  selectedCaseFile,
  onClick,
  labelColor = COLORS.darkRed
}: CaseFileCardProps) => {
  const textScale = getTextScale(); // 1.5x on mobile, 1x on desktop

  // Determine tab position based on card position
  const tabYOffset = position[1] > 0 ? 0.65 : 0.65;
  const labelXOffset = -1.05; // Position file number on left side of tab

  return (
    <group
      onClick={(e) => {
        if (!showContent || selectedCaseFile) return;
        e.stopPropagation();
        onClick();
      }}
      onPointerEnter={() => {
        if (showContent && !selectedCaseFile) document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => (document.body.style.cursor = 'auto')}
      visible={!selectedCaseFile}
    >
      {/* Folder body - manila envelope (40% bigger) */}
      <mesh position={position}>
        <boxGeometry args={[3.1, 1.8, 0.04]} />
        <primitive object={SHARED_MATERIALS.manila} attach="material" />
      </mesh>

      {/* Folder tab at top */}
      <mesh position={[position[0], position[1] + tabYOffset + 0.25, position[2] + 0.015]}>
        <boxGeometry args={[3.1, 0.28, 0.03]} />
        <primitive object={SHARED_MATERIALS.manilaTab} attach="material" />
      </mesh>

      {/* File identifier label */}
      <mesh position={[position[0] + labelXOffset - 0.2, position[1] + tabYOffset + 0.25, position[2] + 0.04]}>
        <planeGeometry args={[0.6, 0.32]} />
        <meshStandardMaterial color={labelColor} />
      </mesh>
      <Text
        position={[position[0] + labelXOffset - 0.2, position[1] + tabYOffset + 0.25, position[2] + 0.08]}
        fontSize={0.17 * textScale}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {fileNumber}
      </Text>

      {/* Title */}
      <Text
        position={[position[0], position[1] + 0.35, position[2] + 0.06]}
        fontSize={0.24 * textScale}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Items */}
      {items.map((item, index) => (
        <Text
          key={index}
          position={[position[0], position[1] - 0.1 - index * 0.22, position[2] + 0.06]}
          fontSize={0.12 * textScale}
          color={COLORS.tertiaryText}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.8}
        >
          {item}
        </Text>
      ))}

      {/* Push pin */}
      <PushPin position={[position[0], position[1] + tabYOffset + 0.25, position[2] + 0.06]} radius={0.12} />
    </group>
  );
});

CaseFileCard.displayName = 'CaseFileCard';

import { Text, Line } from '@react-three/drei';
import { PushPin } from '../shared/PushPin';
import { COLORS } from '../constants';
import { getTextScale } from '@/utils/detectMobile';

/**
 * PopUpTrivia Project - Simple view with single paper
 */
export const PopUpTriviaProject = () => {
  const textScale = getTextScale();
  return (
    <>
      {/* Single Paper */}
      <group position={[0, -0.5, 0.04]}>
        <mesh position={[0.05, -0.05, -0.001]}>
          <planeGeometry args={[7.5, 4.5]} />
          <meshStandardMaterial color="#000000" opacity={0.15} transparent />
        </mesh>

        <mesh>
          <planeGeometry args={[7.4, 4.5]} />
          <meshStandardMaterial color={COLORS.antiquePaper} roughness={0.95} />
        </mesh>

        <Line
          points={[[-3.65, 2.2, 0.001], [3.65, 2.2, 0.001], [3.65, -2.3, 0.001], [-3.65, -2.3, 0.001], [-3.65, 2.2, 0.001]]}
          color={COLORS.brass}
          lineWidth={2}
        />

        <mesh position={[0, 1.9, 0.001]}>
          <planeGeometry args={[7.2, 0.5]} />
          <meshStandardMaterial color={COLORS.primaryText} roughness={0.7} />
        </mesh>
        <Text position={[0, 1.9, 0.002]} fontSize={0.22 * textScale} color={COLORS.antiquePaper} anchorX="center" anchorY="middle">
          Interactive Trivia Game
        </Text>

        <Line points={[[-2.5, 1.65, 0.002], [2.5, 1.65, 0.002]]} color={COLORS.brass} lineWidth={2} />

        <Text position={[0, 1.35, 0.002]} fontSize={0.13 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
          Python • Pygame • REST APIs • JSON
        </Text>

        <Text position={[0, 1.0, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Built interactive trivia game using Pygame with custom
        </Text>
        <Text position={[0, 0.85, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          sprite system for smooth animations and transitions
        </Text>
        <Text position={[0, 0.65, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Integrated Open Trivia Database API for dynamic
        </Text>
        <Text position={[0, 0.5, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          question fetching across multiple categories and
        </Text>
        <Text position={[0, 0.35, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          difficulty levels with real-time content updates
        </Text>
        <Text position={[0, 0.15, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Implemented scoring system with streak multipliers,
        </Text>
        <Text position={[0, 0.0, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          time-based bonuses, and persistent high score tracking
        </Text>
        <Text position={[0, -0.20, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Designed responsive UI with custom button controls,
        </Text>
        <Text position={[0, -0.35, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          progress bars, and visual feedback for user actions
        </Text>
        <Text position={[0, -0.55, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Created modular game state management system for
        </Text>
        <Text position={[0, -0.70, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          seamless navigation between menus and gameplay modes
        </Text>
        <Text position={[0, -0.90, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          • Optimized rendering pipeline with sprite caching and
        </Text>
        <Text position={[0, -1.05, 0.002]} fontSize={0.10 * textScale} color={COLORS.secondaryText} anchorX="center" anchorY="middle" maxWidth={6.5}>
          efficient event handling for smooth 60 FPS gameplay
        </Text>

        <Line points={[[-3.3, -1.30, 0.002], [3.3, -1.30, 0.002]]} color={COLORS.tan} lineWidth={1} />

        <Text position={[0, -1.55, 0.002]} fontSize={0.095 * textScale} color={COLORS.brownText} anchorX="center" anchorY="middle">
          Personal Project • Interactive Learning Tool
        </Text>

        <group
          position={[0, -2.0, 0.002]}
          onClick={(e) => {
            e.stopPropagation();
            window.open('https://github.com/Mahdi-196/PopUpTrivia', '_blank');
          }}
          onPointerEnter={() => (document.body.style.cursor = 'pointer')}
          onPointerLeave={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <planeGeometry args={[3.5, 0.25]} />
            <meshStandardMaterial color={COLORS.brass} opacity={0.2} transparent />
          </mesh>
          <Text fontSize={0.095 * textScale} color={COLORS.primaryText} anchorX="center" anchorY="middle">
            🔗 View on GitHub
          </Text>
        </group>

        <PushPin position={[-3.5, 2.15, 0.01]} color="#CD853F" radius={0.1} />
        <PushPin position={[3.5, 2.15, 0.01]} color="#CD853F" radius={0.1} />
      </group>
    </>
  );
};

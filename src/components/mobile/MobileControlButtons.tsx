/**
 * Mobile control buttons for detective mode and board interaction
 */
interface MobileControlButtonsProps {
  onToggleDetectiveMode: () => void;
  onOpenBoard: () => void;
  isDetectiveMode: boolean;
}

export const MobileControlButtons = ({
  onToggleDetectiveMode,
  onOpenBoard,
  isDetectiveMode
}: MobileControlButtonsProps) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 mobile-control">
      {/* Open Board Button */}
      <button
        onClick={onOpenBoard}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpenBoard();
        }}
        className="w-16 h-16 rounded-full bg-noir-shadow/80 border-2 border-detective-glow/60 backdrop-blur-sm flex items-center justify-center text-detective-glow hover:bg-noir-shadow hover:border-detective-glow transition-all duration-200 shadow-[0_0_15px_rgba(218,165,32,0.3)] active:scale-95"
      >
        <span className="text-2xl font-bold">R</span>
      </button>

      {/* Toggle Detective Mode Button */}
      <button
        onClick={onToggleDetectiveMode}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleDetectiveMode();
        }}
        className={`w-16 h-16 rounded-full backdrop-blur-sm border-2 flex items-center justify-center transition-all duration-200 active:scale-95 ${
          isDetectiveMode
            ? 'bg-detective-glow/20 border-detective-glow shadow-[0_0_20px_rgba(218,165,32,0.5)] text-detective-glow'
            : 'bg-noir-shadow/80 border-detective-glow/60 shadow-[0_0_15px_rgba(218,165,32,0.3)] text-detective-glow/70'
        }`}
      >
        <span className="text-xl">👁️</span>
      </button>

      {/* Labels (optional) */}
      <div className="absolute -left-20 top-0 text-detective-paper/40 text-xs whitespace-nowrap pointer-events-none">
        Open Board
      </div>
      <div className="absolute -left-24 bottom-0 text-detective-paper/40 text-xs whitespace-nowrap pointer-events-none">
        Detective Mode
      </div>
    </div>
  );
};

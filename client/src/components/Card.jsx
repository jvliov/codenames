/**
 * Individual card component for the game board
 */
export default function Card({ card, index, isSpymaster, onReveal }) {
  const getCardColor = () => {
    // If card is revealed, show its actual color
    if (card.revealed) {
      switch (card.type) {
        case 'red':
          return 'bg-red-600 text-white border-red-700';
        case 'blue':
          return 'bg-blue-600 text-white border-blue-700';
        case 'neutral':
          return 'bg-amber-100 text-gray-800 border-amber-200';
        case 'assassin':
          return 'bg-black text-white border-gray-900';
        default:
          return 'bg-amber-50 text-gray-800 border-amber-100';
      }
    }

    // If spymaster view, show the colors
    if (isSpymaster) {
      switch (card.type) {
        case 'red':
          return 'bg-red-500/30 text-white border-red-400 hover:bg-red-500/40';
        case 'blue':
          return 'bg-blue-500/30 text-white border-blue-400 hover:bg-blue-500/40';
        case 'neutral':
          return 'bg-amber-200/50 text-gray-800 border-amber-300 hover:bg-amber-200/70';
        case 'assassin':
          return 'bg-gray-900/50 text-white border-gray-700 hover:bg-gray-900/70';
        default:
          return 'bg-amber-50 text-gray-800 border-amber-100';
      }
    }

    // Board view - unrevealed cards are neutral tan
    return 'bg-amber-50 text-gray-800 border-amber-200 hover:bg-amber-100';
  };

  const handleClick = () => {
    if (!card.revealed && isSpymaster) {
      onReveal(index);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={card.revealed || !isSpymaster}
      className={`
        ${getCardColor()}
        aspect-square w-full
        flex items-center justify-center
        font-bold text-lg md:text-xl lg:text-2xl
        border-4 rounded-lg
        transition-all duration-200
        ${!card.revealed && isSpymaster ? 'cursor-pointer active:scale-95' : ''}
        ${card.revealed ? 'opacity-90' : ''}
        relative
      `}
    >
      <span className="text-center px-2 uppercase tracking-wide">
        {card.word}
      </span>
      {card.revealed && (
        <div className="absolute inset-0 border-4 border-white/30 rounded-lg pointer-events-none"></div>
      )}
    </button>
  );
}

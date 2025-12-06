import { useState } from 'react';
import Card from './Card';

/**
 * Main game board component
 * Displays 5x5 grid and game controls
 */
export default function GameBoard({ gameState, roomCode, socket, isSpymaster }) {
  const [viewMode, setViewMode] = useState(isSpymaster ? 'spymaster' : 'board');

  const handleRevealCard = (index) => {
    if (socket && roomCode) {
      socket.emit('revealCard', { roomCode, cardIndex: index });
    }
  };

  const handleNewGame = () => {
    if (socket && roomCode) {
      socket.emit('newGame', roomCode);
    }
  };

  const handleEndTurn = () => {
    if (socket && roomCode) {
      socket.emit('endTurn', roomCode);
    }
  };

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl">Loading game...</div>
      </div>
    );
  }

  const currentViewIsSpymaster = viewMode === 'spymaster';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-4 lg:p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Desktop: Side-by-side layout, Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

          {/* Left Sidebar - Controls and Info */}
          <div className="lg:w-80 flex-shrink-0 space-y-4">
            {/* Header */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">CODENAMES</h1>
              <p className="text-gray-400 text-sm">
                Room: <span className="font-mono font-bold text-white">{roomCode}</span>
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('board')}
                  className={`flex-1 py-2 px-3 rounded-md font-semibold text-sm transition-colors ${
                    viewMode === 'board'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                >
                  Board
                </button>
                <button
                  onClick={() => setViewMode('spymaster')}
                  className={`flex-1 py-2 px-3 rounded-md font-semibold text-sm transition-colors ${
                    viewMode === 'spymaster'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                >
                  Spymaster
                </button>
              </div>
            </div>

            {/* Game Status */}
            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div>
                <div className="text-gray-400 text-sm mb-2">Current Turn</div>
                <div className={`w-full py-2 px-4 rounded-lg font-bold text-center ${
                  gameState.currentTeam === 'red' ? 'bg-red-600' : 'bg-blue-600'
                }`}>
                  {gameState.currentTeam === 'red' ? 'RED TEAM' : 'BLUE TEAM'}
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-sm mb-2">Cards Remaining</div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-red-600/20 border border-red-600 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{gameState.redRemaining}</div>
                    <div className="text-xs text-gray-300 mt-1">Red</div>
                  </div>
                  <div className="flex-1 bg-blue-600/20 border border-blue-600 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{gameState.blueRemaining}</div>
                    <div className="text-xs text-gray-300 mt-1">Blue</div>
                  </div>
                </div>
              </div>

              {/* Game Over Status */}
              {gameState.gameOver && (
                <div className={`w-full py-3 px-4 rounded-lg font-bold text-center text-lg ${
                  gameState.winner === 'red' ? 'bg-red-600' : 'bg-blue-600'
                }`}>
                  {gameState.winner === 'red' ? 'RED' : 'BLUE'} WINS!
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-gray-800 rounded-lg p-4 space-y-2">
              <button
                onClick={handleNewGame}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                New Game
              </button>
              {currentViewIsSpymaster && !gameState.gameOver && (
                <button
                  onClick={handleEndTurn}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  End Turn
                </button>
              )}
            </div>

            {/* View Mode Info */}
            <div className={`rounded-lg p-3 text-sm ${
              currentViewIsSpymaster
                ? 'bg-purple-900/50 border border-purple-500 text-purple-200'
                : 'bg-blue-900/50 border border-blue-500 text-blue-200'
            }`}>
              <div className="font-bold mb-1">
                {currentViewIsSpymaster ? 'Spymaster View' : 'Board View'}
              </div>
              <div className="text-xs opacity-90">
                {currentViewIsSpymaster
                  ? 'Click cards to reveal them to all players'
                  : 'Watch as cards are revealed'}
              </div>
            </div>
          </div>

          {/* Right Side - Game Board */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {gameState.cards.map((card, index) => (
                  <Card
                    key={index}
                    card={card}
                    index={index}
                    isSpymaster={currentViewIsSpymaster}
                    onReveal={handleRevealCard}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

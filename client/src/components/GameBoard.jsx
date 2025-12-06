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
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">CODENAMES</h1>
            <p className="text-gray-400 text-sm md:text-base">Room: <span className="font-mono font-bold text-white">{roomCode}</span></p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('board')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                viewMode === 'board'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Board View
            </button>
            <button
              onClick={() => setViewMode('spymaster')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                viewMode === 'spymaster'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Spymaster
            </button>
          </div>
        </div>

        {/* Game Status */}
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          {/* Current Turn */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Current Turn:</span>
            <span className={`px-3 py-1 rounded-lg font-bold ${
              gameState.currentTeam === 'red' ? 'bg-red-600' : 'bg-blue-600'
            }`}>
              {gameState.currentTeam === 'red' ? 'RED' : 'BLUE'}
            </span>
          </div>

          {/* Scores */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="font-bold">{gameState.redRemaining}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="font-bold">{gameState.blueRemaining}</span>
            </div>
          </div>

          {/* Game Over Status */}
          {gameState.gameOver && (
            <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
              gameState.winner === 'red' ? 'bg-red-600' : 'bg-blue-600'
            }`}>
              {gameState.winner === 'red' ? 'RED' : 'BLUE'} WINS!
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={handleNewGame}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            New Game
          </button>
          {currentViewIsSpymaster && !gameState.gameOver && (
            <button
              onClick={handleEndTurn}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              End Turn
            </button>
          )}
        </div>

        {/* View Mode Indicator */}
        <div className="mt-4">
          {currentViewIsSpymaster ? (
            <div className="bg-purple-900/50 border border-purple-500 text-purple-200 px-4 py-2 rounded-lg inline-block">
              <span className="font-bold">Spymaster View:</span> Click cards to reveal them to all players
            </div>
          ) : (
            <div className="bg-blue-900/50 border border-blue-500 text-blue-200 px-4 py-2 rounded-lg inline-block">
              <span className="font-bold">Board View:</span> Watch as cards are revealed
            </div>
          )}
        </div>
      </div>

      {/* Game Board Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-5 gap-2 md:gap-3 lg:gap-4">
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
  );
}

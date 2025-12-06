import { useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import RoomSetup from './components/RoomSetup';
import GameBoard from './components/GameBoard';

function App() {
  const { socket, connected } = useSocket();
  const [roomCode, setRoomCode] = useState(null);
  const [gameState, setGameState] = useState(null);

  // Listen for game state updates
  useEffect(() => {
    if (!socket) return;

    socket.on('gameStateUpdate', (newGameState) => {
      console.log('Game state updated:', newGameState);
      setGameState(newGameState);
    });

    return () => {
      socket.off('gameStateUpdate');
    };
  }, [socket]);

  const handleRoomJoined = (code, initialGameState) => {
    setRoomCode(code);
    setGameState(initialGameState);
  };

  const handleLeaveRoom = () => {
    setRoomCode(null);
    setGameState(null);
  };

  if (!roomCode) {
    return <RoomSetup socket={socket} onRoomJoined={handleRoomJoined} />;
  }

  return (
    <div>
      <GameBoard
        gameState={gameState}
        roomCode={roomCode}
        socket={socket}
        isSpymaster={false} // Can be toggled in the GameBoard component
      />
    </div>
  );
}

export default App;

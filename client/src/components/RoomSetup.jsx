import { useState } from 'react';

/**
 * Component for creating or joining a room
 */
export default function RoomSetup({ socket, onRoomJoined }) {
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateRoom = () => {
    if (!socket) return;

    setLoading(true);
    setError('');

    socket.emit('createRoom', (response) => {
      setLoading(false);
      if (response.success) {
        onRoomJoined(response.roomCode, response.gameState);
      } else {
        setError('Failed to create room');
      }
    });
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!socket || !roomCode.trim()) return;

    setLoading(true);
    setError('');

    socket.emit('joinRoom', roomCode.trim().toUpperCase(), (response) => {
      setLoading(false);
      if (response.success) {
        onRoomJoined(response.roomCode, response.gameState);
      } else {
        setError(response.error || 'Failed to join room');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          CODENAMES
        </h1>

        <div className="space-y-6">
          <button
            onClick={handleCreateRoom}
            disabled={loading || !socket}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            {loading ? 'Creating...' : 'Create New Game'}
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          <form onSubmit={handleJoinRoom} className="space-y-4">
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="Enter Room Code"
              maxLength={4}
              className="w-full px-4 py-3 bg-gray-700 text-white text-center text-2xl font-mono rounded-lg border-2 border-gray-600 focus:border-blue-500 focus:outline-none uppercase"
            />
            <button
              type="submit"
              disabled={loading || !socket || !roomCode.trim()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
            >
              {loading ? 'Joining...' : 'Join Game'}
            </button>
          </form>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {!socket && (
            <div className="bg-yellow-900/50 border border-yellow-500 text-yellow-200 px-4 py-3 rounded-lg text-center text-sm">
              Connecting to server...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

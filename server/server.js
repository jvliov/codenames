import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { generateRoomCode, createGameBoard, revealCard, switchTeam } from './gameLogic.js';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite default port
    methods: ["GET", "POST"]
  }
});

// In-memory storage for game rooms
const rooms = new Map();

/**
 * Get or create a room
 */
function getRoom(roomCode) {
  if (!rooms.has(roomCode)) {
    rooms.set(roomCode, {
      code: roomCode,
      gameState: createGameBoard(),
      players: new Set()
    });
  }
  return rooms.get(roomCode);
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  /**
   * Create a new room
   */
  socket.on('createRoom', (callback) => {
    let roomCode;
    // Ensure unique room code
    do {
      roomCode = generateRoomCode();
    } while (rooms.has(roomCode));

    const room = getRoom(roomCode);
    socket.join(roomCode);
    room.players.add(socket.id);

    console.log(`Room created: ${roomCode}`);
    callback({ success: true, roomCode, gameState: room.gameState });
  });

  /**
   * Join an existing room
   */
  socket.on('joinRoom', (roomCode, callback) => {
    roomCode = roomCode.toUpperCase();

    if (!rooms.has(roomCode)) {
      callback({ success: false, error: 'Room not found' });
      return;
    }

    const room = getRoom(roomCode);
    socket.join(roomCode);
    room.players.add(socket.id);

    console.log(`Client ${socket.id} joined room: ${roomCode}`);
    callback({ success: true, roomCode, gameState: room.gameState });
  });

  /**
   * Reveal a card
   */
  socket.on('revealCard', ({ roomCode, cardIndex }) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    // Update game state
    room.gameState = revealCard(room.gameState, cardIndex);

    // Broadcast to all clients in the room
    io.to(roomCode).emit('gameStateUpdate', room.gameState);

    console.log(`Card ${cardIndex} revealed in room ${roomCode}`);
  });

  /**
   * End turn (switch teams)
   */
  socket.on('endTurn', (roomCode) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    room.gameState = switchTeam(room.gameState);
    io.to(roomCode).emit('gameStateUpdate', room.gameState);

    console.log(`Turn ended in room ${roomCode}, now ${room.gameState.currentTeam}'s turn`);
  });

  /**
   * Start a new game in the same room
   */
  socket.on('newGame', (roomCode) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    // Create new game board but keep the same room code
    room.gameState = createGameBoard();
    io.to(roomCode).emit('gameStateUpdate', room.gameState);

    console.log(`New game started in room ${roomCode}`);
  });

  /**
   * Handle disconnection
   */
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

    // Remove player from all rooms
    rooms.forEach((room, code) => {
      room.players.delete(socket.id);

      // Clean up empty rooms after 1 hour
      if (room.players.size === 0) {
        setTimeout(() => {
          const currentRoom = rooms.get(code);
          if (currentRoom && currentRoom.players.size === 0) {
            rooms.delete(code);
            console.log(`Room ${code} deleted (empty)`);
          }
        }, 3600000); // 1 hour
      }
    });
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

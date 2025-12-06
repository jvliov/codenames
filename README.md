# Codenames Web Game

A real-time web-based implementation of the popular board game Codenames with dual device support.

## Features

- **Real-time Multiplayer**: Synchronize game state across multiple devices using Socket.io
- **Dual View Mode**:
  - **Board View**: Clean display for teams (perfect for mirroring to TV)
  - **Spymaster View**: Color-coded key showing all card assignments
- **Room-based Games**: Join games using simple 4-character room codes
- **Standard Codenames Rules**: 25 cards, proper color distribution (9-8-7-1)
- **Mobile Responsive**: Works on phones, tablets, and desktop
- **In-Memory State**: No database required, perfect for quick games

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Socket.io
- **Real-time Communication**: WebSockets

## Project Structure

```
codenames/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card.jsx
│   │   │   ├── GameBoard.jsx
│   │   │   └── RoomSetup.jsx
│   │   ├── hooks/
│   │   │   └── useSocket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/          # Node.js backend
    ├── server.js
    ├── gameLogic.js
    ├── wordBank.js
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. **Clone the repository** (or you're already here!)

2. **Install server dependencies**:
```bash
cd server
npm install
```

3. **Install client dependencies**:
```bash
cd ../client
npm install
```

### Running the Application

You'll need two terminal windows:

**Terminal 1 - Start the server**:
```bash
cd server
npm start
```
Server runs on `http://localhost:3001`

**Terminal 2 - Start the client**:
```bash
cd client
npm run dev
```
Client runs on `http://localhost:5173`

## How to Play

### Starting a Game

1. **Create a Room**:
   - Open the app in a browser
   - Click "Create New Game"
   - You'll receive a 4-character room code

2. **Join the Room**:
   - On other devices, enter the room code
   - Click "Join Game"

### Game Views

**Board View** (for players):
- Shows the 5x5 word grid
- Unrevealed cards appear in neutral tan
- Revealed cards show their true colors
- Perfect for displaying on a TV

**Spymaster View** (for spymasters):
- All cards show their assigned colors from the start
- Click cards to reveal them to all players
- Both teams' spymasters can use this view

### Playing

1. Teams take turns giving one-word clues
2. Spymaster clicks cards to reveal them
3. Cards reveal their color to all players
4. First team to reveal all their cards wins
5. Clicking the assassin (black card) loses the game!

### Controls

- **New Game**: Start a fresh game with new words (keeps same room code)
- **End Turn**: Switch to the other team (Spymaster view only)
- **View Toggle**: Switch between Board and Spymaster views

## Game Rules

- **25 Cards Total**:
  - 9 cards for the starting team (randomly chosen)
  - 8 cards for the other team
  - 7 neutral cards
  - 1 assassin card

- **Win Conditions**:
  - Reveal all your team's cards first
  - Opponent clicks the assassin

## Development

### Server (Port 3001)

The server handles:
- Room creation and management
- Game state synchronization
- WebSocket connections
- Card distribution and game logic

### Client (Port 5173)

The client provides:
- Room creation/joining UI
- Game board visualization
- Real-time updates via Socket.io
- Responsive design with Tailwind

### Customization

**Add More Words**: Edit `server/wordBank.js` to add more words to the pool

**Change Colors**: Modify the Tailwind classes in `client/src/components/Card.jsx`

**Adjust Game Rules**: Edit `server/gameLogic.js` to change card distribution

## Troubleshooting

**Cannot connect to server**:
- Ensure the server is running on port 3001
- Check that no other application is using port 3001

**Room not found**:
- Room codes are case-insensitive but must be exact
- Rooms are deleted 1 hour after all players disconnect

**Cards not updating**:
- Check browser console for WebSocket connection errors
- Ensure both client and server are running

## Future Enhancements

Possible improvements:
- Persistent game history
- Custom word lists
- Timer for turns
- Team chat
- Game statistics
- Multiple language support

## License

This is a personal project for learning and entertainment.

---

Enjoy playing Codenames!

import { getRandomWords } from './wordBank.js';

/**
 * Card types in Codenames
 */
export const CardType = {
  RED: 'red',
  BLUE: 'blue',
  NEUTRAL: 'neutral',
  ASSASSIN: 'assassin'
};

/**
 * Generates a random 4-character room code
 */
export function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing characters
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Creates a new game board with 25 cards
 * Returns: { words, cards, firstTeam, redRemaining, blueRemaining }
 */
export function createGameBoard() {
  // Get 25 random words
  const words = getRandomWords(25);

  // Randomly decide which team goes first (gets 9 cards)
  const firstTeam = Math.random() < 0.5 ? CardType.RED : CardType.BLUE;
  const secondTeam = firstTeam === CardType.RED ? CardType.BLUE : CardType.RED;

  // Create array of card types: 9 for first team, 8 for second, 7 neutral, 1 assassin
  const cardTypes = [
    ...Array(9).fill(firstTeam),
    ...Array(8).fill(secondTeam),
    ...Array(7).fill(CardType.NEUTRAL),
    CardType.ASSASSIN
  ];

  // Shuffle the card types
  const shuffledTypes = cardTypes.sort(() => Math.random() - 0.5);

  // Create cards with words and types
  const cards = words.map((word, index) => ({
    word,
    type: shuffledTypes[index],
    revealed: false
  }));

  return {
    words,
    cards,
    firstTeam,
    currentTeam: firstTeam,
    redRemaining: firstTeam === CardType.RED ? 9 : 8,
    blueRemaining: firstTeam === CardType.BLUE ? 9 : 8,
    gameOver: false,
    winner: null
  };
}

/**
 * Reveals a card and updates game state
 * Returns updated game state
 */
export function revealCard(gameState, cardIndex) {
  if (gameState.gameOver || gameState.cards[cardIndex].revealed) {
    return gameState;
  }

  const card = gameState.cards[cardIndex];
  card.revealed = true;

  const newState = { ...gameState };

  // Update remaining counts
  if (card.type === CardType.RED) {
    newState.redRemaining--;
    if (newState.redRemaining === 0) {
      newState.gameOver = true;
      newState.winner = CardType.RED;
    }
    // Switch turn if it wasn't red's turn
    if (newState.currentTeam !== CardType.RED) {
      newState.currentTeam = CardType.RED;
    }
  } else if (card.type === CardType.BLUE) {
    newState.blueRemaining--;
    if (newState.blueRemaining === 0) {
      newState.gameOver = true;
      newState.winner = CardType.BLUE;
    }
    // Switch turn if it wasn't blue's turn
    if (newState.currentTeam !== CardType.BLUE) {
      newState.currentTeam = CardType.BLUE;
    }
  } else if (card.type === CardType.ASSASSIN) {
    // Game over! The team that clicked loses
    newState.gameOver = true;
    newState.winner = newState.currentTeam === CardType.RED ? CardType.BLUE : CardType.RED;
  }
  // Neutral cards don't change the game state beyond being revealed

  return newState;
}

/**
 * Switches to the next team's turn
 */
export function switchTeam(gameState) {
  return {
    ...gameState,
    currentTeam: gameState.currentTeam === CardType.RED ? CardType.BLUE : CardType.RED
  };
}

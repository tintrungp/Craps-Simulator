// Coordinates overall game flow and state
import { clearAllBets } from './bets.js';

// Game state constants
const GAME_STATES = {
    COME_OUT: 'come_out',
    POINT: 'point'
};

// Game state variables
let gameState = GAME_STATES.COME_OUT;
let point = null;

export function initializeGame() {
    gameState = GAME_STATES.COME_OUT;
    point = null;
    clearAllBets();
    updateGameStateDisplay();
}

export function startGame() {
    console.log("Game started");
    initializeGame();
}

export function setPoint(newPoint) {
    gameState = GAME_STATES.POINT;
    point = newPoint;
    updateGameStateDisplay();
}

export function resetPoint() {
    gameState = GAME_STATES.COME_OUT;
    point = null;
    updateGameStateDisplay();
}

export function getGameState() {
    return {
        state: gameState,
        point: point
    };
}

function updateGameStateDisplay() {
    // Update any UI elements that show game state
    // This is a placeholder for actual UI updates
    console.log(`Game state: ${gameState}, Point: ${point}`);
}

// Scoring and balance management
let playerBalance = 1000; // Default starting balance

export function updateBalance(amount) {
    playerBalance += amount;
    updateBalanceDisplay();
    return playerBalance;
}

function updateBalanceDisplay() {
    // Update UI to show current balance
    console.log(`Player balance: $${playerBalance}`);
    // Here you would update a DOM element
}

export function getBalance() {
    return playerBalance;
} 
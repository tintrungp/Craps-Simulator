// Coordinates overall game flow and state
import { clearAllBets, clearFieldBets } from './bets.js';
import { saveBalance } from './balance.js';
import { updateGameStateDisplay } from './ui.js';

// Game state constants
export const GAME_STATES = {
    COME_OUT: 'come_out',
    POINT: 'point'
};

// Game state variables
let gameState = GAME_STATES.COME_OUT;
let point = null;

// Initialize the game
export function initializeGame() {
    gameState = GAME_STATES.COME_OUT;
    point = null;
    clearAllBets();
    updateGameStateDisplay();
}

// Start the game
export function startGame() {
    console.log("Game started");
    initializeGame();
}

// Set the point
export function setPoint(newPoint) {
    gameState = GAME_STATES.POINT;
    point = newPoint;
    updateGameStateDisplay();
}

// Reset the point
export function resetPoint() {
    gameState = GAME_STATES.COME_OUT;
    point = null;
    updateGameStateDisplay();
}

// Get the game state
export function getGameState() {
    return {
        state: gameState,
        point: point
    };
}

// End the game saving the balance
export function endGame() {
    saveBalance();
}

export function handleComeOutRoll(diceSum) {
    switch(diceSum) {
        case 7:
        case 11:
            // Natural winner
            console.log("Natural winner!");
            break;
        case 2:
        case 3:
        case 12:
            // Craps
            clearAllBets();
            console.log("Craps!");
            break;
        default:
            // Point established
            setPoint(diceSum);
            console.log(`Point set to ${diceSum}`);
    }
    clearFieldBets();
    updateGameStateDisplay();
}

export function handlePointRoll(diceSum, currentPoint) {
    if (diceSum === currentPoint) {
        // Point made
        console.log("Point made!");
        resetPoint();
    } else if (diceSum === 7) {
        // Seven out
        console.log("Seven out!");
        clearAllBets();
        resetPoint();
    }
    clearFieldBets();
    updateGameStateDisplay();
}
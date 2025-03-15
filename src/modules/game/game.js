// Coordinates overall game flow and state
import { handleBetsClear, handleFieldBetsClear, handleBalanceSave } from '../betting/betting-display.js';
import { updateGameStateDisplay } from '../ui/ui.js';

// Game state constants
export const GAME_STATES = {
    COME_OUT: 'Come Out',
    POINT: 'Point'
};

// Game state variables
let gameState = GAME_STATES.COME_OUT;
let point = null;

// Pure functions for game state management
export function getGameState() {
    return {
        state: gameState,
        point: point
    };
}

// Pure function to determine come out roll result
export function determineComeOutResult(diceSum) {
    if (diceSum === 7 || diceSum === 11) {
        return { result: 'natural', shouldClearBets: false };
    } else if (diceSum === 2 || diceSum === 3 || diceSum === 12) {
        return { result: 'craps', shouldClearBets: true };
    } else {
        return { result: 'point', newPoint: diceSum, shouldClearBets: false };
    }
}

// Pure function to determine point roll result
export function determinePointResult(diceSum, currentPoint) {
    if (diceSum === currentPoint) {
        return { result: 'point-made', shouldClearBets: false };
    } else if (diceSum === 7) {
        return { result: 'seven-out', shouldClearBets: true };
    } else {
        return { result: 'no-decision', shouldClearBets: false };
    }
}

// Functions that update game state
export function initializeGame() {
    gameState = GAME_STATES.COME_OUT;
    point = null;
    handleBetsClear();
    updateGameStateDisplay();
}

export function handleComeOutRoll(diceSum) {
    const result = determineComeOutResult(diceSum);
    
    if (result.result === 'natural') {
        console.log("Natural winner!");
    } else if (result.result === 'craps') {
        console.log("Craps!");
        handleBetsClear();
    } else {
        setPoint(result.newPoint);
        console.log(`Point set to ${result.newPoint}`);
    }
    
    handleFieldBetsClear();
    updateGameStateDisplay();
}

export function handlePointRoll(diceSum, currentPoint) {
    const result = determinePointResult(diceSum, currentPoint);
    
    if (result.result === 'point-made') {
        console.log("Point made!");
        resetPoint();
    } else if (result.result === 'seven-out') {
        console.log("Seven out!");
        handleBetsClear();
        resetPoint();
    }
    
    handleFieldBetsClear();
    updateGameStateDisplay();
}

// State mutation functions
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

// Start the game
export function startGame() {
    console.log("Game started");
    initializeGame();
}

// End the game saving the balance
export function endGame() {
    handleBalanceSave();
}
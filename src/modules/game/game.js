// Coordinates overall game flow and state
import { handleBetsClear, handleFieldBetsClear, handleBalanceSave } from '../betting/betting-display.js';
import { updateGameStateDisplay } from '../ui/ui.js';

// Game state constants
export const GAME_STATES = {
    COME_OUT: 'Come Out',
    POINT: 'Point'
};

//==============================================================================
// Game State Management
//==============================================================================

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

// State mutation functions
export function setPoint(newPoint) {
    gameState = GAME_STATES.POINT;
    point = newPoint;
}

// Pure function to reset the point
export function resetPoint() {
    gameState = GAME_STATES.COME_OUT;
    point = null;
}

//==============================================================================
// Game State Mutation Functions
//==============================================================================

// Functions that update game state
export function initializeGame() {
    console.log("Initializing game");
    gameState = GAME_STATES.COME_OUT;
    point = null;
    handleBetsClear();
    updateGameStateDisplay();
}

// Functions that handle come out roll results
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

// Functions that handle point roll results
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

// End the game saving the balance
export function endGame() {
    handleBalanceSave();
}
// Handle saving and loading game state
import { getBalance } from '../betting/balance.js';

export function saveGameState() {
    const gameState = {
        balance: getBalance(),
        timestamp: new Date().toISOString()
    };
    
    window.electronAPI.saveScore(gameState);
    return gameState;
}

export function loadGameState() {
    return window.electronAPI.getScore();
}

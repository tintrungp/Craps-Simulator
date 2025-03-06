// Main entry point that imports and coordinates all other modules
import { setupUIHandlers } from './ui.js';
import { initializeGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all game components
    initializeGame();
    setupUIHandlers();
}); 
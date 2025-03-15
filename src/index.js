// Main entry point that imports and coordinates all other modules
import { setupUIHandlers } from './modules/ui/ui.js';
import { initializeGame } from './modules/game/game.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all game components
    initializeGame();
    setupUIHandlers();
}); 
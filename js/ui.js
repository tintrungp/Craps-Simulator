// Handles all UI-related functionality
import { startGame } from './game.js';
import { selectChip, placeBet } from './bets.js';
import { rollDice } from './dice.js';

export function setupUIHandlers() {
    // Start/menu screen handlers
    const setupMenuHandlers = () => {
        const startScreen = document.getElementById('start-screen');
        const gameScreen = document.getElementById('game-screen');
        const startGameBtn = document.getElementById('start-game');
        const viewScoresBtn = document.getElementById('view-scores');
        const viewScoresInGameBtn = document.getElementById('view-scores-ingame');
        const menuButton = document.getElementById('menuButton');
        const menu = document.getElementById('menu');
        const returnToGameBtn = document.getElementById('return-to-game');
        
        // Menu toggle functionality
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('hidden');
        });
        
        // Return to game (close menu)
        returnToGameBtn.addEventListener('click', () => {
            menuButton.setAttribute('aria-expanded', 'false');
            menu.classList.add('hidden');
        });
        
        // Start game button
        startGameBtn.addEventListener('click', () => {
            startScreen.style.display = 'none';
            gameScreen.style.display = 'block';
            startGame();
        });
        
        // View scores functionality
        viewScoresBtn.addEventListener('click', viewScores);
        viewScoresInGameBtn.addEventListener('click', viewScores);
    };
    
    // Chip selection handlers
    const setupChipHandlers = () => {
        const chipButtons = document.querySelectorAll('.chip-button');
        chipButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove selected class from all chips
                chipButtons.forEach(btn => btn.classList.remove('selected'));
                // Add selected class to clicked chip
                button.classList.add('selected');
                
                // Extract chip value and pass to bet handler
                const chipValue = parseInt(button.id.split('-')[1]);
                selectChip(chipValue);
            });
        });
    };
    
    // Betting area handlers
    const setupBetAreaHandlers = () => {
        const betAreas = document.querySelectorAll('.bet-area');
        betAreas.forEach(area => {
            area.addEventListener('click', () => {
                // Get bet type and value from data attributes
                const betType = area.dataset.betType;
                const betValue = area.dataset.betValue;
                const linkedTo = area.dataset.linkedTo;
                const chipStack = area.querySelector('.chip-stack');
                
                // Place bet using the bets module
                placeBet(betType, betValue, linkedTo, chipStack);
            });
        });
    };
    
    // Dice roll handler
    const setupDiceHandler = () => {
        const rollDiceBtn = document.getElementById('roll-dice');
        rollDiceBtn.addEventListener('click', rollDice);
    };
    
    // View scores functionality
    const viewScores = () => {
        // Implement score viewing functionality
        console.log("Viewing scores...");
        // Communicate with the main process or update UI
    };
    
    // Call all setup functions
    setupMenuHandlers();
    setupChipHandlers();
    setupBetAreaHandlers();
    setupDiceHandler();
}

// UI update functions
export function updateChipStack(chipStackElement, totalBet) {
    // Clear existing chips
    chipStackElement.innerHTML = '';
    
    if (totalBet > 0) {
        // Create a chip element showing the total bet
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.textContent = totalBet;
        chipStackElement.appendChild(chip);
    }
}

export function updateDiceDisplay(dice1Value, dice2Value) {
    document.getElementById('dice1').src = `assets/Dice-Green-${dice1Value}.png`;
    document.getElementById('dice2').src = `assets/Dice-Green-${dice2Value}.png`;
} 
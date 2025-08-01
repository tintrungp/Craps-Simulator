// Handles all UI-related functionality
import { initializeGame, endGame, getGameState } from '../game/game.js';
import { rollDice } from '../dice/dice.js';
import { handleComeOutRoll, handlePointRoll, GAME_STATES } from '../game/game.js';
import { handleChipSelection, handleBetPlacement, handleDiceRollResults } from '../betting/betting-display.js';

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
            initializeGame();
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
                handleChipSelection(chipValue);
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
                const betValue = area.dataset.betValue || null;
                const chipStack = area.querySelector('.chip-stack');
                
                // Place bet using the bets module
                handleBetPlacement(betType, betValue, chipStack);
            });
        });
    };
    
    // Dice roll handler
    const setupDiceHandler = () => {
        const rollDiceBtn = document.getElementById('roll-dice');
        rollDiceBtn.addEventListener('click', () => {
            // Roll dice and get basic results
            const { dice1, dice2, diceSum } = rollDice();
            
            // Get game state and process bets
            const { state, point } = getGameState();
            const diceResult = handleDiceRollResults(diceSum, state, point);
            
            // Update balance and UI
            updateBalanceDisplay(diceResult.newBalance);
            
            // Handle game state changes
            if (state === GAME_STATES.COME_OUT) {
                handleComeOutRoll(diceSum);
            } else {
                handlePointRoll(diceSum, point);
            }
        });
    };

    // Cashout Handler
    const setupCashoutHandler = () => {
        const cashoutButton = document.getElementById('cashoutButton');
        cashoutButton.addEventListener('click', endGame);
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
    setupCashoutHandler();
}

// UI update functions
export function updateChipStack(chipStackElement, totalBet) {
    // Clear existing chips
    chipStackElement.innerHTML = '';
    
    if (totalBet > 0) {
        // Create a visual chip stack
        const chipStack = document.createElement('div');
        chipStack.className = 'placed-chip-stack';
        chipStack.style.display = 'flex';
        chipStack.style.flexDirection = 'column';
        chipStack.style.alignItems = 'center';
        chipStack.style.gap = '2px';
        
        // Create chip element showing the total bet
        const chip = document.createElement('div');
        chip.className = 'chip placed-chip';
        chip.textContent = `$${totalBet}`;
        chip.style.animation = 'chipPlace 0.3s ease-out';
        
        chipStack.appendChild(chip);
        chipStackElement.appendChild(chipStack);
        
        // Add pulse effect for new bets
        chipStackElement.style.animation = 'betPlaced 0.5s ease-out';
        setTimeout(() => {
            chipStackElement.style.animation = '';
        }, 500);
    }
}

export function updateDiceDisplay(dice1Value, dice2Value) {
    document.getElementById('dice1').src = `assets/Dice-Green-${dice1Value}.png`;
    document.getElementById('dice2').src = `assets/Dice-Green-${dice2Value}.png`;
} 

export function updateBalanceDisplay(balance) {
    // Update the balance display
    // This is a placeholder for actual UI updates
    console.log(`Balance: $${balance}`);
    document.getElementById('balance-display').textContent = `$${balance}`;
}

// Update the game state display
export function updateGameStateDisplay() {
    const { state, point } = getGameState();

    const gameStateDisplay = document.getElementById('game-state-display');
    const pointDisplay = document.getElementById('point-display');
    
    gameStateDisplay.textContent = `Game State: ${state}`;
    pointDisplay.textContent = `Point: ${point ?? 'No Point'}`;
}     

export function updateBetDisplay(betType, betValue) {
    // For bet types that don't use betValue (single bet areas)
    if (['field', 'dont-come', 'pass-line', 'dont-pass', 'odds-bet'].includes(betType)) {
        const chipStack = document.getElementById(`${betType}-chips`);
        if (chipStack) {
            chipStack.innerHTML = '';
            console.log(`${betType} bet cleared`);
        }
        return;
    }
    
    // For other bet types that use betValue
    const betArea = document.querySelector(`[data-bet-type="${betType}"][data-bet-value="${betValue}"]`);
    if (betArea) {
        const chipStack = betArea.querySelector('.chip-stack');
        if (chipStack) {
            chipStack.innerHTML = '';
            console.log(`Bet ${betType} ${betValue} cleared`);
        }
    }
}
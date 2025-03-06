// Handles dice rolling logic
import { updateDiceDisplay } from './ui.js';
import { processBets } from './payouts.js';

export function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const diceSum = dice1 + dice2;
    
    // Update the UI
    updateDiceDisplay(dice1, dice2);
    
    // Process bets based on dice roll
    processBets(diceSum);
    
    return { dice1, dice2, diceSum };
} 
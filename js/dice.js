// Handles dice rolling logic
import { updateDiceDisplay, updateBalanceDisplay } from './ui.js';

// Roll the dice and update the UI  
export function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const diceSum = dice1 + dice2;
    
    // Update dice display
    updateDiceDisplay(dice1, dice2);
    
    return { dice1, dice2, diceSum };
} 
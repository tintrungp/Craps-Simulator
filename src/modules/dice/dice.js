// Handles dice rolling logic
import { updateDiceDisplay, updateBalanceDisplay } from './ui/ui.js';

// Pure function for generating dice values
export function generateDiceRoll() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const diceSum = dice1 + dice2;
    return { dice1, dice2, diceSum };
}

// Function that handles both rolling and UI updates
export function rollDice() {
    const diceValues = generateDiceRoll();
    updateDiceDisplay(diceValues.dice1, diceValues.dice2);
    return diceValues;
} 
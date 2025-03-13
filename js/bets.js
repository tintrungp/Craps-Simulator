// Handles bet management
import { updateChipStack, updateBetDisplay } from './ui.js';

// State management for bets
let selectedChipValue = null;
const bets = new Map(); // Store bet amounts for each betting area

// Select a chip to bet with 
export function selectChip(value) {
    selectedChipValue = value;
    console.log('Selected chip value:', selectedChipValue);
}

// Place a bet on a specific betting area   
export function placeBet(betType, betValue, linkedTo, chipStackElement) {
    if (!selectedChipValue) {
        console.log('Please select a chip first');
        return false;
    }
    
    // Create a unique key for this bet
    const betKey = betValue ? `${betType}-${betValue}` : betType;
    
    // Get or initialize current bet amount
    let currentBet = bets.get(betKey) || 0;
    currentBet += selectedChipValue;
    bets.set(betKey, currentBet);
    
    // Update visual chip stack
    updateChipStack(chipStackElement, currentBet);
    
    console.log(`Bet placed on ${betKey}: Total bet = ${currentBet}`);
    return true;
}

// Get all bets
export function getBets() {
    return bets;
}

// Clear all bets
export function clearAllBets() {
    bets.forEach((betAmount, betKey) => {
        // Check if the bet is a place bet
        if (betKey.includes('place')) {
            const [betType, betValue] = betKey.split('-');
            updateBetDisplay(betType, betValue);
        } else {
            // For bet types without a value (field, pass-line, etc.)
            updateBetDisplay(betKey, null);
        }
    });
    bets.clear();
}

// Clear Field bets
export function clearFieldBets() {
    // Find and remove the field bet if it exists
    if (bets.has('field')) {
        updateBetDisplay('field', null);
        bets.delete('field');
    }
}

// Clear a specific bet 
export function clearBet(betKey) {
    if (bets.has(betKey)) {
        bets.delete(betKey);
        return true;
    }
    return false;
} 
// Handles bet management
import { updateChipStack } from './ui.js';

// State management for bets
let selectedChipValue = null;
const bets = new Map(); // Store bet amounts for each betting area

export function selectChip(value) {
    selectedChipValue = value;
    console.log('Selected chip value:', selectedChipValue);
}

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

export function getBets() {
    return bets;
}

export function clearAllBets() {
    bets.clear();
    // Update UI to clear all chip stacks
    document.querySelectorAll('.chip-stack').forEach(stack => {
        updateChipStack(stack, 0);
    });
}

export function clearBet(betKey) {
    if (bets.has(betKey)) {
        bets.delete(betKey);
        return true;
    }
    return false;
} 
// Handles bet management
import { updateChipStack, updateBetDisplay } from '../ui/ui.js';

// ===============================
// Pure Logic / State Management
// ===============================

let selectedChipValue = null;
const bets = new Map(); // Store bet amounts for each betting area

export function getSelectedChip() {
    return selectedChipValue;
}

export function selectChip(value) {
    selectedChipValue = value;
    console.log('Selected chip value:', selectedChipValue);
}

export function getBets() {
    return bets;
}

export function calculateBetAmount(currentBet, chipValue) {
    return (currentBet || 0) + chipValue;
}

// ===============================
// UI Control / Side Effects
// ===============================

// Place a bet on a specific betting area   
export function placeBet(betType, betValue, chipStackElement) {
    if (!selectedChipValue) {
        console.log('Please select a chip first');
        return false;
    }
    
    // Pure logic
    const betKey = betValue ? `${betType}-${betValue}` : betType;
    const currentBet = bets.get(betKey) || 0;
    const newBetAmount = calculateBetAmount(currentBet, selectedChipValue);
    bets.set(betKey, newBetAmount);
    
    // UI updates
    updateChipStack(chipStackElement, newBetAmount);
    console.log(`Bet placed on ${betKey}: Total bet = ${newBetAmount}`);
    return true;
}

// Clear all bets and update UI
export function clearAllBets() {
    // Pure logic
    bets.clear();
    
    // UI updates
    document.querySelectorAll('.bet-area').forEach(area => {
        const betType = area.dataset.betType;
        const betValue = area.dataset.betValue;
        updateBetDisplay(betType, betValue);
    });
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
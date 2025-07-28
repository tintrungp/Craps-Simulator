const bets = new Map(); // Store bet amounts for each betting area
let selectedChip = null; // Store the currently selected chip value

export function getBets() {
    return new Map(bets); // Return a copy to maintain immutability
}

// Chip selection functions
export function selectChip(chipValue) {
    selectedChip = chipValue;
}

export function getSelectedChip() {
    return selectedChip;
}

export function calculateBetAmount(currentBet, chipValue) {
    return (currentBet || 0) + chipValue;
}

// Place a bet on a specific betting area   
export function placeBet(betType, betValue) {
    // Return false if no chip is selected
    if (selectedChip === null) {
        return false;
    }
    
    // Construct the bet key
    const betKey = betValue ? `${betType}-${betValue}` : betType;
    
    const currentBet = bets.get(betKey) || 0;
    const newBetAmount = currentBet + selectedChip;
    bets.set(betKey, newBetAmount);
    return newBetAmount;
}

// Clear all bets and update UI
export function clearAllBets() {
    bets.clear();
}

// Clear Field bets
export function clearFieldBets() {
    bets.delete('field');
}
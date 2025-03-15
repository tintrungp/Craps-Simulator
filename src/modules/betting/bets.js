const bets = new Map(); // Store bet amounts for each betting area

export function getBets() {
    return new Map(bets); // Return a copy to maintain immutability
}

export function calculateBetAmount(currentBet, chipValue) {
    return (currentBet || 0) + chipValue;
}

// Place a bet on a specific betting area   
export function placeBet(betKey, chipValue) {
    const currentBet = bets.get(betKey) || 0;
    const newBetAmount = currentBet + chipValue;
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
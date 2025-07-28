// Handles all UI interactions and side effects for betting
import { updateChipStack, updateBetDisplay, updateBalanceDisplay } from '../ui/ui.js';
import * as BetsManager from './bets.js';
import * as PayoutsManager from './payouts.js';
import * as BalanceManager from './balance.js';

// State that's specific to UI interaction
let selectedChipValue = null;

// UI-related functions
export function handleChipSelection(value) {
    selectedChipValue = value;
    console.log('Selected chip value:', selectedChipValue);
}

export function handleBetPlacement(betType, betValue, chipStackElement) {
    if (!selectedChipValue) {
        console.log('Please select a chip first');
        return false;
    }
    
    const betKey = betValue ? `${betType}-${betValue}` : betType;
    const newBetAmount = BetsManager.placeBet(betKey, selectedChipValue);
    
    // UI updates
    updateChipStack(chipStackElement, newBetAmount);
    console.log(`Bet placed on ${betKey}: Total bet = ${newBetAmount}`);
    return true;
}

export function handleBetsClear() {
    BetsManager.clearAllBets();
    
    // UI updates
    document.querySelectorAll('.bet-area').forEach(area => {
        const betType = area.dataset.betType;
        const betValue = area.dataset.betValue;
        updateBetDisplay(betType, betValue);
    });
}

export function handleFieldBetsClear() {
    BetsManager.clearFieldBets();
    updateBetDisplay('field', null);
}

export function handleDiceRollResults(diceSum, gameState, point = null) {
    const bets = BetsManager.getBets();
    const payoutResult = PayoutsManager.calculatePayouts(bets, diceSum, gameState, point);
    const newBalance = BalanceManager.updateBalance(payoutResult.totalWinnings);
    
    // Log results
    payoutResult.results.forEach(({ betKey, payout }) => {
        if (payout > 0) {
            console.log(`Winner! Payout for ${betKey}: ${payout}`);
        } else if (payout < 0) {
            console.log(`Loser! Loss for ${betKey}: ${Math.abs(payout)}`);
        }
    });
    
    // Update UI
    updateBalanceDisplay(newBalance);
    return newBalance;
}

export function handleBalanceSave() {
    const balance = BalanceManager.getBalance();
    window.electronAPI.saveScore(balance);
    console.log(`Balance saved: ${balance}`);
}

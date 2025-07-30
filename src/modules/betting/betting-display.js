// Handles all UI interactions and side effects for betting
import { updateChipStack, updateBetDisplay, updateBalanceDisplay } from '../ui/ui.js';
import * as BetsManager from './bets.js';
import * as PayoutsManager from './payouts.js';
import * as BalanceManager from './balance.js';

// Animate chip from selection area to bet area
function animateChipToBetArea(chipValue, targetElement) {
    // Get the source chip button
    const sourceChip = document.getElementById(`chip-${chipValue}`);
    if (!sourceChip || !targetElement) return;
    
    // Create animated chip element
    const animatedChip = document.createElement('div');
    animatedChip.className = `chip-button chip-${chipValue}`;
    animatedChip.style.position = 'fixed';
    animatedChip.style.width = '64px';
    animatedChip.style.height = '64px';
    animatedChip.style.zIndex = '1000';
    animatedChip.style.pointerEvents = 'none';
    animatedChip.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Get positions
    const sourceRect = sourceChip.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    
    // Set initial position
    animatedChip.style.left = sourceRect.left + 'px';
    animatedChip.style.top = sourceRect.top + 'px';
    
    // Add to document
    document.body.appendChild(animatedChip);
    
    // Trigger animation after a small delay
    setTimeout(() => {
        animatedChip.style.left = (targetRect.left + targetRect.width/2 - 32) + 'px';
        animatedChip.style.top = (targetRect.top + targetRect.height/2 - 32) + 'px';
        animatedChip.style.transform = 'scale(0.8)';
        animatedChip.style.opacity = '0.8';
    }, 50);
    
    // Remove animated element after animation
    setTimeout(() => {
        if (animatedChip.parentNode) {
            animatedChip.parentNode.removeChild(animatedChip);
        }
    }, 650);
}

// State that's specific to UI interaction
let selectedChipValue = null;

// UI-related functions
export function handleChipSelection(value) {
    selectedChipValue = value;
    // Sync with BetsManager
    BetsManager.selectChip(value);
    console.log('Selected chip value:', selectedChipValue);
}

export function handleBetPlacement(betType, betValue, chipStackElement) {
    if (!selectedChipValue) {
        console.log('Please select a chip first');
        return false;
    }
    
    // Fix: Use betType and betValue correctly
    const newBetAmount = BetsManager.placeBet(betType, betValue);
    
    if (newBetAmount === false) {
        console.log('No chip selected in BetsManager');
        return false;
    }
    
    // Create visual chip animation
    animateChipToBetArea(selectedChipValue, chipStackElement);
    
    // UI updates
    updateChipStack(chipStackElement, newBetAmount);
    console.log(`Bet placed on ${betType}${betValue ? '-' + betValue : ''}: Total bet = ${newBetAmount}`);
    
    // Deduct bet amount from balance
    BalanceManager.updateBalance(-selectedChipValue);
    updateBalanceDisplay(BalanceManager.getBalance());
    
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

// Clear only losing bets based on payout results
export function handleSelectiveBetsClear(payoutResults) {
    const losingBets = payoutResults
        .filter(result => result.payout < 0)
        .map(result => result.betKey);
    
    BetsManager.clearLosingBets(losingBets);
    
    // UI updates for cleared bets
    losingBets.forEach(betKey => {
        const [betType, betValue] = betKey.split('-');
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
    
    // Clear losing bets selectively
    handleSelectiveBetsClear(payoutResult.results);
    
    // Update UI
    updateBalanceDisplay(newBalance);
    return { newBalance, payoutResults: payoutResult.results };
}

export function handleBalanceSave() {
    const balance = BalanceManager.getBalance();
    window.electronAPI.saveScore(balance);
    console.log(`Balance saved: ${balance}`);
}

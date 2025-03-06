// Handles payout calculations for different bet types
import { getBets } from './bets.js';

// Payout ratios for different bet types
const PAYOUT_RATIOS = {
    place: {
        4: 1.8,  // 9:5 odds
        10: 1.8,
        5: 1.4,  // 7:5 odds
        9: 1.4,
        6: 1.167, // 7:6 odds
        8: 1.167
    },
    field: {
        2: 2,
        12: 2,
        3: 1,
        4: 1,
        9: 1,
        10: 1,
        11: 1,
        5: -1,
        6: -1,
        8: -1
    },
    // Add other bet type ratios here
};

export function processBets(diceSum) {
    const bets = getBets();
    let totalWinnings = 0;
    
    bets.forEach((betAmount, betKey) => {
        const [betType, betValue] = betKey.split('-');
        let payout = calculatePayout(betType, betValue, diceSum, betAmount);
        
        if (payout > 0) {
            console.log(`Winner! Payout for ${betKey}: ${payout}`);
            totalWinnings += payout;
        } else if (payout < 0) {
            console.log(`Loser! Loss for ${betKey}: ${Math.abs(payout)}`);
            totalWinnings += payout;
        }
    });
    
    // Here you would update the player's balance
    console.log(`Total winnings for this roll: ${totalWinnings}`);
    return totalWinnings;
}

function calculatePayout(betType, betValue, diceSum, betAmount) {
    // Process place bets
    if (betType === 'place' && PAYOUT_RATIOS.place[diceSum]) {
        if (parseInt(betValue) === diceSum) {
            return betAmount * PAYOUT_RATIOS.place[diceSum];
        }
    }
    
    // Process field bets
    if (betType === 'field' && PAYOUT_RATIOS.field[diceSum]) {
        return betAmount * PAYOUT_RATIOS.field[diceSum];
    }
    
    // Process pass line bets
    if (betType === 'pass-line') {
        if (diceSum === 7 || diceSum === 11) {
            return betAmount;
        } else if (diceSum === 2 || diceSum === 3 || diceSum === 12) {
            return -betAmount;
        }
    }
    
    // Process don't pass bets
    if (betType === 'dont-pass') {
        if (diceSum === 2 || diceSum === 3) {
            return betAmount;
        } else if (diceSum === 7 || diceSum === 11 || diceSum === 12) {
            return -betAmount;
        }
    }
    
    // If no payout condition is met
    return 0;
} 
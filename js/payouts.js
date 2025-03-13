// Handles payout calculations for different bet types
import { getBets } from './bets.js';
import { getBalance } from './balance.js';

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
    odds: {
        4: 2, // 2:1 odds   
        5: 1.5, // 3:2 odds
        6: 1.2, // 6:5 odds
        8: 1.2, // 6:5 odds
        9: 1.5, // 3:2 odds
        10: 2 // 2:1 odds
    }
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
    
    return { totalWinnings, newBalance: getBalance() + totalWinnings };
}

function calculatePayout(betType, betValue, diceSum, betAmount) {
    // Process place bets
    if (betType === 'place' && PAYOUT_RATIOS.place[diceSum]) {
        if (parseInt(betValue) === diceSum) {
            return betAmount * PAYOUT_RATIOS.place[diceSum];
        }
    }
    
    // Process field bets
    if (betType === 'field') {
        // Field bet is a single bet type that wins on 2,3,4,9,10,11,12 and loses on 5,6,7,8
        if ([2, 3, 4, 9, 10, 11, 12].includes(diceSum)) {
            // Double payout for 2 and 12
            if (diceSum === 2 || diceSum === 12) {
                return betAmount * 2;
            } else {
                return betAmount;
            }
        } else if ([5, 6, 7, 8].includes(diceSum)) {
            return -betAmount;
        }
    }
    
    // Process pass line bets
    if (betType === 'pass-line' || betType === 'come') {
        if (diceSum === 7 || diceSum === 11) {
            return betAmount;
        } else if (diceSum === 2 || diceSum === 3 || diceSum === 12) {
            return -betAmount;
        }
    }
    
    // Process don't pass bets
    if (betType === 'dont-pass' || betType === 'dont-come') {
        if (diceSum === 2 || diceSum === 3) {
            return betAmount;
        } else if (diceSum === 7 || diceSum === 11 || diceSum === 12) {
            return -betAmount;
        }
    }
    
    // If no payout condition is met
    console.log(`No payout for ${betType} ${betValue}, diceSum: ${diceSum}`);
    return 0;
} 
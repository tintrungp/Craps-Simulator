// Payout ratios for different bet types
const PAYOUT_RATIOS = {
    place: {
        4: 1.8, 10: 1.8,    // 9:5 odds
        5: 1.4, 9: 1.4,     // 7:5 odds
        6: 1.167, 8: 1.167  // 7:6 odds
    },
    odds: {
        4: 2, 10: 2,     // 2:1 odds
        5: 1.5, 9: 1.5,  // 3:2 odds
        6: 1.2, 8: 1.2   // 6:5 odds
    }
};

export function calculatePayouts(bets, diceSum) {
    const results = [];
    let totalWinnings = 0;

    bets.forEach((betAmount, betKey) => {
        const payout = calculateSinglePayout(betKey, betAmount, diceSum);
        results.push({ betKey, payout });
        totalWinnings += payout;
    });

    return {
        results,
        totalWinnings
    };
}

function calculateSinglePayout(betKey, betAmount, diceSum) {
    const [betType, betValue] = betKey.split('-');
    
    // Place bets
    if (betType === 'place' && PAYOUT_RATIOS.place[diceSum]) {
        if (parseInt(betValue) === diceSum) {
            return betAmount * PAYOUT_RATIOS.place[diceSum];
        }
    }
    
    // Field bets
    if (betType === 'field') {
        if ([2, 3, 4, 9, 10, 11, 12].includes(diceSum)) {
            return betAmount * (diceSum === 2 || diceSum === 12 ? 2 : 1);
        }
        if ([5, 6, 7, 8].includes(diceSum)) {
            return -betAmount;
        }
    }
    
    // Pass line bets
    if (betType === 'pass-line' || betType === 'come') {
        if (diceSum === 7 || diceSum === 11) return betAmount;
        if (diceSum === 2 || diceSum === 3 || diceSum === 12) return -betAmount;
    }
    
    // Don't pass bets
    if (betType === 'dont-pass' || betType === 'dont-come') {
        if (diceSum === 2 || diceSum === 3) return betAmount;
        if (diceSum === 7 || diceSum === 11 || diceSum === 12) return -betAmount;
    }
    
    return 0;
}
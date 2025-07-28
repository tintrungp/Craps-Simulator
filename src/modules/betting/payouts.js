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

export function calculatePayouts(bets, diceSum, gameState, point = null) {
    const results = [];
    let totalWinnings = 0;

    bets.forEach((betAmount, betKey) => {
        const payout = calculateSinglePayout(betKey, betAmount, diceSum, gameState, point);
        results.push({ betKey, payout });
        totalWinnings += payout;
    });

    return {
        results,
        totalWinnings
    };
}

function calculateSinglePayout(betKey, betAmount, diceSum, gameState, point) {
    const [betType, betValue] = betKey.split('-');
    
    // Place bets
    if (betType === 'place') {
        if (diceSum === 7) {
            return -betAmount; // Place bets lose on seven
        }
        if (PAYOUT_RATIOS.place[diceSum] && parseInt(betValue) === diceSum) {
            return betAmount * PAYOUT_RATIOS.place[diceSum];
        }
    }
    
    // Field bets
    if (betType === 'field') {
        if ([2, 3, 4, 9, 10, 11, 12].includes(diceSum)) {
            if (diceSum === 12) {
                return betAmount * 3; // 12 pays 3:1 (triple)
            } else if (diceSum === 2) {
                return betAmount * 2; // 2 pays 2:1 (double)
            } else {
                return betAmount; // Even money for 3,4,9,10,11
            }
        }
        if ([5, 6, 7, 8].includes(diceSum)) {
            return -betAmount;
        }
    }
    
    // Pass line bets
    if (betKey === 'pass-line' || betType === 'come') {
        if (gameState === 'Come Out') {
            if (diceSum === 7 || diceSum === 11) return betAmount;
            if (diceSum === 2 || diceSum === 3 || diceSum === 12) return -betAmount;
        } else if (gameState === 'Point') {
            // During point phase, pass line wins if point is made, loses on 7
            if (diceSum === point) return betAmount; // Point made - win
            if (diceSum === 7) return -betAmount; // Seven out - lose
        }
    }
    
    // Don't pass bets
    if (betKey === 'dont-pass' || betType === 'dont-come') {
        if (gameState === 'Come Out') {
            if (diceSum === 2 || diceSum === 3) return betAmount;
            if (diceSum === 7 || diceSum === 11) return -betAmount;
            if (diceSum === 12) return 0; // Push on 12
        } else if (gameState === 'Point') {
            // During point phase, don't pass loses if point is made, wins on 7
            if (diceSum === point) return -betAmount; // Point made - lose
            if (diceSum === 7) return betAmount; // Seven out - win
        }
    }
    
    return 0;
}
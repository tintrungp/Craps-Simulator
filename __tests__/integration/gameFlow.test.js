import { 
    initializeGame, 
    handleComeOutRoll, 
    handlePointRoll,
    getGameState,
    GAME_STATES 
} from '../../src/modules/game/game.js';

import { 
    selectChip, 
    placeBet, 
    getBets, 
    clearAllBets 
} from '../../src/modules/betting/bets.js';

import { 
    getBalance, 
    updateBalance,
    resetBalance 
} from '../../src/modules/betting/balance.js';

// Mock UI updates
jest.mock('../../js/ui.js', () => ({
    updateGameStateDisplay: jest.fn(),
    updateChipStack: jest.fn(),
    updateDiceDisplay: jest.fn(),
    updateBalanceDisplay: jest.fn(),
    updateBetDisplay: jest.fn()
}));

describe('Game Flow Integration', () => {
    let chipStackElement;

    beforeEach(() => {
        initializeGame();
        resetBalance(1000);
        clearAllBets();
        chipStackElement = document.createElement('div');
    });

    describe('Come Out Roll Phase', () => {
        beforeEach(() => {
            selectChip(10);
            placeBet('pass-line', null, chipStackElement);
        });

        test('natural winner (7 or 11) resolves pass line bet', () => {
            handleComeOutRoll(7);
            expect(getBalance()).toBe(1010); // Win 1:1
            expect(getBets().size).toBe(1); // Non-Field bets should stay
            expect(getBets().get('pass-line')).toBe(10); // Pass line bet stays
            expect(getGameState().state).toBe(GAME_STATES.COME_OUT);
        });

        test('craps (2, 3, or 12) loses pass line bet', () => {
            handleComeOutRoll(2);
            expect(getBalance()).toBe(990); // Lose bet
            expect(getBets().size).toBe(0);
            expect(getGameState().state).toBe(GAME_STATES.COME_OUT);
        });

        test('point is established on other numbers', () => {
            handleComeOutRoll(4);
            const gameState = getGameState();
            expect(gameState.state).toBe(GAME_STATES.POINT);
            expect(gameState.point).toBe(4);
            expect(getBets().get('pass-line')).toBe(10); // Pass line bet stays
        });
    });

    describe('Point Phase', () => {
        beforeEach(() => {
            selectChip(10);
            placeBet('pass-line', null, chipStackElement);
            handleComeOutRoll(6); // Establish point of 6
        });

        test('making the point wins pass line bet', () => {
            handlePointRoll(6, 6);
            expect(getBalance()).toBe(1010); // Win 1:1
            expect(getBets().size).toBe(1); // Non-Field bets should stay
            expect(getBets().get('pass-line')).toBe(10); // Pass line bet stays
            expect(getGameState().state).toBe(GAME_STATES.COME_OUT);
        });

        test('seven out loses pass line bet', () => {
            handlePointRoll(7, 6);
            expect(getBalance()).toBe(990); // Lose bet
            expect(getBets().size).toBe(0);
            expect(getGameState().state).toBe(GAME_STATES.COME_OUT);
        });

        test('other numbers continue point phase', () => {
            handlePointRoll(5, 6);
            const gameState = getGameState();
            expect(gameState.state).toBe(GAME_STATES.POINT);
            expect(gameState.point).toBe(6);
            expect(getBets().get('pass-line')).toBe(10); // Bet stays
        });
    });

    describe('Complex Betting Scenarios', () => {
        test('multiple bets across different rolls', () => {
            // Place initial pass line bet
            selectChip(10);
            placeBet('pass-line', getSelectedChip(), chipStackElement);
            
            // Establish point
            handleComeOutRoll(6);
            expect(getGameState().point).toBe(6);
            
            // Place additional bets during point phase
            selectChip(5);
            placeBet('place', '8', chipStackElement);
            placeBet('field', null, chipStackElement);
            
            // Roll that hits place bet
            handlePointRoll(8, 6);
            expect(getBalance()).toBe(1007); // Win on place 8 (7:6)
            expect(getBets().get('pass-line')).toBe(10); // Pass line stays
            expect(getBets().has('field')).toBe(false); // Field bet resolved
            
            // Seven out
            handlePointRoll(7, 6);
            expect(getBalance()).toBe(987); // Lose pass line and place bets
            expect(getBets().size).toBe(0); // All bets cleared
        });
    });

    describe('Error Conditions', () => {
        test('handles insufficient balance for bet', () => {
            resetBalance(5);
            selectChip(10);
            const result = placeBet('pass-line', null, chipStackElement);
            expect(result).toBe(false);
            expect(getBalance()).toBe(5);
        });

        test('prevents invalid bet amounts', () => {
            selectChip(-10);
            const result = placeBet('pass-line', null, chipStackElement);
            expect(result).toBe(false);
            expect(getBets().size).toBe(0);
        });
    });
});

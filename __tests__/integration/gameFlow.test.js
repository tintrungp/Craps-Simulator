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
    resetBalance 
} from '../../src/modules/betting/balance.js';

// Mock UI-related functions to focus on pure functionality
jest.mock('../../src/modules/ui/ui.js', () => ({
    updateGameStateDisplay: jest.fn(),
    updateChipStack: jest.fn(),
    updateDiceDisplay: jest.fn(),
    updateBalanceDisplay: jest.fn(),
    updateBetDisplay: jest.fn()
}));

// Don't mock betting display functions - we want to test the integration

describe('Game Flow Integration', () => {
    beforeEach(() => {
        initializeGame();
        resetBalance(1000);
        clearAllBets();
    });

    describe('Come Out Roll Phase', () => {
        beforeEach(() => {
            selectChip(10);
            placeBet('pass-line', null);
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
            placeBet('pass-line', null);
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

    describe('Multiple Bet Scenarios', () => {
        test('field bet resolves each roll', () => {
            // Place pass line and field bet
            selectChip(10);
            placeBet('pass-line', null);
            placeBet('field', null);
            
            // Field win (2)
            handleComeOutRoll(2);
            expect(getBalance()).toBe(1010); // Lose 10 on pass line, win 20 on field
            expect(getBets().has('field')).toBe(false); // Field bet resolved
            
            // Place new bets for second roll
            selectChip(10);
            placeBet('pass-line', null);
            placeBet('field', null);
            
            // Field loss (7)
            handleComeOutRoll(7);
            expect(getBalance()).toBe(1010); // Win 10 on pass line, lose 10 on field
            expect(getBets().has('field')).toBe(false); // Field bet resolved
        });
        
        test('place bets work during point phase', () => {
            // Establish point
            selectChip(10);
            placeBet('pass-line', null);
            handleComeOutRoll(6); // Point is 6
            
            // Add place bets
            selectChip(5);
            placeBet('place', '8');
            
            // Roll hits place bet
            handlePointRoll(8, 6);
            expect(getBalance()).toBeGreaterThan(1000); // Should win on place 8
            expect(getBets().get('pass-line')).toBe(10); // Pass line stays
            expect(getBets().get('place-8')).toBe(5); // Place bet stays
            
            // Roll doesn't hit anything
            handlePointRoll(5, 6);
            const balanceAfter5 = getBalance();
            
            // Seven out
            handlePointRoll(7, 6);
            expect(getBalance()).toBe(balanceAfter5 - 15); // Lose both bets
            expect(getBets().size).toBe(0); // All bets cleared
        });
    });

    describe('Dont Pass Bets', () => {
        test('dont pass wins on come out craps', () => {
            selectChip(10);
            placeBet('dont-pass', null);
            handleComeOutRoll(2);
            expect(getBalance()).toBe(1010); // Win on 2
            expect(getBets().get('dont-pass')).toBe(10); // Bet stays
        });
        
        test('dont pass pushes on come out 12', () => {
            selectChip(10);
            placeBet('dont-pass', null);
            handleComeOutRoll(12);
            expect(getBalance()).toBe(1000); // Push on 12
            expect(getBets().get('dont-pass')).toBe(10); // Bet stays
        });
        
        test('dont pass loses on come out natural', () => {
            selectChip(10);
            placeBet('dont-pass', null);
            handleComeOutRoll(7);
            expect(getBalance()).toBe(990); // Lose on 7
            expect(getBets().size).toBe(0); // Bet removed
        });
        
        test('dont pass wins on seven out', () => {
            selectChip(10);
            placeBet('dont-pass', null);
            handleComeOutRoll(4); // Point is 4
            handlePointRoll(7, 4); // Seven out
            expect(getBalance()).toBe(1010); // Win on seven out
            expect(getBets().size).toBe(0); // All bets cleared
        });
    });

    describe('Game State Transitions', () => {
        test('game transitions from come out to point and back', () => {
            // Initial state
            expect(getGameState().state).toBe(GAME_STATES.COME_OUT);
            
            // Establish point
            selectChip(10);
            placeBet('pass-line', null);
            handleComeOutRoll(6);
            expect(getGameState().state).toBe(GAME_STATES.POINT);
            expect(getGameState().point).toBe(6);
            
            // Make point and return to come out
            handlePointRoll(6, 6);
            expect(getGameState().state).toBe(GAME_STATES.COME_OUT);
            expect(getGameState().point).toBeNull();
            
            // Establish new point
            handleComeOutRoll(8);
            expect(getGameState().state).toBe(GAME_STATES.POINT);
            expect(getGameState().point).toBe(8);
            
            // Seven out and return to come out
            handlePointRoll(7, 8);
            expect(getGameState().state).toBe(GAME_STATES.COME_OUT);
            expect(getGameState().point).toBeNull();
        });
    });
});

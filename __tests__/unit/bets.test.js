import { 
    getBets, 
    clearAllBets, 
    placeBet, 
    selectChip,
    getSelectedChip,
    calculateBetAmount
} from '../../src/modules/betting/bets.js';

import { getBalance, updateBalance } from '../../src/modules/betting/balance.js';

// Mock UI-related functions
jest.mock('../../src/modules/ui/ui.js', () => ({
    updateChipStack: jest.fn()
}));

describe('Bets Module', () => {
    beforeEach(() => {
        clearAllBets();
        selectChip(null);
        // Reset balance for testing
        updateBalance(1000 - getBalance());
    });

    describe('getBets', () => {
        test('returns empty map initially', () => {
            expect(getBets().size).toBe(0);
        });

        test('returns copy of bets to maintain immutability', () => {
            selectChip(10);
            placeBet('pass-line', null);
            const bets = getBets();
            bets.delete('pass-line');
            expect(getBets().has('pass-line')).toBe(true);
        });
    });

    describe('placeBet', () => {
        test('places bet when chip is selected', () => {
            selectChip(10);
            placeBet('pass-line', null);
            expect(getBets().get('pass-line')).toBe(10);
        });

        test('accumulates multiple bets on same area', () => {
            selectChip(10);
            placeBet('pass-line', null);
            placeBet('pass-line', null);
            expect(getBets().get('pass-line')).toBe(20);
        });

        test('returns false when no chip is selected', () => {
            const result = placeBet('pass-line', null);
            expect(result).toBe(false);
            expect(getBets().size).toBe(0);
        });

        test('constructs correct key for place bets', () => {
            selectChip(5);
            placeBet('place', '6');
            expect(getBets().get('place-6')).toBe(5);
        });
    });

    describe('calculateBetAmount', () => {
        test('adds chip value to current bet', () => {
            expect(calculateBetAmount(10, 5)).toBe(15);
        });

        test('handles undefined current bet', () => {
            expect(calculateBetAmount(undefined, 5)).toBe(5);
        });
    });

    describe('clearAllBets', () => {
        test('removes all bets', () => {
            selectChip(10);
            placeBet('pass-line', null);
            placeBet('field', null);
            clearAllBets();
            expect(getBets().size).toBe(0);
        });
    });

    describe('chip selection', () => {
        test('selects and retrieves chip value', () => {
            selectChip(5);
            expect(getSelectedChip()).toBe(5);
        });

        test('can clear selection with null', () => {
            selectChip(5);
            selectChip(null);
            expect(getSelectedChip()).toBeNull();
        });
    });
});

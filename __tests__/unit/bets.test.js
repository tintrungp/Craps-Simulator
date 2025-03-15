import { 
    selectChip, 
    placeBet, 
    getBets, 
    clearAllBets, 
    getSelectedChip,
    calculateBetAmount 
} from '../../src/modules/betting/bets.js';

// Only mock UI functions since we know they're needed for UI control functions
jest.mock('../../js/ui.js', () => ({
    updateChipStack: jest.fn(),
    updateBetDisplay: jest.fn()
}));

describe('Bets Module', () => {
    beforeEach(() => {
        clearAllBets();
        selectChip(null);
    });

    describe('selectChip', () => {
        test('should set selected chip value', () => {
            selectChip(5);
            expect(getSelectedChip()).toBe(5);
        });

        test('should allow changing selected chip', () => {
            selectChip(5);
            expect(getSelectedChip()).toBe(5);
            selectChip(10);
            expect(getSelectedChip()).toBe(10);
        });

        test('should allow clearing selected chip', () => {
            selectChip(5);
            selectChip(null);
            expect(getSelectedChip()).toBeNull();
        });
    });

    describe('placeBet', () => {
        beforeEach(() => {
            selectChip(5);
        });

        test('should not place bet if no chip selected', () => {
            selectChip(null);
            expect(placeBet('place', '6')).toBe(false);
            expect(getBets().size).toBe(0);
        });

        test('should place bet with selected chip value', () => {
            placeBet('place', '6');
            const bets = getBets();
            expect(bets.get('place-6')).toBe(5);
        });

        test('should accumulate multiple bets on same area', () => {
            placeBet('place', '6');
            placeBet('place', '6');
            const bets = getBets();
            expect(bets.get('place-6')).toBe(10);
        });

        test('should handle different bet types', () => {
            placeBet('place', '6');
            placeBet('field');
            const bets = getBets();
            expect(bets.get('place-6')).toBe(5);
            expect(bets.get('field')).toBe(5);
        });
    });

    describe('clearAllBets', () => {
        test('should remove all bets', () => {
            selectChip(5);
            placeBet('place', '6');
            placeBet('field');
            clearAllBets();
            const bets = getBets();
            expect(bets.size).toBe(0);
        });
    });

    describe('getBets', () => {
        test('should return empty Map when no bets placed', () => {
            const bets = getBets();
            expect(bets.size).toBe(0);
        });

        test('should return Map with all placed bets', () => {
            selectChip(5);
            placeBet('place', '6');
            placeBet('field');
            const bets = getBets();
            expect(bets.size).toBe(2);
            expect(bets.get('place-6')).toBe(5);
            expect(bets.get('field')).toBe(5);
        });
    });

    describe('getSelectedChip', () => {
        test('should return null initially', () => {
            expect(getSelectedChip()).toBeNull();
        });

        test('should return current selected chip value', () => {
            selectChip(5);
            expect(getSelectedChip()).toBe(5);
        });
    });

    describe('Pure Logic', () => {
        test('calculateBetAmount adds correctly', () => {
            expect(calculateBetAmount(10, 5)).toBe(15);
        });

        test('getSelectedChip returns current chip', () => {
            selectChip(5);
            expect(getSelectedChip()).toBe(5);
        });
    });

    describe('UI Control', () => {
        test('placeBet updates UI and state', () => {
            selectChip(5);
            const chipStack = document.createElement('div');
            expect(placeBet('place', '6', chipStack)).toBe(true);
            expect(getBets().get('place-6')).toBe(5);
        });
    });
});

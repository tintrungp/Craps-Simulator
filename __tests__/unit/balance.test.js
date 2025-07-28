import { 
    getBalance, 
    updateBalance, 
    resetBalance 
} from '../../src/modules/betting/balance.js';

describe('Balance Module', () => {
    beforeEach(() => {
        resetBalance(1000);
    });

    describe('getBalance', () => {
        test('returns initial balance correctly', () => {
            expect(getBalance()).toBe(1000);
        });
    });

    describe('updateBalance', () => {
        test('adds positive amount to balance', () => {
            updateBalance(100);
            expect(getBalance()).toBe(1100);
        });

        test('subtracts negative amount from balance', () => {
            updateBalance(-100);
            expect(getBalance()).toBe(900);
        });

        test('returns updated balance', () => {
            const newBalance = updateBalance(250);
            expect(newBalance).toBe(1250);
            expect(getBalance()).toBe(1250);
        });
    });

    describe('resetBalance', () => {
        test('resets to specified amount', () => {
            updateBalance(500);
            resetBalance(2000);
            expect(getBalance()).toBe(2000);
        });

        test('resets to default 1000 when no amount specified', () => {
            updateBalance(500);
            resetBalance();
            expect(getBalance()).toBe(1000);
        });
    });
});

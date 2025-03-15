import { getBalance, updateBalance, resetBalance } from '../../src/modules/betting/balance.js';

describe('Balance Module', () => {
    // Reset balance before each test
    beforeEach(() => {
        resetBalance(1000); // Use our new reset function
    });

    test('initial balance should be 1000', () => {
        expect(getBalance()).toBe(1000);
    });

    test('updateBalance should add positive amounts', () => {
        updateBalance(500);
        expect(getBalance()).toBe(1500);
    });

    test('updateBalance should subtract negative amounts', () => {
        updateBalance(-300);
        expect(getBalance()).toBe(700);
    });

    test('multiple balance updates should accumulate correctly', () => {
        updateBalance(500);  // 1500
        updateBalance(-200); // 1300
        updateBalance(300);  // 1600
        expect(getBalance()).toBe(1600);
    });

    test('resetBalance should set balance to specified amount', () => {
        updateBalance(500);  // 1500
        resetBalance(2000);
        expect(getBalance()).toBe(2000);
    });
});

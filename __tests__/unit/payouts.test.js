import { calculatePayouts } from '../../src/modules/betting/payouts.js';

describe('Payouts Module', () => {
    describe('calculatePayouts', () => {
        test('calculates pass line win correctly', () => {
            const bets = new Map([['pass-line', 10]]);
            const result = calculatePayouts(bets, 7, 'Come Out');
            expect(result.totalWinnings).toBe(10);
            expect(result.results).toContainEqual({ betKey: 'pass-line', payout: 10 });
        });

        test('calculates pass line loss correctly', () => {
            const bets = new Map([['pass-line', 10]]);
            const result = calculatePayouts(bets, 2, 'Come Out');
            expect(result.totalWinnings).toBe(-10);
            expect(result.results).toContainEqual({ betKey: 'pass-line', payout: -10 });
        });

        test('calculates field bet win correctly', () => {
            const bets = new Map([['field', 10]]);
            const result = calculatePayouts(bets, 4, 'Come Out');
            expect(result.totalWinnings).toBe(10);
            expect(result.results).toContainEqual({ betKey: 'field', payout: 10 });
        });

        test('calculates field bet double win correctly', () => {
            const bets = new Map([['field', 10]]);
            const result = calculatePayouts(bets, 2, 'Come Out');
            expect(result.totalWinnings).toBe(20);
            expect(result.results).toContainEqual({ betKey: 'field', payout: 20 });
        });

        test('calculates field bet triple win correctly', () => {
            const bets = new Map([['field', 10]]);
            const result = calculatePayouts(bets, 12, 'Come Out');
            expect(result.totalWinnings).toBe(30);
            expect(result.results).toContainEqual({ betKey: 'field', payout: 30 });
        });

        test('calculates field bet loss correctly', () => {
            const bets = new Map([['field', 10]]);
            const result = calculatePayouts(bets, 7, 'Come Out');
            expect(result.totalWinnings).toBe(-10);
            expect(result.results).toContainEqual({ betKey: 'field', payout: -10 });
        });

        test('handles multiple bets correctly', () => {
            const bets = new Map([
                ['pass-line', 10],
                ['field', 5]
            ]);
            const result = calculatePayouts(bets, 4, 'Come Out');
            expect(result.totalWinnings).toBe(5); // Pass line = 0, Field = +5
            expect(result.results).toHaveLength(2);
        });

        test('returns empty results when no bets', () => {
            const bets = new Map();
            const result = calculatePayouts(bets, 7, 'Come Out');
            expect(result.totalWinnings).toBe(0);
            expect(result.results).toHaveLength(0);
        });
    });
}); 
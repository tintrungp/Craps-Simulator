import { 
    initializeGame, 
    determineComeOutResult, 
    determinePointResult,
    getGameState,
    GAME_STATES
} from '../../src/modules/game/game.js';

// Mock the UI and bet functions
jest.mock('../../js/ui.js', () => ({
    updateGameStateDisplay: jest.fn()
}));

jest.mock('../../js/bets.js', () => ({
    clearAllBets: jest.fn(),
    clearFieldBets: jest.fn()
}));

describe('Game Module', () => {
    beforeEach(() => {
        // Reset game state before each test
        initializeGame();
    });

    describe('determineComeOutResult', () => {
        test('returns natural for 7 or 11', () => {
            expect(determineComeOutResult(7)).toEqual({
                result: 'natural',
                shouldClearBets: false
            });
            expect(determineComeOutResult(11)).toEqual({
                result: 'natural',
                shouldClearBets: false
            });
        });

        test('returns craps for 2, 3, or 12', () => {
            expect(determineComeOutResult(2)).toEqual({
                result: 'craps',
                shouldClearBets: true
            });
            expect(determineComeOutResult(3)).toEqual({
                result: 'craps',
                shouldClearBets: true
            });
            expect(determineComeOutResult(12)).toEqual({
                result: 'craps',
                shouldClearBets: true
            });
        });

        test('returns point for other numbers', () => {
            expect(determineComeOutResult(4)).toEqual({
                result: 'point',
                newPoint: 4,
                shouldClearBets: false
            });
        });
    });

    describe('determinePointResult', () => {
        test('returns point-made when dice sum equals point', () => {
            expect(determinePointResult(6, 6)).toEqual({
                result: 'point-made',
                shouldClearBets: false
            });
        });

        test('returns seven-out when rolling 7', () => {
            expect(determinePointResult(7, 6)).toEqual({
                result: 'seven-out',
                shouldClearBets: true
            });
        });

        test('returns no-decision for other numbers', () => {
            expect(determinePointResult(5, 6)).toEqual({
                result: 'no-decision',
                shouldClearBets: false
            });
        });
    });
});

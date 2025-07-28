import { rollDice } from '../../src/modules/dice/dice.js';

// Mock the UI update function
jest.mock('../../src/modules/ui/ui.js', () => ({
    updateDiceDisplay: jest.fn()
}));

describe('Dice Module', () => {
  describe('rollDice', () => {
    test('returns object with dice1, dice2, and diceSum', () => {
      const result = rollDice();
      expect(result).toHaveProperty('dice1');
      expect(result).toHaveProperty('dice2');
      expect(result).toHaveProperty('diceSum');
    });

    test('dice values are between 1 and 6', () => {
      const { dice1, dice2 } = rollDice();
      expect(dice1).toBeGreaterThanOrEqual(1);
      expect(dice1).toBeLessThanOrEqual(6);
      expect(dice2).toBeGreaterThanOrEqual(1);
      expect(dice2).toBeLessThanOrEqual(6);
    });

    test('diceSum equals sum of dice1 and dice2', () => {
      const { dice1, dice2, diceSum } = rollDice();
      expect(diceSum).toBe(dice1 + dice2);
    });
  });
});

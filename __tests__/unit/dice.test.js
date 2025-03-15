import { generateDiceRoll } from '../../src/modules/dice.js';

describe('Dice Module', () => {
  test('generateDiceRoll returns valid dice values', () => {
    const { dice1, dice2, diceSum } = generateDiceRoll();
    
    expect(dice1).toBeGreaterThanOrEqual(1);
    expect(dice1).toBeLessThanOrEqual(6);
    expect(dice2).toBeGreaterThanOrEqual(1);
    expect(dice2).toBeLessThanOrEqual(6);
    expect(diceSum).toBe(dice1 + dice2);
  });
});

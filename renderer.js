const { ipcRenderer } = require('electron');
const Store = require('electron-store');
const store = new Store();
const startGameButton = document.getElementById('start-game');
const viewScoresButton = document.getElementById('view-scores');
const crapsTable = document.getElementById('craps-table');
const rollDiceButton = document.getElementById('roll-dice');
const diceResult = document.getElementById('dice-result');

startGameButton.addEventListener('click', () => {
  document.getElementById('menu').style.display = 'none';
  crapsTable.style.display = 'block';
});

rollDiceButton.addEventListener('click', () => {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `You rolled: ${dice1} and ${dice2}`;
});

// Save score
store.set('score', 100);

// Retrieve score
const score = store.get('score', 0);
console.log(score);
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const startGameBtn = document.getElementById('start-game');
    const viewScoresBtn = document.getElementById('view-scores');
    const viewScoresInGameBtn = document.getElementById('view-scores-ingame');
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');
    const returnToGameBtn = document.getElementById('return-to-game');
    const rollDiceBtn = document.getElementById('roll-dice');
    const diceResult = document.getElementById('dice-result');

    // Menu toggle functionality
    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('hidden');
    });

    // Return to game (close menu)
    returnToGameBtn.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menu.classList.add('hidden');
    });

    // Start game button
    startGameBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    });

    // View scores functionality
    viewScoresBtn.addEventListener('click', () => {
        // Handle viewing scores from start screen
    });

    viewScoresInGameBtn.addEventListener('click', () => {
        // Handle viewing scores from in-game menu
    });

    // Roll dice functionality
    rollDiceBtn.addEventListener('click', () => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        diceResult.textContent = `You rolled: ${dice1} and ${dice2}`;
    });

    // Use the electronAPI from the window object
    const saveScore = (score) => {
        window.electronAPI.saveScore(score);
    };

    const getScore = () => {
        return window.electronAPI.getScore();
    };

    // Example usage:
    saveScore(100);
    const score = getScore();
    console.log(score);
});
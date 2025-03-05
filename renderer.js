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

    // Track selected chip value and bets
    let selectedChipValue = null;
    const bets = new Map(); // Store bet amounts for each betting area

    // Chip selection handling
    const chipButtons = document.querySelectorAll('.chip-button');
    chipButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selected class from all chips
            chipButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected class to clicked chip
            button.classList.add('selected');
            
            // Get chip value from button ID (e.g., "chip-5" -> 5)
            selectedChipValue = parseInt(button.id.split('-')[1]);
            console.log('Selected chip value:', selectedChipValue);
        });
    });

    // Betting area handling
    const betAreas = document.querySelectorAll('.bet-area');
    betAreas.forEach(area => {
        area.addEventListener('click', () => {
            if (!selectedChipValue) {
                console.log('Please select a chip first');
                return;
            }

            // Get bet type and value from data attributes
            const betType = area.dataset.betType;
            const betValue = area.dataset.betValue;
            const betKey = betValue ? `${betType}-${betValue}` : betType;

            // Get or initialize current bet amount
            let currentBet = bets.get(betKey) || 0;
            currentBet += selectedChipValue;
            bets.set(betKey, currentBet);

            // Update visual chip stack
            const chipStack = area.querySelector('.chip-stack');
            updateChipStack(chipStack, currentBet);

            console.log(`Bet placed on ${betKey}: Total bet = ${currentBet}`);
        });
    });

    function updateChipStack(chipStackElement, totalBet) {
        // Clear existing chips
        chipStackElement.innerHTML = '';

        if (totalBet > 0) {
            // Create a chip element showing the total bet
            const chip = document.createElement('div');
            chip.className = 'chip';
            chip.textContent = totalBet;
            chipStackElement.appendChild(chip);
        }
    }

    // Modify the roll dice functionality to process bets
    rollDiceBtn.addEventListener('click', () => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const diceSum = dice1 + dice2;

        // Update dice images
        document.getElementById('dice1').src = `assets/Dice-Green-${dice1}.png`;
        document.getElementById('dice2').src = `assets/Dice-Green-${dice2}.png`;

        // Process bets based on dice roll
        processBets(diceSum);
    });

    function processBets(diceSum) {
        // Example bet processing logic
        bets.forEach((betAmount, betKey) => {
            const [betType, betValue] = betKey.split('-');
            
            // Example payout calculation for place bets
            if (betType === 'place' && parseInt(betValue) === diceSum) {
                let payout = 0;
                switch (diceSum) {
                    case 4:
                    case 10:
                        payout = betAmount * 1.8; // 9:5 odds
                        break;
                    case 5:
                    case 9:
                        payout = betAmount * 1.4; // 7:5 odds
                        break;
                    case 6:
                    case 8:
                        payout = betAmount * 1.167; // 7:6 odds
                        break;
                }
                console.log(`Winner! Payout for ${betKey}: ${payout}`);
                // Here you would update the player's balance
            }

            // Process field bets
            if (betType === 'field') {
                let payout = 0;
                switch (diceSum) {
                    case 3:
                    case 4:
                    case 10:
                    case 11:
                    case 9:
                        payout = betAmount * 1;
                        break;
                    case 2:
                    case 12:
                        payout = betAmount * 2;
                        break;
                    case 5:
                    case 6:
                    case 8:
                        payout = -betAmount * 1;
                        break;
                }   
                    if (payout > 0) {
                    console.log(`Winner! Payout for ${betKey}: ${payout}`);
                    // Here you would update the player's balance
                } else {
                    console.log(`Loser! Payout for ${betKey}: ${payout}`);
                }
            }

            // Process pass line bets
            if (betType === 'pass-line') {
                let payout = 0;
                switch (diceSum) {
                    case 7:
                        payout = betAmount * 1;
                        break; 
                    case 11:
                        payout = betAmount * 1;
                        break;
                    case 2:
                    case 3:
                    case 12:
                        payout = -betAmount;
                        break;
                }
                if (payout > 0) {
                    console.log(`Winner! Payout for ${betKey}: ${payout}`);
                    // Here you would update the player's balance
                } else {
                    console.log(`Loser! Payout for ${betKey}: ${payout}`);
                }
            }

            // Process don't pass bets
            if (betType === 'dont-pass') {
                let payout = 0;
                switch (diceSum) {
                    case 2:
                        payout = betAmount * 1; // 3:2 odds
                        break;
                    case 3:
                        payout = betAmount * 1; // 3:2 odds
                        break;
                    case 12:
                        payout = -betAmount;
                        break;
                    case 7:
                    case 11:
                        payout = -betAmount;
                        break;
                }
                if (payout > 0) {
                    console.log(`Winner! Payout for ${betKey}: ${payout}`);
                    // Here you would update the player's balance
                } else {
                    console.log(`Loser! Payout for ${betKey}: ${payout}`);
                }
            }
            
            // Process odds bets
            if (betType === 'odds') {
                let payout = 0;
                const linkedBetKey = area.dataset.linkedTo;
                const linkedBetAmount = bets.get(linkedBetKey) || 0;
                const odds = area.dataset.odds; 

                if (linkedBetAmount > 0) {
                    payout = linkedBetAmount * odds;
                    console.log(`Winner! Payout for ${betKey}: ${payout}`);
                    // Here you would update the player's balance
                } else {
                    console.log(`Loser! Payout for ${betKey}: ${payout}`);
                }
            }

            // Process come bets
            if (betType === 'come') {
                let payout = 0;
                switch (diceSum) {
                    case 7:
                        payout = betAmount * 1; // 1:1 odds
                        break;
                    case 11:
                        payout = betAmount * 1; // 1:1 odds
                        break;
                    case 2: 
                    case 3:
                    case 12:
                        payout = -betAmount;
                        break;
                }
                if (payout > 0) {   
                    console.log(`Winner! Payout for ${betKey}: ${payout}`);
                    // Here you would update the player's balance
                } else {
                    console.log(`Loser! Payout for ${betKey}: ${payout}`);
                }
            }   
        });
    }

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
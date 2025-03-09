// State management for player balance/score
let balance = 1000; // Default starting balance

// Get the current balance
export function getBalance() {
    return balance;
}

// Update the balance (for wins/losses)
export function updateBalance(amount) {
    balance += amount;
    console.log(`Balance updated to ${balance}`);
    return balance;
}

// Save the balance to electron store
export function saveBalance() {
    window.electronAPI.saveScore(balance);
    console.log(`Balance saved: ${balance}`);
}

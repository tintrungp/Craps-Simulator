// Pure functions for balance management
let balance = 1000; // Still needs state but operations are pure

// Get the current balance
export function getBalance() {
    return balance;
}

// Update the balance (for wins/losses)
export function updateBalance(amount) {
    balance += amount;
    return balance;
}

// Save the balance to electron store
export function saveBalance() {
    window.electronAPI.saveScore(balance);
    console.log(`Balance saved: ${balance}`);
}

// Add this function for testing
export function resetBalance(amount = 1000) {
    balance = amount;
}

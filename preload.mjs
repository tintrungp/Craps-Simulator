import { contextBridge } from 'electron';
import Store from 'electron-store';

// Create store with ESM compatibility
const store = new Store({
    // Optional: add some configuration
    name: 'craps-scores',
    defaults: {
        scores: []
    }
});

try {
    contextBridge.exposeInMainWorld('electronAPI', {
        saveScore: (score) => {
            const scores = store.get('scores', []);
            scores.push(score);
            store.set('scores', scores);
            return scores; // Return the updated scores array
        },
        getScore: () => store.get('scores', [])
    });

    console.log("Preload script loaded successfully");
} catch (error) {
    console.error("Error in preload script:", error);
    console.error("Error details:", error.stack);
}
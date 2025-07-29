import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    Store.initRenderer();
} catch (error) {
    console.error('Failed to initialize electron-store:', error);
}

function createWindow() {
    const preloadPath = path.join(__dirname, 'preload.mjs');
    console.log('Preload path:', preloadPath);
    
    // Verify the preload file exists
    import('fs').then(fs => {
        if (fs.existsSync(preloadPath)) {
            console.log('Preload file exists at:', preloadPath);
        } else {
            console.error('Preload file not found at:', preloadPath);
        }
    });
    
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        useContentSize: true,
        resizable: true, // Allow window resizing
        minWidth: 800, // Set minimum width
        minHeight: 600, // Set minimum height
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: preloadPath,
            sandbox: false
        }
    });

    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Failed to load:', errorDescription);
    });

    win.webContents.on('preload-error', (event, preloadPath, error) => {
        console.error('Preload error:', preloadPath, error);
    });

    win.loadFile('index.html');

    // Optional: Open DevTools automatically
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle IPC messages for game state
ipcMain.on('view-scores', (event) => {
    // Handle loading and sending scores data
});

ipcMain.on('save-score', (event, score) => {
    // Handle saving new scores
});
# Craps Simulator

A desktop craps casino simulation built with Electron, featuring authentic gameplay mechanics and a clean UI for practicing craps betting strategies.

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Code Structure](#code-structure)
- [Game Mechanics](#game-mechanics)
- [Technical Details](#technical-details)
- [Development Notes](#development-notes)

## Overview

This Electron-based craps simulator replicates the casino craps experience with:
- Complete craps table with authentic betting areas
- Proper game state management (Come Out vs Point phases)
- Multiple bet types with accurate payout calculations
- Visual chip management and balance tracking
- Persistent score/balance storage via electron-store

The application uses modern ES6 modules and follows a modular architecture for maintainability.

## Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, vanilla JavaScript (ES6 modules)
- **Backend**: Electron (Node.js runtime)
- **Storage**: electron-store for persistent data
- **Build**: electron-packager for distribution

### Module Structure
```
js/
├── index.js      # Main entry point, coordinates initialization
├── game.js       # Core game state management (Come Out vs Point)
├── dice.js       # Dice rolling logic and randomization
├── bets.js       # Bet placement and management
├── ui.js         # Event handlers and UI updates
├── balance.js    # Player balance/score management
└── payouts.js    # Payout calculations for all bet types
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm start
```

### Building for Distribution
```bash
npm run package
```

## Code Structure

### Entry Point (`main.mjs`)
- Electron main process
- Creates BrowserWindow with security settings
- Handles IPC communication for score persistence
- Manages application lifecycle

### Core Modules

#### Game State Management (`game.js`)
```javascript
GAME_STATES = {
    COME_OUT: 'come_out',  // Initial roll phase
    POINT: 'point'         // Point established phase
}
```

Manages transitions between game phases and handles dice roll outcomes according to craps rules.

#### Betting System (`bets.js`)
- Manages bet placement with chip value selection
- Stores bets in Map structure with unique keys (`betType-betValue`)
- Handles bet clearing for different scenarios (seven-out, field bets, etc.)

#### Payout Engine (`payouts.js`)
Implements authentic craps payout ratios:
- **Place bets**: 9:5 (4,10), 7:5 (5,9), 7:6 (6,8)
- **Field bets**: Even money (3,4,9,10,11), 2:1 (2,12), lose on 5,6,7,8
- **Pass/Don't Pass**: Even money on naturals/craps

#### UI Management (`ui.js`)
- Event handling for all user interactions
- Chip selection and bet placement
- Dice roll coordination
- Balance and game state display updates

## Game Mechanics

### Basic Flow
1. **Come Out Roll**: Initial dice roll to establish game state
   - 7,11: Pass line wins, don't pass loses
   - 2,3,12: Pass line loses, don't pass wins (12 pushes)
   - 4,5,6,8,9,10: Point established, game continues

2. **Point Phase**: Rolling to hit point or seven-out
   - Point number: Pass line wins, round ends
   - Seven: Seven-out, all bets lose, new come out roll

### Supported Bet Types
- **Pass Line**: Basic even-money bet
- **Don't Pass**: Opposite of pass line
- **Place Bets**: Bet on specific numbers (4,5,6,8,9,10)
- **Field Bets**: One-roll bet on 2,3,4,9,10,11,12
- **Odds Bets**: True odds backing of pass/don't pass (partially implemented)

### Balance Management
- Starting balance: $1000
- Real-time balance updates after each roll
- Persistent storage via electron-store
- Cashout functionality saves final balance

## Technical Details

### Security Considerations
- Context isolation enabled
- Node integration disabled
- Sandboxing considerations for production

### State Management
- Game state stored in module-level variables
- Bets managed via Map for O(1) lookups
- Balance persistence through IPC to main process

### Event Flow
```
User Action → UI Handler → Game Logic → Payout Calculation → Balance Update → UI Update
```

### File Structure
```
Craps-Simulator/
├── main.mjs              # Electron main process
├── preload.mjs           # Preload script for IPC
├── renderer.js           # Renderer process utilities
├── index.html            # Main UI layout
├── styles.css            # Styling and table layout
├── js/                   # JavaScript modules
├── assets/               # Dice images and chip graphics
├── package.json          # Dependencies and scripts
└── notes.txt            # Craps rules reference
```

## Development Notes

### Current TODOs (from `todo.md`)
- Fix balance display updates
- Fix point and game state display
- Complete cashout button functionality
- Add restart/new game functionality
- Differentiate don't bet handling
- Debug bet clearing logic

### Architecture Decisions
1. **Modular Design**: Each game aspect (dice, bets, payouts) isolated for testability
2. **Event-Driven**: UI events trigger game logic cascade
3. **Stateful**: Game state maintained across modules vs single state store
4. **Vanilla JS**: No framework dependencies for simplicity

### Extension Points
- Additional bet types (hardways, proposition bets)
- Multiplayer functionality
- Statistics tracking
- Advanced betting strategies
- Visual enhancements (animations, sounds)

### Testing Considerations
- Dice randomization should be testable/mockable
- Payout calculations need unit testing
- Game state transitions require integration testing
- Balance persistence needs E2E testing

---

This simulator provides an excellent foundation for understanding both craps gameplay mechanics and Electron application development patterns.
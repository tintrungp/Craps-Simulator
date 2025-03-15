# Software Design Document
Written by: [@tintrungp](https://github.com/tintrungp)

## Table of Contents
- [Overview](#overview)
- [Milestones](#milestones)
  - [v0.1 - Basic Craps Game](#v01---basic-craps-game-completed-3142025)
  - [v0.2 - All Bets](#v02---all-bets)
  - [v0.3 - Refine UI](#v03---refine-ui)
  - [v0.4 - Migrate to TypeScript](#v04---migrate-to-typescript)
  - [v1.0 - Polish, CI/CD, and Deploy](#v10---polish-cicd-and-deploy-estimated-completion-452025)
- [Core Components](#core-components)
  - [Betting System](#betting-system)
  - [Dice Rolling System](#dice-rolling-system)
  - [Game Logic](#game-logic)
  - [UI](#ui)
  - [Saved Game System](#saved-game-system)
- [Testing](#testing)
- [Conclusion](#conclusion)
  - [Future Work](#future-work)
  - [What I've Learned](#what-ive-learned)
  - [What I Would Do Differently](#what-i-would-do-differently-next-time)

---

## Overview
This document outlines the design, implementation, and testing of the craps game. But it also outlines the goals and milestones for the project. Mainly to help me stay on track and not get overwhelmed.

### Milestones
This section outlines the milestones for the project. Each milestone is a version of the project that has a specific set of features. 

#### v0.1 - Basic Craps Game (Completed 3/14/2025)
- [x] Betting system
- [x] Dice rolling system
- [x] Game logic
- [x] UI
- [x] Testing

#### v0.2 - All Bets
- [ ] Implement game for all bets
    - [ ] Betting
    - [ ] Dice rolling
    - [ ] Game logic
    - [ ] UI
- [ ] Implement score/roll history
- [ ] Implement the saved game system

#### v0.3 - Refine UI
- [ ] Refine the UI for responsiveness
- [ ] Update the dice rolling system for more style
- [ ] Implement the game logic for all bet

#### v0.4 - Migrate to TypeScript
- [ ] Migrate the project to TypeScript
- [ ] Update the codebase to be more type-safe

#### v1.0 - Polish, CI/CD, and Deploy (Estimated Completion 4/5/2025)
- [ ] Polish the UI with design elements and animations
- [ ] Implement CI/CD pipeline
- [ ] Documentation + README
- [ ] Deploy to GitHub

---

## Core Components
This section outlines the core components of the project. Explaining the purpose, responsibilities, and interactions of each component.

### Betting System
The betting system is responsible for handling the betting process. It allows the user to place bets on the outcome of the dice roll. 

This component is contained by the following files:
- src/modules/betting/bets.js
- src/modules/betting/payouts.js
- src/modules/betting/balance.js

### Dice Rolling System
The dice rolling system is responsible for rolling the dice and returning the results.

This component is contained by the following files:
- src/modules/dice/dice.js

### Game Logic
The game logic is responsible for handling the game logic. It calculates the outcome of the dice roll and updates the score/balance.

This component is contained by the following files:
- src/modules/game/game.js

### UI
The UI is responsible for displaying the game to the user. It allows the user to place bets, roll the dice, and view the score/balance.

This component is contained by the following files:
- src/modules/ui/ui.js

### Saved Game System
The saved game system is responsible for saving and loading the game state. It allows the user to save the game and load it later.

This component is contained by the following files:
- src/modules/storage/saved-game.js

---

## Testing

---

## Conclusion

### Future Work

### What I've learned

### What I would do differently next time

## Glossary

### File Structure

```
craps-game/
├── src/
│ ├── modules/
│ │ ├── betting/
│ │ │ ├── bets.js
│ │ │ ├── payouts.js
│ │ │ └── balance.js
│ │ ├── dice/
│ │ │ └── dice.js
│ │ ├── game/
│ │ │ └── game.js
│ │ ├── ui/
│ │ │ └── ui.js
│ │ └── storage/
│ │   └── saved-game.js
│ └── index.js
├── __tests__/
│ ├── unit/
│ └── integration/
├── index.html
├── package.json
├── README.md
└── sdd.md
```
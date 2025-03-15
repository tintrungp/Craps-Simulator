# TODO
- STYLE EVERYTHING
    - maybe figure out the need for making the game ui responsive
- figure out the cashout button and saving of scores
- add a restart button / new game?
- differntiate between dont bets and regular bets

# Finished 3/12 Session
- Fix field bet payout to number not field as a whole
- clearing chip stacks for non place bets
- Debug the bet clearing
    - clear all bets
    - clear specific bets (pass vs dont pass)
    - chip stack understanding

# Finished 3/14 Session
- Fix the balance display
- fix the point display
- fix the game state display
- group the game state displays together
- maybe rename all scoring to balances

# Notes
These warnings don't affect functionality, but when you migrate to TypeScript, you should:
- Use native methods instead of abab
- Use native DOMException
- Remove @types/electron and rely on Electron's built-in types

# ConnectFour.js

A simple Connect four game logic

- Easy to use
- Object-oriented
- Multiple players
- Custom board

## Install

## Usage

Creating a game with two players:

```js
const { ConnectFour } = require('ConnectFour.js');

const game = new ConnectFour({ boardWidth: 7, boardHeight: 6 });

//Add players to game before starting
const playerA = game.addPlayer('A', '🔵');
const playerB = game.addPlayer('B', '🔴');

// start the game
game.start();
```

After starting the game, the player can drop a bead to a specific column (`0 to boardWidth - 1`):

```js
playerA.dropBead(0);
playerB.dropBead(1);
```

Print the game board:

```js
const printedBoard = game.print()
console.log(printedBoard);
```

Console:

``` js
⚪⚪⚪⚪⚪⚪⚪
⚪⚪⚪⚪⚪⚪⚪
⚪⚪⚪⚪⚪⚪⚪
⚪⚪⚪⚪⚪⚪⚪
⚪⚪⚪⚪⚪⚪⚪
🔵🔴⚪⚪⚪⚪⚪
```

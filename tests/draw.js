const { ConnectFour } = require('../src');

const game = new ConnectFour({ boardWidth: 2, boardHeight: 2 });

//Add player to game before starting
const playerA = game.addPlayer('A', '🔵');
const playerB = game.addPlayer('B', '🔴');

// start the game
game.start();

try {
  playerA.dropBead(0);
  playerB.dropBead(1);
  playerA.dropBead(1);
  playerB.dropBead(0);
} catch (status) {
  if (status.resaon === 'FULL_BOARD') {
    console.log(`\n${game.print()}`);
    console.log(`\nThe game is draw\n`);
  }
}

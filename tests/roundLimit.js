const { ConnectFour } = require('../src');

const game = new ConnectFour({ boardWidth: 4, boardHeight: 4 });

//Add player to game before starting
const playerA = game.addPlayer('A', '🔵');
const playerB = game.addPlayer('B', '🔴');

// start the game
game.start();

try {
  for (let i = 0; i <= game.round.limit; i++) {
    playerA.dropBead(0);
  }
} catch (error) {
  console.log(error);
}

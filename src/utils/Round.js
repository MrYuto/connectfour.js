const Player = require('../Player');
const ConnectFour = require('../ConnectFour');
const Bead = require('../Bead');

class Round {
  /**
   * @param {Number} limit The round limit
   * @param {ConnectFour} game The player game
   */
  constructor(limit = 1, game) {
    /**
     * The round limit for each player
     * @type Number
     */
    this.limit = limit;

    /**
     * The round game
     * @type ConnectFour
     */
    this.game = game;

    /**
     * The players of this round
     * @type Player[]
     */
    this.players = [];

    /**
     * The round beads
     * @type Bead[]
     */
    this.beads = [];
  }

  /**
   * Whatever if round is finished or not
   * @type {boolean}
   */
  get isFinished() {
    return this.game.players.every((player) => this.players.find((p) => (p.id === player.id)));
  }

  /**
   * Get a player remaining drop
   * @param {String} playerId
   * @returns {Number} The remaining drop
   */
  getPlayerRemainingDrop(playerId) {
    return this.limit - this.players.filter((player) => player.id === playerId).length;
  }

  /**
   * Save a player drop on this round
   * @param {Player} player
   * @param {Bead} bead
   */
  savePlayerDrop(player, bead) {
    this.players.push(player);
    this.beads.push(bead);
  }
}

module.exports = Round;

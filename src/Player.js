const Bead = require('./Bead');
const ConnectFour = require('./ConnectFour');

class Player {
  /**
   * Represents a player on the game
   * @param {String} id The player id
   * @param {ConnectFour} game The player game
   */
  constructor(id, emoji, game) {
    /**
     * The player id
     * @type String
     */
    this.id = id;

    /**
     * The player emoji
     * @type String
     */
    this.emoji = emoji;

    /**
     * The player game
     * @type ConnectFour
     */
    this.game = game;

    /**
     * The player beads
     * @type Bead[]
     */
    this.beads = [];
  }

  /**
   * Options for a bead
   * @typedef {Object} BeadOptions
   * @property {String} emoji The default bead emoji when it's empty
   * @property {Player} player The player that this bead belongs to
   * @property {String} playerId The player id that this bead belongs to
   * @property {String} playerEmoji The player emoji for this bead
   */

  /**
   * The player bead options
   * @type BeadOptions
   */
  get beadOptions() {
    return { player: this, playerId: this.id, playerEmoji: this.emoji };
  }

  /**
   * Whatever if player drop on each round limit is hit or not
   * @type Boolean
   */
  get isDropLimitHit() {
    return !this.game.round.getPlayerRemainingDrop(this.id) ? true : false;
  }

  /**
   * Drop a bead to the column
   * @param {Number} columnIndex The column index
   * @returns Bead
   */
  dropBead(columnIndex) {
    if (!this.game.rounds.length) throw new Error('START_GAME');
    if (this.isDropLimitHit) throw new Error('ROUND_LIMIT');

    const emptyBead = this.game.columns[columnIndex].emptyBead;
    if (!emptyBead) throw new Error('FULL_COLUMN');

    const bead = this.game.updateBead(emptyBead.x, emptyBead.y, this.beadOptions);
    this.game.round.savePlayerDrop(this, bead);
    this.beads.push(bead);

    const { isGameFinished } = this.game;
    if (isGameFinished) throw isGameFinished;

    return bead;
  }
}

module.exports = Player;

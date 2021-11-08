/**
 * Options for a bead
 * @typedef {Object} BeadOptions
 * @property {String} emoji The default bead emoji when it's empty
 * @property {Player} player The player that this bead belongs to
 * @property {String} playerId The player id that this bead belongs to
 * @property {String} playerEmoji The player emoji for this bead
 */

class Bead {
  /**
   * Represents a bead on the game board
   * @param {Number} x Position x on the game board
   * @param {Number} y Position y on the game board
   * @param {BeadOptions} options
   */
  constructor(x, y, options = {}) {
    /**
     * Position x on the game board
     * @type Number
     */
    this.x = x;

    /**
     * Position y on the game board
     * @type Number
     */
    this.y = y;

    /**
     * The default bead emoji when it's empty
     * @type String
     */
    this.emoji = options.emoji ?? '⚪';

    /**
     * The player that this bead belongs to
     * @type Player
     */
    this.player = options.player ?? null;

    /**
     * The player id that this bead belongs to
     * @type String
     */
    this.playerId = options.playerId ?? null;

    /**
     * The player emoji for this bead
     * @type String
     */
    this.playerEmoji = options.playerEmoji ?? null;
  }

  /**
   * Whatever if bead is empty or not
   * @type Boolean
   */
  get empty() {
    return this.playerEmoji ? false : true;
  }

  /**
   * Update the bead options
   * @param {BeadOptions} options
   */
  update(options = {}) {
    if (options.emoji) this.emoji = options.emoji;
    if (options.player) this.player = options.player;
    if (options.playerId) this.playerId = options.playerId;
    if (options.playerEmoji) this.playerEmoji = options.playerEmoji;
  }

  /**
   * Return the bead emoji
   * @returns {String}
   */
  getEmoji() {
    return !this.empty ? this.playerEmoji : this.emoji;
  }
}

module.exports = Bead;

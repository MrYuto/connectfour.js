const Board = require('./Board');
const Player = require('./Player');
const Round = require('./utils/Round');

/**
 * Represents the game clinet
 * @typedef {Object} GameOptions
 * @property {Number} boardWidth The width of board
 * @property {Number} boardHeight The height of board
 * @property {String} emoji The default bead emoji when it's empty
 * @property {roundLimit} roundLimit The round limit for each player
 */

/**
 * The main class to create a game
 * @extends {Board}
 */
class ConnectFour extends Board {
  /**
   * The options for the game
   * @param {GameOptions} options
   */
  constructor(options = {}) {
    super(options.boardWidth, options.boardHeight, { emoji: options.emoji });

    this.options = options;

    /**
     * The game rounds
     * @type Round[]
     */
    this.rounds = [];

    /**
     * The players of this board
     * @type Player[]
     */
    this.players = [];
  }

  /**
   * The current game round
   * @type Round
   */
  get round() {
    let currentRound = this.rounds.at(-1);
    if (currentRound.isFinished) currentRound = this.addRound(this.options.roundLimit);

    return currentRound;
  }

  /**
   * The game winner if has
   * @type {Player | null}
   */
  get winner() {
    let winner = null;

    const columnWinner = this.columns.find((column) => column.winner)?.winner;
    const rowWinner = this.rows.find((row) => row.winner)?.winner;
    const obliqueWinner = this.obliques.find((oblique) => oblique.winner)?.winner;

    if (columnWinner) winner = columnWinner;
    if (rowWinner) winner = rowWinner;
    if (obliqueWinner) winner = obliqueWinner;

    return winner;
  }

  /**
   * Whatever if game is finished or not
   * @type {{resaon: String} | {resaon: String, winner: Player} | boolean}
   */
  get isGameFinished() {
    if (this.winner) return { resaon: 'HAS_WINNER', winner: this.winner };
    if (this.isBoardFull) return { resaon: 'FULL_BOARD' };

    return false;
  }

  /**
   * Add a new round to the game
   * @param {Number} limit The round limit
   * @param {ConnectFour} game The round game
   * @returns {Round} The round
   */
  addRound(limit, game = this) {
    const round = new Round(limit, game);
    this.rounds.push(round);

    return round;
  }

  /**
   * Add a new player to the game board
   * @param {String} id The player id
   * @param {String} emoji The player emoji
   * @returns {Player} The player
   */
  addPlayer(id, emoji) {
    const player = new Player(id, emoji, this);
    this.players.push(player);

    return player;
  }

  /**
   * Start the game
   */
  start() {
    if (!this.players.length) throw new Error('NO_PLAYER');

    this.addRound(this.options.roundLimit);
  }
}

module.exports = ConnectFour;

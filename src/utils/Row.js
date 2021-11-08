const Board = require('../Board');
const Bead = require('../Bead');

class Row {
  /**
   * Represents a row of the game board
   * @param {Board} board The row board
   * @param {Bead[]} beads The row beads
   */
  constructor(board, beads) {
    /**
     * The row board
     * @type Board
     */
    this.board = board;

    /**
     * The row beads
     * @type Bead[]
     */
    this.beads = beads;
  }

  /**
   * The row players
   * @type Player[]
   */
  get players() {
    return [...new Set(this.beads.filter((bead) => !bead.empty).map((bead) => bead.player))];
  }

  /**
   * Get a empty bead from the row
   * @type Bead
   */
  get emptyBead() {
    return this.beads.filter((bead) => bead.empty).at(-1);
  }

  /**
   * Get the row winner if has
   * @type {Player | null}
   */
  get winner() {
    const winner = this.players.find((player) => this.beads.every((bead) => bead.playerId === player.id));

    if (winner) return winner;
    return null;
  }
}

module.exports = Row;

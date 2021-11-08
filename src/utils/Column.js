const Board = require('../Board');
const Player = require('../Player');
const Bead = require('../Bead');

class Column {
  /**
   * Represents a column of the game board
   * @param {Board} board The column board
   * @param {Bead[]} beads The column beads
   */
  constructor(board, beads) {
    /**
     * The column board
     * @type Board
     */
    this.board = board;

    /**
     * The column beads
     * @type Bead[]
     */
    this.beads = beads;
  }

  /**
   * The column players
   * @type Player[]
   */
  get players() {
    return [...new Set(this.beads.filter((bead) => !bead.empty).map((bead) => bead.player))];
  }

  /**
   * Get a empty bead from the column
   * @type Bead
   */
  get emptyBead() {
    return this.beads.filter((bead) => bead.empty)?.at(-1) ?? null;
  }

  /**
   * Get the column winner if has
   * @type {Player | null}
   */
  get winner() {
    const winner = this.players.find((player) => this.beads.every((bead) => bead.playerId === player.id));

    if (winner) return winner;
    return null;
  }
}

module.exports = Column;

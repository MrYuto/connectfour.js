const { hasFourConnects } = require('./Util');
const Player = require('../Player');
const Board = require('../Board');
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
    let winner = null;

    this.players.forEach((player) => {
      const beadIndexes = this.beads
        .map((bead, index) => {
          return { index, playerId: bead.player?.id };
        })
        .filter(({ playerId }) => playerId === player.id)
        .map(({ index }) => index);

      if (hasFourConnects(beadIndexes)) winner = player;
    });

    return winner;
  }
}

module.exports = Column;

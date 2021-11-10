const Bead = require('./Bead');
const Player = require('./Player');
const Row = require('./utils/Row');
const Oblique = require('./utils/Oblique');
const Column = require('./utils/Column');

/**
 * Options for a bead
 * @typedef {Object} BeadOptions
 * @property {String} emoji The default bead emoji when it's empty
 * @property {Player} player The player that this bead belongs to
 * @property {String} playerId The player id that this bead belongs to
 * @property {String} playerEmoji The player emoji for this bead
 */

class Board {
  /**
   * Represents the main playground of the game
   * @param {Number} width The width of board
   * @param {Number} height The height of board
   * @param {BeadOptions} beadOptions The height of board
   */
  constructor(width, height, beadOptions) {
    /**
     * The width of board
     * @type Number
     */
    this.width = width;

    /**
     * The height of board
     * @type Number
     */
    this.height = height;

    /**
     * The board beads
     * @type Bead[]
     */
    this.beads = this.createBeads(beadOptions);

    /**
     * The board columns
     * @type Column[]
     */
    this.columns = this.createColumns();

    /**
     * The board rows
     * @type Row[]
     */
    this.rows = this.createRows();

    /**
     * The board obliques
     * @type Oblique[]
     */
    this.obliques = this.createObliques();
  }

  /**
   * Whatever if board is full or not
   * @type {Boolean}
   */
  get isBoardFull() {
    const fullColumns = this.columns.every((column) => !column.emptyBead);
    const fullRows = this.rows.every((row) => !row.emptyBead);
    return fullColumns && fullRows;
  }

  /**
   *
   * @param {Number} x Position x on the game board
   * @param {Number} y Position y on the game board
   * @param {BeadOptions} options
   * @returns {Bead} The updated bead
   */
  updateBead(x, y, options = {}) {
    const bead = this.beads.find((bead) => bead.x === x && bead.y === y);
    if (!bead) throw Error(`There isn't any bead at (x: ${x},Y: ${y})`);
    bead.update(options);

    return bead;
  }

  /**
   * Print the board
   * @returns {String}
   */
  print() {
    return this.rows.map((row) => row.beads.map((bead) => bead.getEmoji()).join('')).join('\n');
  }

  /**
   * @private
   * Create the beads for this board
   * @param {Number} width The width of board
   * @param {Number} height The height of board
   * @param {BeadOptions} beadOptions The height of board
   * @returns {Bead[]}
   */
  createBeads(options, width = this.width, height = this.height) {
    const beads = [];
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        beads.push(new Bead(w, h, options ?? {}));
      }
    }

    return beads;
  }

  /**
   * @private
   * Create the columns for this board
   * @param {Number} width The width of board
   * @returns {Column[]}
   */
  createColumns(width = this.width, beads = this.beads) {
    const columns = [];
    for (let w = 0; w < width; w++) {
      const columnBeads = beads.filter((bead) => bead.x === w);
      columns.push(new Column(this, columnBeads));
    }

    return columns;
  }

  /**
   * @private
   * Create the rows for this board
   * @param {Number} height The height of board
   * @returns {Row[]}
   */
  createRows(height = this.height, beads = this.beads) {
    const rows = [];
    for (let h = 0; h < height; h++) {
      const rowBeads = beads.filter((bead) => bead.y === h);
      rows.push(new Row(this, rowBeads));
    }

    return rows;
  }

  /**
   * @private
   * Create the obliques for this board
   * @param {Number} width The width of board
   * @param {Number} height The height of board
   * @returns {Oblique[]}
   */
  createObliques(width = this.width, height = this.height, beads = this.beads) {
    const obliques = [];
    const w = width - 1;

    let isFinished = false;
    let reverse = false;
    let n = 0;

    while (!isFinished) {
      n++;
      let x1, y1, x2, y2;

      if (n < height && n < width) {
        x1 = !reverse ? 0 : w;
        y1 = n;

        x2 = !reverse ? n : w - n;
        y2 = 0;
      } else if (n < width && n >= height) {
        x1 = !reverse ? n - height : w - (n - height);
        y1 = height - 1;

        x2 = !reverse ? n : w - n;
        y2 = 0;
      } else if (n >= width && n < height) {
        x1 = !reverse ? 0 : w;
        y1 = n;

        x2 = !reverse ? w : 0;
        y2 = n - width;
      } else if (n >= width && n >= height) {
        x1 = !reverse ? n - height : w - (n - height);
        y1 = height - 1;

        x2 = !reverse ? w : 0;
        y2 = n - width;
      }

      const m = (y2 - y1) / (x2 - x1);

      if (n && m) {
        const line = {
          m,
          y1,
          x1,
          has(x, y) {
            return y - this.y1 === this.m * (x - this.x1);
          },
        };
        const obliqueBeads = beads.filter((bead) => line.has(bead.x, bead.y));
        if (obliqueBeads.length >= 4) obliques.push(new Oblique(this, obliqueBeads));
      } else if (!reverse) {
        n = 0;
        reverse = true;
      } else {
        isFinished = true;
      }
    }

    return obliques;
  }
}

module.exports = Board;

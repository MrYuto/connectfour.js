/**
 * Whatever if has four connect or not
 * @param {Number[]} indexes The indexes to search the four connects
 * @returns {Boolean}
 */
const hasFourConnects = (indexes = []) => {
  if (indexes.length < 4) return;

  let consecutiveIndexes = new Set();
  indexes.forEach((i1, n, indexes) => {
    const i0 = indexes[n - 1] ?? NaN;
    const i2 = indexes[n + 1] ?? NaN;
    const d1 = i1 - i0;
    const d2 = i2 - i1;

    if (d1 === 1) {
      [i0, i1].forEach((i) => consecutiveIndexes.add(i));
    } else {
      consecutiveIndexes = new Set();
    }

    if (d2 === 1) [i1, i2].forEach((i) => consecutiveIndexes.add(i));
  });

  return consecutiveIndexes.size >= 4;
};

module.exports = {
  hasFourConnects,
};

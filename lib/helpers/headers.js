/**
 * Find the headers
 * @param {any[]} rows Rows array
 */
function find(row = []) {
  return (compareSingle(row)) ? row : [];
}

/**
 * Compare column by column
 * @param {String} column Current column value
 */
function compareSingle(row = []) {
  const rowLength = row.length;
  const filledLength = row.filter(column => isFilled(column) === true).length;
  return (rowLength === filledLength) ? true : false;
}

function isFilled(column = '') {
  const isFilled = (column !== undefined && column.length !== 0);
  return (isFilled) ? true : false;
}

/**
 * Find the headers
 * @param {any[]} data Data array
 */
exports = module.exports.find = (data = []) => find(data);
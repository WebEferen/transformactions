const headers = require('./headers');

/**
 * Normalised Parser
 * @param {any} parser Parser Object
 * @param {String} buffer Buffer string
 * @param {any} config Config Object
 */
function normalise(parser, buffer, config) {
  const result = {data: [], headers: []};
  let iterator = 0;

  parser.write(buffer);
  parser.on('readable', () => {
    while (row = parser.read()) {
      if (!isExcluded(config.input.excludedLines, iterator)) {
        const parsedRow = includeRow(row, iterator, config);
        const headersArray = (headers.find(row)) ? headers.find(row) : null;

        if (parsedRow.header && !config.autoHeaders) result.headers = parsedRow.data;
        if (result.headers.length === 0 && headersArray) result.headers = headersArray;

        if (config.headerKeys) result.data.push(mapPerKey(parsedRow, result.headers));
        else result.data.push(parsedRow.data);
      }
      iterator++;
    }
  });
  parser.end();

  return new Promise((resolve, reject) => {
    parser.on('end', () => resolve(result.data));
    parser.on('error', () => reject(new Error('Error during process the file!')));
  });
}

/**
 * Parser from the pure string
 * @param {String} stringified Stringified file
 * @param {any} config Config Object
 */
function normaliseFromString(stringified, config) {
  let isError = false;
  let iterator = 0;
  let dataHeaders = [];
  const data = [];

  const rowsArray = stringified.split(config.input.newLineDelimiter);

  if (!rowsArray[0]) isError = true;
  rowsArray.forEach((row) => {
    if (!isExcluded(config.input.excludedLines, iterator)) {
      const included = includeRow(row.split(config.input.delimiter), iterator, config);
      if (!included) return;
      if (config.headerKeys && included.header) dataHeaders = included.data;
      if (config.headerKeys) data.push(mapPerKey(included, dataHeaders));
      else data.push(included.data);
    }
  });
  
  return new Promise((resolve, reject) => {
    if (isError) reject(new Error('Error during process the file!'));
    resolve(data);
  });
}

/**
 * Includer (injecting some dependencies)
 * @param {String[]} row Current item row
 * @param {Number} iterator Iterator (defaults 0)
 * @param {any} config Config object
 */
function includeRow(row, iterator = 0, {input}) {
  if (!input.headerLine) return {header: false, data: row};
  if (iterator === input.headerLine) return {header: true, data: row};
  if (iterator >= input.contentStartsAt) return {header: false, data: row};
}

/**
 * Mapping helper
 * @param {String[]} row Data array
 * @param {String[]} headers Headers array 
 */
function mapPerKey({data}, headers = []) {
  let index = 0;
  const mapped = [];
  headers.forEach(header => mapped[prepareKey(header)] = data[index++]);
  return mapped;
}

/**
 * Prepares key for iteration
 * @param {String} key Current array key
 */
function prepareKey(key) {
  const keysArray = (key + '').toLowerCase().replace('%', '').replace('.', '').split(' ');
  const keys = keysArray.filter((key) => key.length > 0);
  return keys.join('_');
}

/**
 * Checks if the current line is excluded or not
 * @param {_excludedLines} excludedLines Excluded lines array
 * @param {Number} iterator Iterator (defaults 0) 
 */
function isExcluded(excludedLines = [], iterator = 0) {
  if (excludedLines.indexOf(iterator) === -1) return false;
  return true;
}

exports = module.exports.normalise = (parser, buffer, config) => normalise(parser, buffer, config);
exports = module.exports.normaliseFromString = (stringified, config) => normaliseFromString(stringified, config);
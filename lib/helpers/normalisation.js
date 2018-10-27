/**
 * Normalised Parser
 * @param {any} parser Parser Object
 * @param {String} buffer Buffer string
 * @param {_CONFIG} config Config Object
 */
function parse(parser, buffer, config) {
  const data = [];
  let headers = [];
  let iterator = 0;

  parser.write(buffer);
  parser.on('readable', () => {
    while (row = parser.read()) {
      if (!isExcluded(config.input.excludedLines, iterator)) {
        const included = includeRow(row, iterator, config);
        if (included) {
          if (config.headerKeys && included.header) headers = included.data;
          if (config.headerKeys) data.push(mapPerKey(included, headers));
          else data.push(included.data);
        }
      }
      iterator++;
    }
  });
  parser.end();

  return new Promise((resolve, reject) => {
    parser.on('end', () => resolve(data));
    parser.on('error', () => reject(new Error('Error during process the file!')));
  });
}

/**
 * Parser from the pure string
 * @param {String} stringified Stringified file
 * @param {_CONFIG} config Config Object
 */
function parseFromString(stringified, config = _CONFIG) {
  let isError = false;
  let iterator = 0;
  let headers = [];
  const data = [];

  const rowsArray = stringified.split(config.input.newLineDelimiter);

  if (!rowsArray[0]) isError = true;
  rowsArray.forEach((row) => {
    if (!isExcluded(config.input.excludedLines, iterator)) {
      const included = includeRow(row.split(config.input.delimiter), iterator, config);
      if (included) {
        if (config.headerKeys && included.header) headers = included.data;
        if (config.headerKeys) data.push(mapPerKey(included, headers));
        else data.push(included.data);
      }
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
  if (iterator === input.headerLine) return {header: true, data: row};
  if (iterator >= input.contentStartsAt) return {data: row};
  return;
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

exports = module.exports.parse = (parser, buffer, config) => parse(parser, buffer, config);
exports = module.exports.parseFromString = (stringified, config) => parseFromString(stringified, config);
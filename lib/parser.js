const includes = require('./helpers/includes');
const csvParser = require('./parsers/csv');
const xlsParser = require('./parsers/xls');
const plainParser = require('./parsers/plain');
const _CONFIG = includes.parser._CONFIG;

/**
 * Parser for the several file types
 * @param {String} path Path to the file
 * @param {String} fileType Type of the file
 * @param {_CONFIG} config Config Object 
 */
function parse(path, extension = 'xls', config = _CONFIG) {
  let currentExtension = extension;
  const propExtension = path.split('.').reverse()[0];
  if (!extension) currentExtension = propExtension;

  switch(currentExtension) {
    case 'xls':
    case 'xlsx':
      return xlsParser.parse(path, config);
    case 'plain':
      return plainParser.parse(path, config);
    case 'csv':
      return csvParser.parse(path, config);
    default:
      throw new Error('Select one of the supported types!');
  }
};

exports = module.exports.parse = (path, extension = null, config = _CONFIG) => parse(path, extension, config);
exports = module.exports.parseXls = (path, config = _CONFIG) => xlsParser.parse(path, config);
exports = module.exports.parseXlsx = (path, config = _CONFIG) => xlsParser.parse(path, config);
exports = module.exports.parseCsv = (path, config = _CONFIG) => csvParser.parse(path, config);
exports = module.exports.parsePlain = (path, config = _CONFIG) => plainParser.parse(path, config);
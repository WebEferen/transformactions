const includes = require('../helpers/includes');
const normalisation = require('../helpers/normalisation');
const _CONFIG = includes.config._CONFIG;

/**
 * Parse file from XLS form
 * @param {String} path Path string
 * @param {_CONFIG} config Config Object
 */
function parse(path, config = _CONFIG) {
  const rawFile = includes.xlsx.readFile(path);
  const sheetName = config.input.sheetName;
  const sheet = (sheetName) ? sheetName : rawFile.SheetNames[0];
  const csvString = includes.xlsx.utils.sheet_to_csv(rawFile.Sheets[sheet],
    {RS: config.input.newLineDelimiter, FS: config.input.delimiter}
  );

  const parser = includes.csv({delimiter: config.input.delimiter});
  return normalisation.parse(parser, Buffer.from(csvString, 'utf8'), config); 
}

exports = module.exports.parse = (path, config = _CONFIG) => parse(path, config);
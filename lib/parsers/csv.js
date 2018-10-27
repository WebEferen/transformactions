const includes = require('../helpers/includes');
const normalisation = require('../helpers/normalisation');
const _CONFIG = includes.parser._CONFIG;

/**
 * Parse file from XLS form
 * @param {String} path Path string
 * @param {_CONFIG} config Config Object
 */
function parse(path, config = _CONFIG) {
  const parser = includes.csv({delimiter: config.input.delimiter});
  return normalisation.normalise(parser, loadFile(path), config); 
}

/**
 * Loader for the file
 * @param {String} path Path for the parsed file
 */
function loadFile(path) {
  const normalisedPath = includes.path.normalize(path);
  return includes.fs.readFileSync(normalisedPath);
}

exports = module.exports.parse = (path, config = _CONFIG) => parse(path, config);
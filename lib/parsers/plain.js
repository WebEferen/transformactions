const includes = require('../helpers/includes');
const normalisation = require('../helpers/normalisation');
const _CONFIG = includes.parser._CONFIG;

/**
 * Parse file from PLAIN form
 * @param {String} path Path string
 * @param {_CONFIG} config Config Object
 */
function parse(path, config = _CONFIG) {
  const stringified = loadFile(path).toString();
  return normalisation.normaliseFromString(stringified, config);
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
const includes = require('../helpers/includes');
const { _TO } = includes.converter;

/**
 * Converter function
 * @param {String[]} data Arrayed data
 * @param {_TO} to To Object
 */
function convert(data, to = _TO) {
  if (data.length === 0) return false;
  if (!to.withHeaders) data.splice(0, 1);
  const path = includes.path.normalize(to.path);
  includes.fs.writeFileSync(path, data);
  includes.fs.unlink(oldPath);
  return true;
}

exports = module.exports.convert = (data, to = _TO, oldPath) => convert(data, to, oldPath);
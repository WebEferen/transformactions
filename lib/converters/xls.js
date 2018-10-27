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
  if (to.deletePrevious) includes.fs.unlink(path);

  const workBook = includes.xlsx.utils.book_new();
  const workSheet = includes.xlsx.utils.aoa_to_sheet(data);
  includes.xlsx.utils.book_append_sheet(workBook, workSheet);
  includes.xlsx.writeFile(workBook, path, {bookType: to.type});
  
  if (to.deleteBaseFile) includes.fs.unlink(oldPath);
  return true;
}

exports = module.exports.convert = (data, to = _TO, oldPath) => convert(data, to, oldPath);
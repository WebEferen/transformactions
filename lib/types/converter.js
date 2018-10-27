const _OPTIONS = {
  headerLine: 0,
  contentStartsAt: 1,
  excludedLines: [],
  delimiter: ';',
  newLineDelimiter: '\r\n',
  sheetName: null
};

const _FROM = {
  path: '',
  type: 'xls',
  options: _OPTIONS
};
const _TO = {
  path: '',
  type: 'csv',
  withHeaders: true,
  deletePrevious: true,
  deleteBaseFile: false
};

exports = module.exports._OPTIONS = _OPTIONS;
exports = module.exports._FROM = _FROM;
exports = module.exports._TO = _TO;
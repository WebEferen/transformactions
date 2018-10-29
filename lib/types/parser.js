const _INPUT = {
  delimiter: ';',
  newLineDelimiter: '\r\n',
  headerLine: null,
  contentStartsAt: 1,
  excludedLines: [],
  sheetName: null
};

const _CONFIG = {
  input: _INPUT,
  headerKeys: false,
  autoHeaders: false
};

exports = module.exports._CONFIG = _CONFIG;
exports = module.exports._INPUT = _INPUT;
const transformactions = require('./');

// Text parsing

// transformactions.parser.parse('test.txt', 'plain', {
//   input: {
//     headerLine: 0,
//     contentStartsAt: 1,
//     newLineDelimiter: '\n',
//     delimiter: ';',
//   }
// }).then((res) => console.log(res));

// XLS parsing

transformactions.converter.convert({
  path: 'test.txt',
  type: 'plain',
  options: {
    headerLine: 0,
    contentStartsAt: 1,
    delimiter: ';',
    newLineDelimiter: '\n'
  },
}, {
  path: 'test.xls',
  type: 'xls',
  deletePrevious: false,
  deleteBaseFile: false,
  withHeaders: true
}).then(() => console.log('Converted Successfully!'));

transformactions.parser.parse('test.xls', 'xls', {
  input: {
    headerLine: 0,
    contentStartsAt: 1,
    delimiter: ';',
    newLineDelimiter: '\n',
    sheetName: ''
  },
  headerKeys: true
}).then((res) => console.log(res));

// CSV parsing

// transformactions.parser.parse('test.csv', 'csv', {
//   input: {
//     headerLine: 0,
//     contentStartsAt: 1,
//     delimiter: ';'
//   },
//   headerKeys: true
// }).then((res) => console.log(res));
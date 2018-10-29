const parser = require('./parser');
const includes = require('./helpers/includes');
const { _FROM, _TO } = includes.converter;

const csvConverter = require('./converters/csv');
const plainConverter = require('./converters/plain');
const xlsConverter = require('./converters/xls');

function convert(from = _FROM, to = _TO) {
  return new Promise(async (resolve, reject) => {
    const [error, data] = await includes.to(parse(from));
    if (error) reject(new Error('Unable to convert file!'));

    switch(to.type) {
      case 'xls':
      case 'xlsx':
        return resolve(xlsConverter.convert(data, to, from.path));
      case 'csv':
        return resolve(csvConverter.convert(data, to, from.path));
      default:
        return resolve(plainConverter.convert(data, to, from.path));
    }
  });
}

function parse(from = _FROM) {
  const path = from.path.split('.').reverse()[0] || '';
  switch(path) {
    case 'xls':
    case 'xlsx':
      return parser.parseXls(from.path, {input: from.options, headerKeys: false}).catch((e) => console.log('ERROR'));
    case 'csv':
      return parser.parseCsv(from.path, {input: from.options, headerKeys: false});
    case 'txt':
    case 'plain':
      return parser.parsePlain(from.path, {input: from.options, headerKeys: false});
    default:
      return new Error('Unsupported file type!');
  }
}

exports = module.exports.convert = (from = _FROM, to = _TO) => convert(from, to);
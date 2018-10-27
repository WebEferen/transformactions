const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const csv = require('csv-parse');

const parser = require('../types/parser');
const converter = require('../types/converter');

exports = module.exports.path = path;
exports = module.exports.fs = fs;
exports = module.exports.xlsx = xlsx;
exports = module.exports.csv = csv;
exports = module.exports.parser = parser;
exports = module.exports.converter = converter;
exports = module.exports.to = (promisable) => to(promisable);

function to(promisable) {
  return promisable.then((res) => [null, res]).catch((err) => [err, null]);
}
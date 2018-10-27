const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const csv = require('csv-parse');
const config = require('../types/config');

exports = module.exports.path = path;
exports = module.exports.fs = fs;
exports = module.exports.xlsx = xlsx;
exports = module.exports.csv = csv;
exports = module.exports.config = config;
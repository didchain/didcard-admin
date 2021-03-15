const path = require('path');

const R = (...p) => path.resolve(__dirname, '../', ...p);

module.exports = {
  context: path.resolve(__dirname, '..'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '..', 'dist'),
  distzip: path.resolve(__dirname, '..', 'dist-zip'),
  favicon: path.resolve(__dirname, '..', 'favicon.ico'),
  R,
};

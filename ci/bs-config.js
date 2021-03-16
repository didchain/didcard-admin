const { R, dist } = require('./paths');

module.exports = {
  port: 8964,
  browser: ['firefox'],
  files: ['./dist/**/*.{html,css,js}'],
  server: {
    baseDir: dist,
  },
  open: true,
};

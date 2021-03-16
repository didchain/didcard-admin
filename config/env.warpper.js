const pkgJson = require('../package.json');

let PKG_VERSION = pkgJson.version || '1.0.0';

let localeEnv = {};
if (process.env.NODE_ENV === 'development') {
  localeEnv = require('./.env.dev.js');
} else if (process.env.NODE_ENV === 'production') {
  localeEnv = require('./.env.prod.js');
}

const PORT = process.env.PORT && Number(process.env.PORT);

const mixinProperty = (key, defaultValue = '') => {
  return process.env[key] || localeEnv[key] || defaultValue;
};

module.exports = {
  APP_NAME: mixinProperty('APP_NAME'),
  APP_VERSION: mixinProperty('APP_VERSION', PKG_VERSION),
  DEV_HOST: process.env.HOST || 'localhost',
  DEV_PORT: PORT || 8694,
};

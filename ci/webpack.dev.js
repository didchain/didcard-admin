'use strict';

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const portfinder = require('portfinder');

const providerEnv = require('../config/env.warpper');

const { R, dist } = require('./paths');

const baseWebpackConfig = require('./webpack.base');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development', //Prevent accidental modification
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: dist,
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: providerEnv.DEV_HOST,
    port: providerEnv.DEV_PORT,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    historyApiFallback: true, //controll router mode history
    proxy: {
      '/api': {
        target: 'http://39.99.198.143:60998/api', //47.113.87.58,39.99.198.143
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    stats: {
      colors: true,
      // Add build date and time information
      builtAt: true,
      // Add information about cached (not built) modules
      cached: true,
      // Show cached assets (setting this to `false` only shows emitted files)
      cachedAssets: true,
      modules: false,
      // Add children information
      children: false,
    },
    http2: true,
  },
  plugins: [],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = providerEnv.DEV_PORT;

  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;

      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running on : http://${devWebpackConfig.devServer.host}:${port}`,
            ],
          },
        }),
      );

      resolve(devWebpackConfig);
    }
  });
});

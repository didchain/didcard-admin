'use strict';

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base');
function prodWebpack() {
  return merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
      new CleanWebpackPlugin(),
      new OptimizeCSSPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  });
}
module.exports = prodWebpack;

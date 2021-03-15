'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

const { R, context, src, dist, favicon } = require('./paths');
const providerEnv = require('../config/env.warpper');

const devMode = process.env.NODE_ENV !== 'production';

const webSubPath = process.env.WEB_SUB || '';

const baseWebpackConfig = {
  context,
  entry: {
    admin: R(src, 'main.js'),
  },
  output: {
    path: dist,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: devMode ? '' : `/${webSubPath}`,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    modules: [src, R('node_modules')],
    alias: {
      '@': src,
      '@lib': R(src, 'libs'),
      '@ui': R(src, 'ui'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: [src],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          prettify: false,
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
            ],
          },
        },
        // loader: require.resolve('babel-loader'),
        // include: [src, R('node_modules/webpack-dev-server/client')],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true,
              },
              additionalData: "@import '@/styles/variables.scss'",
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true,
              },
              additionalData: "@import '@/styles/variables.scss';",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin({
      progressiveImages: true,
      match(originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith('core-')) {
          return [
            camelTag,
            `import ${camelTag} from '@/components/core/${camelTag.substring(
              4,
            )}.vue'`,
          ];
        }
      },
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode
        ? 'css/[name].css'
        : 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: providerEnv.APP_NAME || 'Admin',
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: favicon,
          to: R(dist, 'favicon.ico'),
        },
      ],
    }),
  ],
};

module.exports = baseWebpackConfig;

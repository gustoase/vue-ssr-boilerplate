const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      public: path.resolve(__dirname, '../public'),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(css|scss)$/,
        oneOf: [
          // это соответствует `<style module>`
          {
            resourceQuery: /module/,
            use: isProd
              ? ExtractTextPlugin.extract({
                use: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      minimize: true,
                      modules: true,
                      localIdentName: '[local]_[hash:base64:5]',
                    },
                  },
                  'sass-loader',
                ],
                fallback: 'vue-style-loader',
              })
              : [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true,
                    modules: true,
                    localIdentName: '[local]_[hash:base64:5]',
                  },
                },
                'sass-loader',
              ],
          },
          // это соответствует простому `<style>` или `<style scoped>`
          {
            use: isProd
              ? ExtractTextPlugin.extract({
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader',
                ],
                fallback: 'vue-style-loader',
              })
              : [
                'vue-style-loader',
                'css-loader',
                'sass-loader'],
          },
        ],
      },
    ],
  },
  performance: {
    hints: false
  },
  plugins: isProd
    ? [
      new VueLoaderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css',
      }),
    ]
    : [
      new VueLoaderPlugin(),
      new FriendlyErrorsPlugin(),
    ],
};

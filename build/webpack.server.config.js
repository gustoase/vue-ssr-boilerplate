const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const base = require('./webpack.base.config');

const MAIN_MODULES_PATH = path.resolve(__dirname, '../node_modules/');

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, '../src'),
      'vue$': path.resolve(MAIN_MODULES_PATH, 'vue/dist/vue.esm.js'),
      'vuex$': path.resolve(MAIN_MODULES_PATH, 'vuex/dist/vuex.esm.js'),
      "@cds/components": path.resolve(MAIN_MODULES_PATH, '@cds/components')
    },
    extensions: ['.js', '.vue', '.scss', '.sass'],
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/,
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
    }),
    new VueSSRServerPlugin(),
  ],
});

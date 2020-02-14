const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');

const MAIN_MODULES_PATH = path.resolve(__dirname, '../node_modules/');

const config = merge(base, {
  entry: {
    app: './src/entry-client.js',
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
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context)
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          && !/\.css$/.test(module.request)
        );
      },
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new VueSSRClientPlugin(),
  ],
});

module.exports = config;

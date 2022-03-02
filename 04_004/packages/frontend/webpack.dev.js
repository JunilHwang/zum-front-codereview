const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({__DEV__: true})
  ]
});

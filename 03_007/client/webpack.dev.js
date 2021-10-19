const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './public'),
    },
    port: 3000,
    hot: true,
    historyApiFallback: {
      index: '/',
    },
  },
});

// webpack dev 설정

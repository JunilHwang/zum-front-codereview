const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash:10].min.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:10].min.css',
    }),
    new CssMinimizerPlugin(),
  ],
});

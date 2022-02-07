const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const kAssetPath = process.env.ASSET_PATH || '/';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: kAssetPath,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward'
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve('src')
    }
  }
};

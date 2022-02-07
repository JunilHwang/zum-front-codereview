const dotenv = require('dotenv');
const path = require('path');

const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {
  dotenv.config({
    path: `${__dirname}/.env.production`,
  });

  return {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
      }),
      new DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist'],
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', 'css'],
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@view': path.resolve(__dirname, './src/views'),
        '@component': path.resolve(__dirname, './src/components'),
        '@css': path.resolve(__dirname, './src/stylesheets'),
        '@util': path.resolve(__dirname, './src/utils'),
        '@router': path.resolve(__dirname, './src/routes'),
      },
    },
  };
};

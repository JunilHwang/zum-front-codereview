const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: '/node_modules/',
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    port: 8080,
    open: true,
  }
};
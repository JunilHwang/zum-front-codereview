const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    zoom: ['./src/main.js', './src/scss/style.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'src/static'),
    filename: 'js/[name].bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.scss'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css',
      chunkFilename: 'css/[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

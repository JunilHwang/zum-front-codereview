const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/App.js', './src/css/main.css'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: __dirname + './build',
    },
    compress: true,
    port: 9010,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: '3.6.4',
                    targets: {
                      chrome: '87',
                    },
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zum-Board</title>
</head>
<body>
  <div id="root">
  </div>
</body>
</html>
`,
    }),
  ],
  devtool: 'source-map',
  mode: 'development',
};

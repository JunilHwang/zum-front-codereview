const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development' // 모드 구분
module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: "source-map", // 개발자 모드에서 원본 코드처럼 볼 수 있음
  entry: isDev ? ['webpack-hot-middleware/client', './src/server/entry.js'] : "./src/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "http://localhost:3000/public" // 미들웨어 장소
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }] // modules:false = import되지 않은 export들을 정리해줌 (트리쉐이킹)
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", // html 파일도 같이 bundle
    }),
    new MiniCssExtractPlugin({ // style 태그 대신 css 파일도 함께 bundle
      filename: 'style.css',
      chunkFilename: 'style.css',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};
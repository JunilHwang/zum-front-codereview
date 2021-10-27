const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || "development";
const webpackSettings = {
  mode,
  devtool: mode === "development" ? "eval-source-map" : "source-map",
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".tsx", ".ts", ".js"], // 같은 이름이지만 확장자가 다르다면, 맨 앞에 있는 확장자가 우선.
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@public": path.resolve(__dirname, "public"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: { loader: "ts-loader" },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_module/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(webp|jpe?g|png|gif|svg)$/i,
        exclude: /node_module/,
        use: { loader: "file-loader" },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html"),
    }),
  ],
  devServer: {
    hot: true, // 핫 모듈 리플레이스먼트
    port: 3000,
    open: true, // 개발 서버 실행 시, 브라우저 창 open
    historyApiFallback: true, // 히스토리 API를 사용하는 SPA 개발시 설정
    client: {
      overlay: true, // 컴파일러 오류 있을 시 브라우저 화면에 표시
    },
  },
};

module.exports = webpackSettings;

const path = require("path");
const getAbsolutePath = (target) => path.resolve(__dirname, target);

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// -------

const mode = process.env.NODE_ENV || "development";
const isDevMode = mode === "development";

/*
  eval-source-map: 고품질 소스맵을 포함한 개발 빌드를 위한 옵션
  hidden-source-map: 참조가 없으며, 에러 보고 목적으로 소스맵을 사용할 때 선택.
*/
const devtool = isDevMode ? "eval-source-map" : "hidden-source-map";
const entry = {
  app: path.join(__dirname, "src", "index.ts"),
};
const output = {
  filename: "[name].js",
  path: path.resolve(__dirname, "dist"),
};

const resolve = {
  modules: ["node_modules"],
  extensions: [".tsx", ".jsx", ".ts", ".js"],
  alias: {
    "@src": getAbsolutePath("src"),
    "@public": getAbsolutePath("public"),
    "@common": getAbsolutePath("../common"),
  },
};

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "./public/index.html"),
    // 번들링된 HTML 파일에서 공백이 제거되고 주석이 삭제됨
    minify:
      process.env.NODE_ENV === "production"
        ? {
            collapseWhitespace: true,
            removeComments: true,
          }
        : false,
    hash: true, // 정적 파일을 불러올 때 쿼리문자열에 웹팩 해쉬값을 추가.
  }),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin(),
];

const webpackModule = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_module/,
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
    {
      test: /\.tsx?$/,
      exclude: /node_module/,
      loader: "ts-loader",
    },
    {
      test: /\.s[ac]ss$/i,
      exclude: /node_module/,
      use: [isDevMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },
    {
      test: /\.(webp|jpe?g|png|gif|svg)$/i,
      exclude: /node_module/,
      use: { loader: "file-loader" },
    },
  ],
};

const devServer = {
  hot: true, // 핫 모듈 리플레이스먼트
  port: 3000,
  open: true, // 개발 서버 실행 시, 브라우저 창 open
  historyApiFallback: true, // 히스토리 API를 사용하는 SPA 개발시 설정. 404가 발생하면 index.html로 리다이렉트
  client: {
    overlay: true, // 컴파일러 오류 있을 시 브라우저 화면에 표시
  },
  proxy: {
    "/api": "http://localhost:4000",
  },
};

// ====================================================================================================

module.exports = {
  mode,
  devtool,
  entry,
  output,
  resolve,
  plugins,
  module: webpackModule,
  devServer: isDevMode ? devServer : {},
};

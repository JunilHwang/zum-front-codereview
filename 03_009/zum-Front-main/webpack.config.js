const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const { resolve } = require("path");

module.exports = {
  mode: "development",

  entry: {
    app: "./index.js",
    roouter: "./router.ts",
  },
  output: {
    path: resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // output file name
      template: "index.html", // template file name
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' ,   chunkFilename: "[id].css"
  }),
    new CleanWebpackPlugin({
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
            },
          },
        ],
      },
    ],
  },
};


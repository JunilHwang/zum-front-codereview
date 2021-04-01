const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production", // development/production
  devtool: "inline-source-map",
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new ManifestPlugin.WebpackManifestPlugin({
      fileName: "manifest.json",
      basePath: "./dist/",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["css", "index", "app", "system", "monitor"],
    }),
    new CopyPlugin({
      patterns: [{ from: "public/img", to: "./img" }],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    port: 80,
  },
};

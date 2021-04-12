const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const envTypes = {
  production: "production",
  development: "development",
};

const isEnvProduction = process.env.NODE_ENV === envTypes.production;
const mode = isEnvProduction ? envTypes.production : envTypes.development;

/**
 * getConfig
 * @returns {Object} configuration object
 */
const getConfig = (isEnvProduction) => {
  const target = "web";

  const entry = {
    client: resolve(__dirname, "index.js"),
  };

  const output = {
    path: resolve(__dirname, "..", "prod"),
    filename: `index.js`,
  };

  const defaultRules = [
    {
      test: /\.js$/,
      loader: "babel-loader",
      options: {
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead",
              useBuiltIns: "usage",
              modules: isEnvProduction ? false : "auto",
              corejs: "3.0.0",
            },
          ],
        ],
      },
      exclude: /node_modules/,
    },
    // {
    //   enforce: "pre",
    //   test: /\.js$/,
    //   use: ["source-map-loader"],
    //   exclude: /node_modules/,
    // },
  ];

  const styleRules = {
    test: /.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  };

  const modules = { rules: [...defaultRules, styleRules] };

  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].scss",
      chunkFilename: "[id].css",
    }),
  ];

  const optimization = {
    minimize: isEnvProduction,
  };

  const devtool = isEnvProduction ? "eval" : "source-map";

  const devServer = isEnvProduction
    ? null
    : {
        port: 5000,
        proxy: {
          "/api": "http://localhost:3000",
        },
        hot: true,
      };

  const configs = {
    target,
    mode,
    entry,
    output,
    module: modules,
    plugins,
    optimization,
    devtool,
    devServer,
  };

  return configs;
};

const configs = getConfig(isEnvProduction);

module.exports = configs;

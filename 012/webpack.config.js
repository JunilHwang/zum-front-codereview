const path = require("path");

module.exports = {
  mode: "development",
  entry: "./frontend/src/router.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    // reules: [{ test: /\.css$/, loader: "style-loader!css-loader" }],
  },
};

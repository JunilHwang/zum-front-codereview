const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    mode : "development",

    target: 'node', 

    entry: './server.js',

    output: { 
        path: path.join(__dirname, './public'), 
        filename: 'server.js',
    },

    externals: [webpackNodeExternals()], 
    module: {
        rules: [
        { 
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { 
              presets: [ 
                [ '@babel/preset-env', 
                  { useBuiltIns: "usage", corejs:{ version : 3 } }
                ],
              ],
              plugins : [ 
                  // "@babel/plugin-proposal-object-rest-spread",
                  // "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-transform-modules-commonjs"
                ]
            }
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          }

        ],
      },
  plugins : [ new NodePolyfillPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  devtool : 'source-map'

};

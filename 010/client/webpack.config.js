const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/main.js'], // ,'./src/sass/main.scss'

  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // output file name
      template: 'index.html'  // template file name
    }),
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    })
  ],

  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
         /* devMode ? 'style-loader' : */
         MiniCssExtractPlugin.loader,
         'css-loader',
         'sass-loader',
        ],
       },
       {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
         {
          loader: 'url-loader',
          options: {
           useRelativePath: true,
           limit: 10000
          }
         }
        ]
       },
        {
          test: /\.s(a|c)ss$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader",   // translates CSS into CommonJS
            "sass-loader"   // compiles Sass to CSS, using Node Sass by default
          ],
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          include: [
            resolve(__dirname, 'src')
          ],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        },
        {
          exclude: /\.(s?(a?|c)ss|js|html)$/,
          loader: 'file-loader',
          options: {
            name: '[hash:10].[ext]'
          }
        }
    ]
  }
}
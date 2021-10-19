const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              // disable type checker
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      }, // file-loader 대신 사용
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/dist/static/style/',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js', '.scss', '.css'], // 앞에서부터 순서대로 해석
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/style/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: { ignore: '**/index.html' },
        },
      ],
    }),
  ],
  output: {
    filename: 'main.[hash].bundle.js',
    assetModuleFilename: 'static/images/[hash][ext][query]',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
};
// webpack 공통 설정

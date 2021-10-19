const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'PRODUCTION';

const styleLoader = {
  loader: 'style-loader',
  options: {
    // 여러개의 css, 또는 sass 파일을 불러올때 html파일에 여러개의 style태그가 생기는것이 아닌 하나의 style태그로 번들링해주는 옵션입니다.
    injectType: 'singletonStyleTag',
  },
};

module.exports = {
  entry: ['./src/index.ts'],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // 어떤 파일들이 loader의 대상이 될지 정규표현식을 통해 작성해줍니다.
        test: /\.s[ac]ss$/i,
        oneOf: [
          {
            // filename.module.css의 형식에 맞는 파일들만 해당 설정을 적용합니다.
            test: /\.module\.css$/i,
            // 사용하는 loader의 key 또는 객체 형식으로 loader key와 options를 설정해줄 수 있습니다.
            use: [
              !isProduction ? styleLoader : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  // css를 module처럼 사용하기 위해 클래스 선택자를 해시값으로 만들어주고 그것을 js파일에서 import해서 사용할 수 있다.
                  modules: true,
                },
              },
            ],
          },
          {
            use: [
              !isProduction ? styleLoader : MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ],
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                return isProduction ? '[contenthash].[ext]' : '[path].[name].[ext]';
              },
              publicPath: 'assets/',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      inject: 'body',
      filename: path.join(__dirname, './dist/index.html'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    client: {
      overlay: true,
    },
  },
  devtool: 'source-map',
  mode: 'development',
};

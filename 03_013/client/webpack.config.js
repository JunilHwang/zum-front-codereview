const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// config.mode에 따라 동작을 변경하려면 객체 대신 함수 export
// 참고 : https://webpack.kr/configuration/mode/#mode-none
module.exports = (_, argv) => {
  const isDevelopment = argv.mode !== 'production';

  return {
    entry: './src/index.js', // 웹팩이 어디를 출발지점으로 번들링할지 명시
    // 결과물을 어디로 보낼지 지정하는 속성
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true, // 결과물이 담기는 디렉토리에서 사용하지 않는 파일 알아서 정리
    },
    devtool: isDevelopment ? 'eval-source-map' : 'hidden-source-map',
    // 웹팩은 기본적으로 *.js와 *.json 파일만 번들링한다
    // 다른 형식의 파일들을 번들링하기 위해 loader를 사용한다
    module: {
      rules: [
        // babel은 최신 자바스크립트 문법을 구형 브라우저에서도 동작할 수 있도록 변환(트랜스파일링)
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      // 빌드 이전 결과물 제거 플러그인
      new CleanWebpackPlugin(),
      // 모든 번들을 포함하는 HTML 문서를 자동으로 생성 플러그인
      new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
    // webpack-dev-server 플러그인은 코드 수정-저장했을 때 다시 빌드해주는 핫 리로드 기능을 기본으로 제공하고
    // 그 외에 유용한 옵션이 많다 https://webpack.js.org/configuration/dev-server/#root
    devServer: {
      historyApiFallback: true, // HTML5 History API를 사용했을 때 404 응답코드를 받으면 index.html로 리다이렉트
      port: 3000,
      liveReload: true,
      open: true,
    },
  };
};

// express 설정
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const webpackDevMidddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const getApi = require('./getApi.js');

const app = express();
const compiler = webpack(webpackConfig);

const path = require("path");
const port = 3000;

// '/' -> index.html
app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

// express(server)가 webpack(compiler)을 사용하게 함
app.use(webpackDevMidddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

// 확인 로그
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});


// api 호출 설정
getApi(app);
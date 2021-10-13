'use strict';
const express = require('express');
const path = require('path');
const app = express();
const db = require('./db.json');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const { parsing } = require('./src/lib/crowling');
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }),
);

// webpack과 연동
app.get('/', (req, res) =>
  res.send(res.sendFile(path.resolve(__dirname, 'dist/index.html'))),
);

// GET - 랭킹 데이터
app.get('/api/best', (req, res) => {
  res.send(db['best']);
});

// GET - 카테고리별 데이터
app.get('/api/content/:category', (req, res) => {
  const { category } = req.params;
  res.send(db[category]);
});

// GET - 상세 페이지
app.get('/api/detail/:idx', async (req, res) => {
  const { idx } = req.params;
  const data = await parsing(idx);
  res.send(data);
});

app.listen(3000, () => console.log('ZUM Hub site is listening on port 3000!'));

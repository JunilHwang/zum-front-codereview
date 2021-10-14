const express = require('express');
const mock = require('./mock.js');
const app = express();
const port = 3000;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/best', (req, res) => {
  res.send(mock.best);
});

app.get('api/content/life', (req, res) => {
  res.send(mock.life);
});

app.get('api/content/food', (req, res) => {
  res.send(mock.food);
});

app.get('api/content/travel', (req, res) => {
  res.send(mock.travel);
});

app.get('api/content/culture', (req, res) => {
  res.send(mock.culture);
});

app.listen(port, () => {
  console.log(`API Server app listening at http:localhost:${port}`);
});
const express = require('express');
const cors = require('cors');
const app = express();

const content = require('./content');
const bestJson = require('./json/best.json');
const createDetailPage = require('./detail');

const whitelist = 'http://localhost:1337';
const corsOption = {
  origin: whitelist,
  credentials: true,
};

app.use(cors(corsOption));

app.use('/api/content', content);

app.get('/api/best', (req, res) => {
  res.json({ state: 200, data: bestJson });
});

app.get('/api/detail/:url', (req, res) => {
  const {
    params: { url },
  } = req;

  const newUrl = url.split('').reduce((prev, cur) => {
    return cur === '-' ? (prev += '/') : (prev += cur);
  }, '');
  const idx = newUrl.split('/').pop();

  createDetailPage(idx, newUrl)
    .then((response) => {
      res.setHeader('content-type', 'text/html');
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(3000, () => {
  console.log('start server...in 3000 port');
});

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const content = require('./src/api/content');
const best = require('./src/api/best');
const detail = require('./src/api/detail');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/content', content);
app.use('/api/best', best);
app.use('/api/detail', detail);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '../client/build' });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에 열렸습니다 !`);
});

const express = require('express');

const app = express();
const fs = require('fs');
const path = require('path');

const port = 3000;

app.use('/src/static', express.static(`${__dirname}/src/static`));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

function paginationData(index, size, rawData) {
  return rawData.slice(index, index + size);
}

function makeApi(data, apiPath) {
  const dataPath = `./data/${data}.json`;

  app.get(apiPath, (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, rawData) => {
      if (err) {
        throw err;
      }

      const {
        query: { index = 0, size = 20 },
      } = req;
      const sendData = paginationData(Number(index), Number(size), JSON.parse(rawData));

      res.status(200).send(sendData);
    });
  });
}

makeApi('ranking', '/api/best');

const content = ['life', 'food', 'trip', 'culture'];
content.map((category) => makeApi(category, `/api/content/${category}`));

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

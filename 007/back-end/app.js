const express = require('express');
const fs = require('fs');
const cheerio = require('cheerio');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const getHTML = async url => {
  try {
    return await fetch(url, {
      method: 'GET',
    });
  } catch (error) {
    console.log(error);
  }
};

app.use(cors());

app.get('/api/best', (request, response) => {
  fs.readFile('./data/ranking.json', (error, data) => {
    if (error) {
      throw error;
    }

    response.send(JSON.parse(data));
  });
});

app.get('/api/content/life', (request, response) => {
  fs.readFile('./data/life.json', (error, data) => {
    if (error) {
      throw error;
    }

    response.send(JSON.parse(data));
  });
});

app.get('/api/content/food', (request, response) => {
  fs.readFile('./data/food.json', (error, data) => {
    if (error) {
      throw error;
    }

    response.send(JSON.parse(data));
  });
});

app.get('/api/content/travel', (request, response) => {
  fs.readFile('./data/travel.json', (error, data) => {
    if (error) {
      throw error;
    }

    response.send(JSON.parse(data));
  });
});

app.get('/api/content/culture', (request, response) => {
  fs.readFile('./data/culture.json', (error, data) => {
    if (error) {
      throw error;
    }

    response.send(JSON.parse(data));
  });
});

app.get('/api/detail', (request, response) => {
  const { url } = request.query;
  getHTML(url)
    .then(res => {
      return res.text();
    })
    .then(html => {
      const $ = cheerio.load(html);

      const title = $('.main_title').html();
      const body = $('.d_article').html();
      const author = $('#btn_media').html();

      const reponseHTML = `
        <div>
          <h2>${title}</h2>
          <p>${author}</p>
        </div>
        <div>
        ${body}
        </div>
      `;

      response.send(reponseHTML);
    })
    .catch(err => console.error(err));
});

app.listen(port, () => {
  console.log('running server!!');
});

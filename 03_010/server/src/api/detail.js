const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

const createLocalCache = require('../utils/cache');
const localCache = createLocalCache();

router.get('/*', async function (req, res) {
  const requestURL = req.params['0'];
  const { cache } = localCache.get(requestURL);
  if (cache) res.json(cache);
  else {
    try {
      const contentsData = await crawlData(requestURL);
      localCache.set(requestURL, contentsData);
      res.json(contentsData);
    } catch (e) {
      res.status(501).send({ ok: false, message: 'no resources in server' });
    }
  }
});

async function crawlData(requestURL) {
  const { data } = await axios.get(requestURL);
  const $ = cheerio.load(data);
  const title = $('.main_title').text();
  const writer = $('#btn_media').text();
  const body = $('.d_article').html();
  return { title, writer, body };
}

module.exports = router;

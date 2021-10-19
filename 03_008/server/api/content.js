const { default: axios } = require('axios');
const express = require('express');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/:category', async (req, res) => {
  const response = await axios.get(`https://hub.zum.com/${req.params.category}`);
  const $ = cheerio.load(response.data);

  const $articles = $('#item_list').children('li.thumb_item');

  let data = [];

  $articles.each(function (i) {
    data[i] = {
      idx: $(this).find('div.item').attr('data-id'),
      title: $(this).find('strong.title').text(),
      imageUrl: $(this).find('span.thumb > img').attr('src'),
      mediaName: $(this).find('span.author a[data-cm="writer"]').text(),
      url: $(this).find('div.item > a').attr('href'),
      summaryContent: $(this).find('div.item span.text').text(),
    };
  });

  return res.status(200).json(data);
});

module.exports = router;

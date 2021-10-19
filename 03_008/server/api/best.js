const { default: axios } = require('axios');
const express = require('express');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await axios.get('https://hub.zum.com/');
  const $ = cheerio.load(response.data);
  let rankingList = [];

  const $topList = $('.rt_top_box > ul').children('li');

  $topList.each(function (i) {
    // 아마 내부적으로 this 바인딩이 수동적으로 되어있지 않나 싶음
    rankingList[i] = {
      idx: $(this).find('a.item').attr('data-id'),
      title: $(this).find('strong.title').text(),
      mediaName: $(this).find('span.author span.name').text(),
      url: $(this).find('a.item').attr('href'),
    };
  });

  res.status(200).json(rankingList);
});

module.exports = router;

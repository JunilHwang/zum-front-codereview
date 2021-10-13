const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async url => {
  try {
    return await axios.get(url);
  } catch (e) {
    console.error('getHTML', e);
  }
};

const parsing = async idx => {
  const url = `http://hub.zum.com/detail/${idx}`;
  const html = await getHTML(url);
  const $ = cheerio.load(html.data);
  const $contents = $('.contents');

  const result = [];
  $contents.each((idx, node) => {
    result.push({
      title: $(node).find('.main_title').text(),
      media: $(node).find('#btn_media').text(),
      article: $(node).find('.article').html(),
      category: $(node).find('.category').text().slice(2, -2),
    });
  });
  return result;
};

exports.parsing = parsing;

const axios = require('axios');
const cheerio = require('cheerio');
const { contents } = require('cheerio/lib/api/traversing');

const getHTML = async url => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
  }
};
const check = async url => {
  return getHTML(url).then(({ data }) => {
    //html 본문 추출
    const category = {
      라이프: 'life',
      푸드: 'food',
      여행: 'trip',
      컬처: 'culture',
    };
    const html = cheerio.load(data).html();
    const $ = cheerio.load(data);
    const path = $('a#btn_category')[0].children[0].data.replace('[', '').replace(']', '');

    const contentsHtml = html
      .split('<!-- 메인 컨텐츠 -->')[1]
      .split('<!-- 컨텐츠 추가 정보 -->')[0];

    return {
      contentsHtml,
      path: category[path.trim()],
    };
  });
};
exports.check = check;

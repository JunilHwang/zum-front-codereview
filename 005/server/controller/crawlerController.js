import playwright from 'playwright';
import fs from 'fs';
import categoryUtil from '../utils/category.js';
import rankData from '../models/rank.js';
const dataList = [
  rankData,
  categoryUtil['life'],
  categoryUtil['food'],
  categoryUtil['travel'],
  categoryUtil['culture'],
];
const keywordList = [
  'rank_detail',
  'life_detail',
  'food_detail',
  'travel_detail',
  'culture_detail',
];
const main = async () => {
  try {
    for (let l = 0; l < dataList.length; l++) {
      const hrefList = [];
      for (let i = 0; i < dataList[l].length; i++) {
        hrefList.push(dataList[l][i].url);
      }
      const browser = await playwright.chromium.launch({
        headless: false, // 이 옵션을 통해 브라우저를 통해 직접 동작하는 것을 볼 수 있습니다.
      });

      const page = await browser.newPage();
      const result = [];
      for (let i = 0; i < hrefList.length; i++) {
        let obj = {};
        await page.goto(hrefList[i]);
        const data = await page.$('div#errorPage.message_error');
        if (data === null) {
          const title = await page.evaluate(
            () => document.querySelector('h2.main_title').innerHTML
          );
          const media = await page.evaluate(
            () => document.querySelector('a#btn_media').innerHTML
          );
          const body = await page.evaluate(() =>
            document.querySelector('.d_article').innerHTML.toString()
          );
          const date = await page.evaluate(
            () => document.querySelector('.article_info .date').innerHTML
          );
          const link = await page.evaluate(() =>
            document.querySelector('a.link.delay_loading').getAttribute('href')
          );
          obj = {
            title: title,
            media: media,
            body: body,
            date: date,
            link: link,
          };
          console.log(title, title, i + 1, media);
          result.push(obj);
        } else {
          continue;
        }
      }
      fs.writeFileSync(
        `../models/${keywordList[l]}.json`,
        JSON.stringify(result)
      );
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

console.log('test');

main();

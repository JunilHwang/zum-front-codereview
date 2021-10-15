const puppeteer = require('puppeteer');

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

async function getContentInformation(url) {
    const result = {};
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      await delay(1000);
  
      const title = await page.$eval(
          '#container > div.contents.d_contents > div.article_header > div > div > h2', (eval) => eval.textContent 
      );
      const category = await page.$eval('#btn_category', (eval) => eval.textContent)
      const mediaName = await page.$eval('#btn_media', (eval) => eval.textContent);
      const contentDetail = await page.$$eval('#container > div.contents.d_contents > div.article_wrap > div.article_body > div.article.d_article > p', (eval) => eval.reduce((prev, cur) => prev += `${cur.textContent.trim()}\n`, ''));
      await delay(3000);
      const imageUrl = await page.$$eval('#container > div.contents.d_contents > div.article_wrap > div.article_body > div.article.d_article table > tbody > tr > td > img', (eval) =>  eval.map(node => {
        return node.dataset.src ?? node.src;
      }));

      result['title'] = title;
      result['category'] = category.replace('[','').replace(']','').trim();
      result['mediaName'] = mediaName;
      result['details'] = contentDetail;
      result['imageUrl'] = imageUrl;
  
      await delay(1000);
      await browser.close();
  
      return result;

    } catch (error) {
      return error;
    }
}

module.exports = getContentInformation;
const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

// GET /api/detail/:path
router.get('/:author/:id', (req, res) => {
  let titleHTML = '';
  let articleHTML = '';
  let authorHTML = '';

  (async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://hub.zum.com${req.path}`);

    const title = await page.$('#container > div.contents.d_contents > div.article_header > div > div > h2');
    titleHTML = await page.evaluate(element => element.outerHTML, title);

    const article = await page.$('#container > div.contents.d_contents > div.article_wrap > div.article_body > div.article.d_article');
    articleHTML = await page.evaluate(element => element.outerHTML, article);

    const author = await page.$('#btn_media');
    authorHTML = await page.evaluate(element => element.outerHTML, author);

    const html = `
        ${titleHTML}
        ${articleHTML}
        ${authorHTML}
    `;

    await browser.close();
    res.send(html);
  })();
});

module.exports = router;

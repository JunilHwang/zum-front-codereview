let puppeteer = require("puppeteer");

module.exports = async function crawling(url) {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(url);
  let title = await page.$eval(".main_title", function (el) {
    return el.innerText;
  });
  let media = await page.$eval("#btn_media", function (el) {
    return el.innerText;
  });
  let article = await page.$eval(".article", function (el) {
    return el.innerText;
  });
  let card = {
    title,
    media,
    article,
  };
  console.log(card);
};

//.main_title
//#btn_media
//.article

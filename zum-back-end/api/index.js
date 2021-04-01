const fs = require("fs");
const crypto = require("crypto");
const puppeteer = require("puppeteer");
const express = require("express");
const router = express.Router();

/* 랭킹 데이터 */
router.get("/best", (req, res, next) => {
  try {
    let data = fs.readFileSync("cache/json/best.json");
    data = JSON.parse(data);
    res.json(data);
  } catch (err) {
    res.status(500).send(`Throw Exception -> ${err}`);
  }
});

/* 카테고리별 데이터 */
router.get("/content/:category", (req, res, next) => {
  try {
    // Data Check for Security
    switch (req.params.category) {
      case "life":
      case "food":
      case "culture":
      case "travel":
        break;
      default:
        throw new Error("Violating security rules");
    }

    // Data Size
    const limit = req.query.limit !== undefined ? Number(req.query.limit) : 0;
    const offset =
      req.query.offset !== undefined ? Number(req.query.offset) : 12;

    let data = fs.readFileSync(`cache/json/${req.params.category}.json`);
    data = JSON.parse(data).slice(limit * offset, limit * offset + offset);
    res.json(data);
  } catch (err) {
    res.status(500).send(`Throw Exception -> ${err}`);
  }
});

/* 상세 페이지 데이터 */
router.get("/content/:category/:idx", (req, res, next) => {
  try {
    // Data Check for Security
    switch (req.params.category) {
      case "life":
      case "food":
      case "culture":
      case "travel":
        break;
      default:
        throw new Error("Violating security rules");
    }
    if (!Number.isInteger(Number(req.params.idx))) {
      throw new Error("Violating security rules");
    }
    const idx = Number(req.params.idx);

    // categoryFindByIDX
    let data = fs.readFileSync(`cache/json/${req.params.category}.json`);
    data = JSON.parse(data);

    // quick sort
    data.sort((a, b) => {
      return b.idx - a.idx;
    });

    //binary Search
    let max = data.length - 1;
    let half = Math.floor(data.length / 2);
    let min = 0;
    while (true) {
      if (data[half].idx === idx) {
        res.json(data[half]);
        return;
      } else if (half === min || half === max) {
        if (data[max].idx === idx) res.json(data[half]);
        else if (data[min].idx === idx) res.json(data[half]);
        else res.json();
        return;
      } else if (data[half].idx < idx) {
        // upper
        max = half;
        half -= Math.floor(Math.abs(max - min) / 2);
      } else if (data[half].idx > idx) {
        // under
        min = half;
        half += Math.floor(Math.abs(max - min) / 2);
      }
    }
  } catch (err) {
    res.status(500).send(`Throw Exception -> ${err}`);
  }
});

/* 상세 페이지 데이터 컨텐츠 HTML */
router.get("/detail/:url", (req, res, next) => {
  try {
    // Data Check for Security
    if (!req.params.url.match(/[http://hub.zum.com/]+\w+[/]+\d/i)) {
      throw new Error("Violating security rules");
    }

    // URL to md5 hash
    const hashFileName = crypto
      .createHash("md5")
      .update(req.params.url)
      .digest("hex");

    // puppeteer crawling
    const crawling = async () => {
      const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();
      await page.goto(req.params.url);
      let data = await page.$eval(
        "#container > div.contents.d_contents > div.article_wrap > div.article_body > div.article.d_article",
        (element) => {
          return element.textContent;
        }
      );
      browser.close();

      // local cache store
      fs.writeFile(`cache/local/${hashFileName}`, data, (err) => {
        if (err) {
          throw new Error(`FileWrite: ${err}`);
        }
      });

      return data.toString();
    };

    // Local cache find
    let result;
    fs.stat(`cache/local/${hashFileName}`, async (exists) => {
      if (exists === null) {
        // cache exists
        result = await fs.readFileSync(`cache/local/${hashFileName}`);
      } else {
        // cache doesn't exists
        result = await crawling();
      }

      // send
      res.send(result);
    });
  } catch (err) {
    res.status(500).send(`Throw Exception -> ${err}`);
  }
});
module.exports = router;

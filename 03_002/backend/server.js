const express = require('express')
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express()
app.use(cors());

const lifeJson = require('./life.json')
const rankJson = require('./rank.json')
const foodJson = require('./food.json')
const travelJson = require('./travel.json')
const cultureJson = require('./culture.json')

app.get('/api/life', (req, res) => {
    return res.json(lifeJson)
})
app.get('/api/rank', (req, res) => {
    return res.json(rankJson)
})
app.get('/api/food', (req, res) => {
    return res.json(foodJson)
})
app.get('/api/travel', (req, res) => {
    return res.json(travelJson)
})
app.get('/api/culture', (req, res) => {
    return res.json(cultureJson)
})
app.get('/detail/:category/:id', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://hub.zum.com/${req.params.category}/${req.params.id}`);

    let data = {}
    data.idx = req.params.id
    data.title = await page.$eval('#container > div.contents.d_contents > div.article_header > div > div > h2', (data) => data.textContent);
    data.category = await page.$eval('#container > div.contents.d_contents > div.article_header > div > div > p.top > strong.category', (data) => data.textContent);
    data.mediaName = await page.$eval('#container > div.contents.d_contents > div.article_header > div > div > p.writer', (data) => data.textContent);
    data.date = await page.$eval('#container > div.contents.d_contents > div.article_wrap > div.article_body > div.article_info > span.date', (data) => data.textContent);
    data.url = `https://hub.zum.com/${req.params.category}/${req.params.id}`

    const subtitleElement = await page.evaluate(() => {
        const element =  document.querySelector('.short_title')
        if (element) {
            return element.innerText
        }
        return ''
    })
    data.subtitle = subtitleElement

    const imageElement = await page.evaluate(() => {
        const element = Array.from(document.querySelectorAll('.d_article img'))
        if (element) {
            return element.map((e) => e.getAttribute('src'))
        }
        return '';
    })
    data.image = imageElement

    const contentElement = await page.evaluate(() => {
        const element = Array.from(document.querySelectorAll('.d_article p'))
        if (element) {
            return element.map((e) => e.innerText)
        }
        return '';
    })
    data.content = contentElement

    await browser.close();

    return res.json(data)
})

app.listen(3000, () => {
    console.log("api app port 3000")
})
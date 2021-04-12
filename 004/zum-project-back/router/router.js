const express = require('express');
const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

const best = require('../data/best');
const life = require('../data/life');
const food = require('../data/food');
const trip = require('../data/trip');
const culture = require('../data/culture');

const all = (() => {
    const items = [...best, ...life, ...food, ...trip, ...culture];
    return items.reduce((obj, item) => {
        return { ...obj, [item.idx]: item };
    }, {});
})();

router.get('/best', (req, res) => {
    // setTimeout(() => {
    const resData = {
        best,
        category: {
            life: life.slice(0, 4),
            food: food.slice(0, 4),
            trip: trip.slice(0, 4),
            culture: culture.slice(0, 4),
        },
    };
    res.send(resData);
    // }, 1000);
});

router.get('/content/:category', (req, res) => {
    // setTimeout(() => {
    const { category } = req.params;
    let resData = {};

    switch (decodeURIComponent(category)) {
        case 'life':
            resData = { data: life };
            break;
        case 'food':
            resData = { data: food };
            break;
        case 'trip':
            resData = { data: trip };
            break;
        case 'culture':
            resData = { data: culture };
            break;
        default:
            resData = { error: '등록되지 않은 카테고리입니다.' };
            break;
    }
    res.send(resData);
    // }, 1000);
});
router.get('/favor', (req, res) => {
    // setTimeout(() => {
    const { idx } = req.query;
    const idxs = JSON.parse(decodeURIComponent(idx));
    const resData = {
        data: idxs.map((idx) => all[idx]),
    };
    res.send(resData);
    // }, 1000);
});
router.get('/detail/:url', async (req, res) => {
    const { url } = req.params;
    try {
        const content = await crawler(decodeURIComponent(url));
        const resData = {
            ...content,
        };
        // setTimeout(() => {
        res.send(resData);
        // }, 1000);
    } catch (error) {
        console.error(error);
    }
});

const crawler = async (url) => {
    try {
        const getContent = await axios.get(url).then((data) => {
            const $ = cheerio.load(data.data);
            const title = $('.article_title_wrap .main_title').text();
            const media = $('.article_title_wrap #btn_media').text();
            const content = $('.article_wrap .d_article').html();

            return { title, media, content };
        });
        return getContent;
    } catch (error) {
        console.error(error);
    }
};
module.exports = router;

const e = require('express');
const puppeteer = require('puppeteer');

const getApi = (app) => {
    const getList = (filePath) => {
        let data = [];
        try {
            data = require(filePath);
        } catch (err) {
            console.log('데이터를 불러오지 못했습니다.');
        }
        return data;
    }
    
    // 랭킹 리스트 호출
    app.get('/api/best', (req, resp) => resp.json(getList('../api/best/ranking.json')));
    
    // 카테고리 리스트 호출
    app.get('/api/content/:category', (req, resp) => resp.json(getList(`../api/content/${req.params.category}.json`)));
    
    // 상세페이지 api 구현해야함 (미완성)
    app.get('/api/detail/:url', async (req, resp) => {
        const url = req.params.url;
        let contents = {};

        // 개발모드일때만 headless: false
        const browser = await puppeteer.launch({ headless: process.env.NODE_ENV === 'production' });
        const page = await browser.newPage();
        await page.goto(`https://hub.zum.com/post/${url}`);

        // 타이틀, 기사내용의 html을 스크래핑해줌
        const title = await page.$eval('.article_header', el => el.innerHTML);
        const content = await page.$eval('.d_article', el => el.innerHTML);
        
        // 브라우저 종료
        await browser.close();

        contents.title = title;
        contents.content = content;

        return resp.send(contents);
    });
};

module.exports = getApi;
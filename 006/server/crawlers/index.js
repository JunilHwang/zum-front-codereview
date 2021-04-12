// @ts-check
import { chromium } from "playwright";

import { categories, crawlerTypes, crawlInterval, assetsPath } from "../types";
import getCardInfo from "./getCardInfo";
import getDetailPage from "./getDetailPage";
import getRanking from "./getRanking";
import writeJSON from "./writeJSON";

/**
 * launchCrawler
 * - 타입에 따라 해당 crawler 실행
 * @param {crawlerTypes} crawler 크롤러 타입, "cardInfo" | "detailPage" | "ranking"
 * @param {string} [url] 상세페이지 url
 * @param {number} [idx] 상세페이지 idx
 */
const launchCrawler = async (crawler, url, idx) => {
  if (!(crawler in crawlerTypes)) {
    console.error("잘못된 크롤러 타입입니다");
    return;
  }

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // 카테고리별 카드 크롤러
    if (crawler === crawlerTypes.cardInfo) {
      // crawl data from subpages
      const data = [];
      for (const category of categories) {
        const cards = await getCardInfo(page, category);
        if (cards) data.push(cards);
      }

      // crawl detail data from crawled categories data
      for (const { data: categoryInfos } of data) {
        for (const { url, idx } of categoryInfos) {
          const detail = await getDetailPage(page, url, idx);
          const path = assetsPath.getDetailPath(idx);
          writeJSON(path, [detail]);
        }
      }

      await browser.close();

      // write data as JSON
      for (const { category, data: datum } of data) {
        const path = assetsPath.getCategoryPath(category);
        writeJSON(path, datum);
      }
      return;
    }

    // 상세 페이지 크롤러
    if (crawler === crawlerTypes.detailPage) {
      if (url.length === 0) {
        console.log("url이 입력되지 않았습니다");
        return;
      }

      const detail = await getDetailPage(page, url, idx);
      await browser.close();

      if (!detail) {
        console.error("[ERROR] 상세 페이지 내용이 없습니다");
        return;
      }

      const path = assetsPath.getDetailPath(idx);
      writeJSON(path, [detail]);
    }

    // 랭킹 크롤러
    if (crawler === crawlerTypes.ranking) {
      const rankings = await getRanking(page);
      await browser.close();

      if (!rankings) {
        console.error("[ERROR] 랭킹 결과가 정상적으로 크롤링 되지 않았습니다");
        return;
      }

      const path = assetsPath.rankingPath;
      writeJSON(path, rankings);
    }

    return;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const initCrawler = () => {
  const rankCrawler = launchCrawler(crawlerTypes.ranking);
  const cardsCrawler = launchCrawler(crawlerTypes.cardInfo);

  Promise.all([rankCrawler, cardsCrawler])
    .catch(() => {
      console.error("[ERROR] 초기 크롤링 실패");
    })
    .finally(() => {
      setInterval(() => {
        console.log("__get data through cardInfo Crawler__");
        launchCrawler(crawlerTypes.cardInfo);
      }, crawlInterval);
    });
};

export default launchCrawler;

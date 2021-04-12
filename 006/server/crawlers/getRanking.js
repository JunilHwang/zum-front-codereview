// @ts-check
import { baseUrl } from "../types";

/**
 * rankings CSS selectors
 * @readonly
 * @enum {string}
 */
const selectors = {
  rankings: ".rt_top_contents_list > .rt_top_box",
  item: ".rt_top_contents_list > .rt_top_box li > a.item",
  rank: "span.rank_number",
  idx: "data-id",
  title: "strong.title",
  mediaName: "span.author > span.name",
  url: "href",
};

/**
 * getRanking
 * 랭킹 크롤링
 * @param {import("playwright").Page} page Playwright page 객체
 * @returns {Promise<import("../types").Rankings[]>}
 */
const getRanking = async (page) => {
  try {
    await page.goto(baseUrl);
    await page.waitForSelector(selectors.rankings);

    /**
     * @type {import("../types").Rankings[]}
     */
    const rankings = await page.$$eval(
      selectors.item,
      (items, { baseUrl, selectors }) =>
        items.map((item) => {
          const idx = Number(item.getAttribute(selectors.idx));

          const rank = Number(
            item.querySelector(selectors.rank).textContent.trim()
          );

          const title = item.querySelector(selectors.title).textContent.trim();

          const mediaName = item
            .querySelector(selectors.mediaName)
            .textContent.trim();

          const url = baseUrl + item.getAttribute(selectors.url);

          const info = { idx, rank, title, mediaName, url };
          return info;
        }),
      { baseUrl, selectors }
    );
    return rankings;
  } catch (e) {
    console.error(e);
    return;
  }
};

export default getRanking;

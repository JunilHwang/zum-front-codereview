// @ts-check
import { baseUrl } from "../types";

/**
 * card info CSS selectors
 * @readonly
 * @enum {string}
 */
const selectors = {
  card: "ul#item_list > .thumb_item",
  item: "ul#item_list > .thumb_item > .item",
  title: "strong.title",
  summary: "span.text",
  mediaName: "span.author > span.name",
  image: "span.thumb > img",
  url: "a",
  dataId: "data-id",
  src: "src",
  href: "href",
};

/**
 * getCardInfo
 * 카테고리별 크롤링
 * @param {import("playwright").Page} page Playwright page 객체
 * @param {string} category 카테고리 서브페이지
 * @returns {Promise<import("../types").CardInfos>}
 */
const getCardInfo = async (page, category) => {
  const categoryUrl = baseUrl + "/" + category;
  try {
    await page.goto(categoryUrl);
    await page.waitForSelector(selectors.title);

    /**
     * @type {import("../types").CardInfo[]}
     */
    const cardInfos = await page.$$eval(
      selectors.item,
      (items, { baseUrl, selectors }) =>
        items.map((item) => {
          const idx = Number(item.getAttribute(selectors.dataId));

          const title = item.querySelector(selectors.title).textContent.trim();

          const summaryContent = item
            .querySelector(selectors.summary)
            .textContent.trim();

          const mediaName = item
            .querySelector(selectors.mediaName)
            .textContent.trim();

          const imageUrl = item
            .querySelector(selectors.image)
            .getAttribute(selectors.src);

          const url =
            baseUrl +
            item.querySelector(selectors.url).getAttribute(selectors.href);

          const info = {
            idx,
            title,
            summaryContent,
            mediaName,
            imageUrl,
            url,
          };
          return info;
        }),
      { baseUrl, selectors }
    );
    return { category, data: cardInfos };
  } catch (e) {
    console.error(e);
    return;
  }
};

export default getCardInfo;

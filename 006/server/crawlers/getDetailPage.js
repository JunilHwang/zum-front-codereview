// @ts-check

/**
 * detail page CSS selectors
 * @readonly
 * @enum {string}
 */
const selectors = {
  article: ".article_body",
  content: ".article.d_article",
  updated: ".article_info > span.date",
  originUrl: ".article_info > a[href]",
  tags: ".article_tag > ul > li > a",
  href: "href",
};

/**
 * getDetailPage
 * 상세 페이지 내용 크롤링
 * @param {import("playwright").Page} page Playwright page 객체
 * @param {string} url 상세페이지 주소
 * @param {number} idx 상세페이지 id
 * @returns {Promise<import("../types").DetailInfo> | null}
 */
const getDetailPage = async (page, url, idx) => {
  try {
    await page.goto(url);
    await page.waitForSelector(selectors.content);

    /**
     * @type {import("../types").DetailInfo}
     */
    const detailInfo = await page.$eval(
      selectors.article,
      (item, { idx, selectors }) => {
        const content = item.querySelector(selectors.content).innerHTML;

        const updated = item
          .querySelector(selectors.updated)
          .textContent.trim();

        const originUrl = item
          .querySelector(selectors.originUrl)
          .getAttribute(selectors.href)
          .trim();

        const tags = [];
        item.querySelectorAll(selectors.tags).forEach((tag) => {
          const cur = tag.textContent.trim();
          tags.push(cur);
        });

        const info = { idx, content, updated, originUrl, tags };

        return info;
      },
      { idx, selectors }
    );

    return detailInfo;
  } catch (e) {
    console.error(e);
    return;
  }
};

export default getDetailPage;

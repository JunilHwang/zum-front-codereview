import type { Response } from "express";
import cheerio from "cheerio";
import axios from "axios";

import { CrawledTextData } from "@src/utils";
import { errMessages } from ".";

const createExceptionJSON = (res: Response, httpStatus: number, message: string) => {
  res.status(httpStatus);
  return res.json({ statusCode: res.statusCode, message, data: null });
};

const crawledSelectors = {
  allWrapper: ".contents, .d_contents",
  // 상단
  topWrapper: ".article_header > .article_title > .article_title_wrap",
  category: ".top > .category > a#btn_category", // 카테고리명
  subject: ".main_title", // 제목
  media: ".writer a#btn_media", // 매체사
  // 상세
  articleWrapper: ".article_wrap > .article_body",
  articleHtml: ".article, .d_article", // 컨텐츠 본문
  articleInfoDate: ".article_info > .date", // 컨텐츠 추가정보 - 날짜
};
const { unableCrawMsg } = errMessages;
const getCrawledData = (url: string): Promise<CrawledTextData | null> =>
  new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get(url);
      if (!html.data || typeof html.data !== "string") return resolve(null);

      const $ = cheerio.load(html.data);
      const $allContent = $(crawledSelectors.allWrapper);

      if (!$allContent.length) throw new Error(unableCrawMsg);
      const $topWrapper = $allContent.find(crawledSelectors.topWrapper);
      const category = $topWrapper.find(crawledSelectors.category).text();
      const subject = $topWrapper.find(crawledSelectors.subject).text();
      const media = $topWrapper.find(crawledSelectors.media).text();

      const $articleWrapper = $allContent.find(crawledSelectors.articleWrapper);
      const articleInfoDate = $articleWrapper.find(crawledSelectors.articleInfoDate).text();
      const articleHtml = $articleWrapper.find(crawledSelectors.articleHtml).html()?.toString();

      const result: CrawledTextData = { category, articleHtml, articleInfoDate, media, subject };
      const isEmptyResult = Object.values(result).every((v) => !v);
      if (isEmptyResult) throw new Error(unableCrawMsg);

      return resolve(result);
    } catch (error) {
      return reject(error);
    }
  });

export { createExceptionJSON, getCrawledData };

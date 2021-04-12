// @ts-check
import { resolve } from "path";

/**
 * @typedef {Object} CardInfo
 * @property {!number} idx
 * @property {!string} title
 * @property {string} summaryContent
 * @property {string} mediaName
 * @property {!string} imageUrl
 * @property {!string} url
 */

/**
 * @typedef {Object} CardInfos
 * @property {string} category
 * @property {CardInfo[]} data
 */

/**
 * @typedef {Object} DetailInfo
 * @property {!number} idx
 * @property {!string} content
 * @property {string} [updated]
 * @property {string} [originUrl]
 * @property {string[]} [tags]
 */

/**
 * @typedef {Object} Rankings
 * @property {!number} idx
 * @property {!number} rank
 * @property {!string} title
 * @property {!string} mediaName
 * @property {!string} url
 */

/**
 * @constant
 * @type {string}
 */
export const allowedOrigin = "http://localhost:5000";

/**
 * @readonly
 * @enum {string}
 */
export const methodsMap = {
  get: "GET",
};

/**
 * @constant
 * @type {string}
 */
export const baseUrl = "https://hub.zum.com";

/**
 * @constant
 * @type {number}
 */
export const crawlInterval = 10 * 60 * 1000;

/**
 * @readonly
 * @enum {string}
 */
export const categories = ["life", "food", "trip", "culture"];

/**
 * @readonly
 * @enum {string}
 */
const dirNamesMap = {
  upperDir: "..",
  assets: "assets",
  details: "details",
  jsonExtension: ".json",
  rankingJson: "rankings.json",
};

/**
 * @readonly
 * @enum {string|Function}
 */
export const assetsPath = {
  base: resolve(__dirname, dirNamesMap.upperDir, dirNamesMap.assets),
  rankingPath: resolve(
    __dirname,
    dirNamesMap.upperDir,
    dirNamesMap.assets,
    dirNamesMap.rankingJson
  ),
  /**
   *
   * @param {string} category
   * @returns {string} category path
   */
  getCategoryPath: (category) =>
    resolve(
      __dirname,
      dirNamesMap.upperDir,
      dirNamesMap.assets,
      category + dirNamesMap.jsonExtension
    ),
  /**
   *
   * @param {string|number} idx
   * @returns {string} detail path
   */
  getDetailPath: (idx) =>
    resolve(
      __dirname,
      dirNamesMap.upperDir,
      dirNamesMap.assets,
      dirNamesMap.details,
      idx + dirNamesMap.jsonExtension
    ),
};

/**
 * @readonly
 * @enum {string}
 */
export const crawlerTypes = {
  cardInfo: "cardInfo",
  detailPage: "detailPage",
  ranking: "ranking",
};

/**
 * @readonly
 * @enum {string}
 */
export const streamEventTypes = {
  data: "data",
  end: "end",
  error: "error",
  finish: "finish",
  write: "w",
  append: "a",
};

/**
 * @readonly
 * @enum {string}
 */
export const params = {
  api: "/api",
  root: "/",
  best: "/best",
  content: "/content",
  detail: "/detail",
  category: "/:category",
  url: "/:media/:idx",
};

/**
 * @readonly
 * @enum {number}
 */
export const statusCode = {
  notFound: 404,
};

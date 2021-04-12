/**
 * @readonly
 * @enum {string}
 */
export const eventTypes = {
  DOMloaded: "DOMContentLoaded",
  load: "load",
  unload: "unload",
  close: "close",
  click: "click",
  popstate: "popstate",
};

export const hubZumUrl = "https://hub.zum.com/";
const appRoot = "http://localhost:5000/api";
const apiRoot = "http://localhost:3000/api";
const jsonType = "application/json";

/**
 * @readonly
 * @enum {string}
 */
export const apiNameMap = {
  ranking: "ranking",
  categories: "category",
  detail: "details",
};

/**
 * @readonly
 * @enum {string}
 */
export const apiUrlMap = {
  ranking: apiRoot + "/best",
  category: apiRoot + "/content",
  detail: apiRoot + "/detail",
};

/**
 * @readonly
 * @enum {string}
 */
export const apiSubpathMap = {
  life: "/life",
  food: "/food",
  trip: "/trip",
  culture: "/culture",
};

/**
 * @readonly
 * @enum {string}
 */
export const methodsMap = {
  get: "GET",
};

/**
 * @readonly
 */
export const baseFetchOptions = {
  method: methodsMap.get,
  headers: {
    Accept: jsonType,
    "Content-Type": jsonType,
    "Access-Control-Allow-Origin": appRoot,
  },
};

/**
 * @readonly
 * @enum {string}
 */
export const templateNameMap = {
  root: "",
  category: "category",
  detail: "detail",
  favorite: "favorite",
};

export const subCategoryTemplateMap = {
  root: templateNameMap.root,
  life: templateNameMap.category,
  food: templateNameMap.category,
  trip: templateNameMap.category,
  culture: templateNameMap.category,
  // templateNameMap.detail,
  // templateNameMap.favorite,
};

/**
 * @readonly
 * @enum {string}
 */
export const pathNameMap = {
  root: "",
  category: {
    root: templateNameMap.category,
    life: templateNameMap.category + "/life",
    food: templateNameMap.category + "/food",
    trip: templateNameMap.category + "/trip",
    culture: templateNameMap.category + "/culture",
  },
  detail: templateNameMap.detail,
  favorite: templateNameMap.favorite,
};

/**
 * @readonly
 * @enum {string}
 */
export const selectorNameMap = {
  header: {
    name: "header",
    headerUl: "#header-menu-ul",
    menuLi: ".header-menu-li",
  },
  main: {
    name: "main",
    templateSection: "#main-template",
    sectionCategory: ".main-section-category",
    categoryTitle: ".main-section-title",
    cards: ".main-section-cards",
    ranking: ".main-section-ranking",
  },
  footer: {
    name: "footer",
  },
  ul: "ul",

  card: {
    name: ".card",
    img: ".card-img",
    title: ".card-title",
    summary: ".card-summary",
    media: ".card-media",
  },

  rankCard: {
    name: ".rank-card",
    rank: ".rank-card-rank",
    title: ".rank-card-title",
    media: ".rank-card-media",
  },

  image: {
    lazy: "img.lazy",
    loaded: "img.loaded",
  },

  detail: {
    template: "section#detail-template",
  },

  intersection: "#intersection-root",
};

export const lazyLoadingClassMap = {
  lazy: "lazy",
  loaded: "loaded",
};

/**
 * @readonly
 * @enum {string}
 */
export const attributeNameMap = {
  categoryHref: "data-href",
  imgsrc: "data-imgsrc",
  detailUrl: "data-url",
  detailIdx: "data-content-idx",
};

/**
 * @readonly
 * @enum {string}
 */
export const categoryTitleMap = {
  life: "라이프",
  food: "음식",
  trip: "여행",
  culture: "컬쳐",
  ranking: "랭킹",
};

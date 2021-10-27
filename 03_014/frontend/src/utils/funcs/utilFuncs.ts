const $ = (selector: string, target: Element | Document = document) => target.querySelector(selector);
const $All = (selector: string, target: Element | Document = document) => target.querySelectorAll(selector);

const REG_EX = {
  url: /(?<SCHEME>^(https?|file)):\/\/(?<HOST>[^:\/\s]+)(:(?<PORT>\d+))?((?<PATH>[\/]\w*))?(\?(?<QUERY>[\w=&]+))?/g,
  path: /[\/]\w*/g,
  queryKeyValue: /(?<KEY>[\w]+)=(?<VALUE>[\w]+)/g,
};

type QueryStringDetail = {
  KEY?: string;
  VALUE?: string;
};
const createQueryStrings = (queryString: string): QueryStringDetail[] | null => {
  try {
    const regEx = REG_EX.queryKeyValue;
    const arrMatchs = Array.from(queryString.matchAll(regEx)) ?? [];
    if (!arrMatchs || !arrMatchs.length) return null;
    return arrMatchs.map((v) => v.groups) as QueryStringDetail[];
  } catch (e) {
    return null;
  }
};

const delay = (ms = 1000) => new Promise((resolve, reject) => setTimeout(resolve, ms));

/* 현재 사용하지 않음 - URLDetail, createURLDetails */
type URLDetail = {
  SCHEME?: string;
  HOST?: string;
  PORT?: string;
  PATH?: string;
  QUERY?: string;
};
const createURLDetails = (url: string): URLDetail | null => {
  try {
    const regEx = REG_EX.url;
    const arrMatchs = Array.from(url.matchAll(regEx)) ?? [];
    return arrMatchs[0].groups ?? null;
  } catch (e) {
    return null;
  }
};
// ----

export { $, $All, REG_EX, createQueryStrings, delay };

import { HubContent } from '@/components/Card';

const defaultFetchTimeout = 5000;
const timeoutMsg = 'TIMEOUT!';
const bookmarkStorageKey = '__ZUM_HUB_BOOKMARK__';
const bookmarkStorageSize = 4;
const successStatusCode = 200;
const fetchErrorMessage = 'fetch error';

export const $ = (selector: string, base: Element | Document = document) => base.querySelector(selector);

export const $$ = (selector: string, base: Element | Document = document) => base.querySelectorAll(selector);

export const restClient = {
  timeout: defaultFetchTimeout,
  fetchErrorMessage: fetchErrorMessage,

  isSuccessResponse(res: Response) {
    return res.ok && res.status === successStatusCode;
  },

  getTimeoutPromise<T>() {
    const timeout = this.timeout;
    return new Promise<T>((resolve, reject) => {
      setTimeout(() => reject(timeoutMsg), timeout);
    });
  },

  fetch(url: string) {
    return Promise.race<Promise<Response>>([fetch(url), this.getTimeoutPromise()]).then((res) => {
      if (!this.isSuccessResponse(res)) {
        throw new Error(this.fetchErrorMessage);
      }
      return res;
    });
  },

  fetchAll(urls: string[]) {
    return Promise.race<Promise<Response[]>>([Promise.all(urls.map((url) => fetch(url))), this.getTimeoutPromise()]).then(
      (resArr) => {
        const hasError = resArr.some((res) => !this.isSuccessResponse(res));
        if (hasError) {
          throw new Error(this.fetchErrorMessage);
        }
        return resArr;
      },
    );
  },
};

export const bookmarkStorage = {
  load() {
    const jsonString = localStorage.getItem(bookmarkStorageKey) || '[]';
    return JSON.parse(jsonString) as HubContent[];
  },
  add(content: HubContent) {
    const bookmarks = bookmarkStorage.load();
    const exists = bookmarks.find(({ idx }) => idx === content.idx);

    if (exists) return false;

    bookmarks.push(content);
    const jsonString = JSON.stringify(bookmarks.slice(-bookmarkStorageSize));
    localStorage.setItem(bookmarkStorageKey, jsonString);

    return true;
  },
};

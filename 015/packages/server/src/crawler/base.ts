import puppeteer from 'puppeteer';
import { zumUrl } from '@/crawler/constants';
import { jsonHelper } from '@/utils';

interface crawlerProps {
  urlPath?: string;
  selector: string;
  evalCallback: (arr: Element[]) => any;
  JSONPath: string;
}

interface saveJSONProps {
  urlPath?: string;
  selector: string;
  evalCallback: (arr: Element[]) => any;
  JSONPath: string;
}

interface getHTMLProps {
  urlPath: string;
  selector: { title: string; media: string; body: string };
}

interface getHTMLReturn {
  title: string;
  media: string;
  body: string;
}

interface baseCrawlerType {
  browser: null | puppeteer.Browser;
  page: null | puppeteer.Page;
  launch: (urlPath: string) => Promise<void>;
  close: () => Promise<void>;
  saveJSON: (p: saveJSONProps) => Promise<void>;
  getHTML: (p: getHTMLProps) => Promise<getHTMLReturn | undefined>;
}

const baseCrawler: baseCrawlerType = {
  browser: null,
  page: null,
  async launch(urlPath: string) {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    await this.page.goto(`${zumUrl.base}${urlPath}`);
  },
  async close() {
    await this.browser?.close();
    this.browser = null;
    this.page = null;
  },
  async saveJSON({ urlPath = '', selector, evalCallback, JSONPath }: crawlerProps) {
    try {
      await this.launch(urlPath);

      if (!this.page) return;

      const newDataArray = await this.page.$$eval(selector, evalCallback);

      await this.close();

      const prevJSON = jsonHelper.read(JSONPath);
      const isPrevJSONArray = Array.isArray(prevJSON);
      const nextJSONArray = newDataArray.concat(isPrevJSONArray ? prevJSON : []);
      const nextJSON = JSON.stringify(nextJSONArray);

      jsonHelper.write(JSONPath, nextJSON);

      console.log(`[LOG] New JSON saved in ${JSONPath.split('/').slice(-1)[0]}`);
    } catch (err) {
      console.error(err);
    }
  },
  async getHTML({ urlPath, selector }: getHTMLProps) {
    try {
      await this.launch(urlPath);

      if (!this.page) return;

      const [title, media, body] = await Promise.all([
        this.page.$eval(selector.title, (el: Element) => el.outerHTML),
        this.page.$eval(selector.media, (el: Element) => el.outerHTML),
        this.page.$eval(selector.body, (el: Element) => el.outerHTML),
      ]);

      await this.close();

      return { title, media, body };
    } catch (err) {
      console.error(err);
    }
  },
};

export { baseCrawler, baseCrawlerType, getHTMLReturn };

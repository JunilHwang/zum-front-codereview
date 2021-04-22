import { baseCrawler, baseCrawlerType } from '@/crawler/base';
import { zumUrl, selectors } from '@/crawler/constants';
import { dbPaths } from '@/common/dbPaths';

const rankingCrawler = Object.create(baseCrawler, {
  evalCallback: {
    value: function (links: Element[]) {
      return links.map((link) => {
        const idx = Number(link.getAttribute('data-id'));
        const url = link.getAttribute('href');
        const [, title, author] = Array.from(link.children);

        return {
          idx,
          title: title.textContent,
          mediaName: author.lastElementChild?.textContent,
          url: 'https://hub.zum.com' + url,
        };
      });
    },
  },
  crawl: {
    value: function () {
      const selector = selectors.ranking;
      const evalCallback = this.evalCallback;
      const JSONPath = dbPaths.ranking;

      return (this as baseCrawlerType).saveJSON({ selector, evalCallback, JSONPath });
    },
  },
});

const detailCrawler = Object.create(baseCrawler, {
  crawl: {
    value: function (urlPath: string) {
      return (this as baseCrawlerType).getHTML({ urlPath, selector: selectors.detail });
    },
  },
});

const contentCrawler = Object.create(baseCrawler, {
  evalCallback: {
    value: function (divs: Element[]) {
      return divs.map((div) => {
        const idx = Number(div.getAttribute('data-id'));
        const mediaName = div.lastElementChild?.lastElementChild?.textContent;
        const link = div.firstElementChild!;
        const url = link.getAttribute('href');
        const [imgSpan, title, textSpan] = Array.from(link.children);

        return {
          idx,
          mediaName,
          url,
          title: title.textContent,
          imageUrl: imgSpan.firstElementChild?.getAttribute('src'),
          summaryContent: textSpan.textContent,
        };
      });
    },
  },
});

const lifeCrawler = Object.create(contentCrawler, {
  crawl: {
    value: function () {
      const urlPath = zumUrl.life;
      const selector = selectors.content;
      const evalCallback = this.evalCallback;
      const JSONPath = dbPaths.life;

      return (this as baseCrawlerType).saveJSON({ urlPath, selector, evalCallback, JSONPath });
    },
  },
});

const foodCrawler = Object.create(contentCrawler, {
  crawl: {
    value: function () {
      const urlPath = zumUrl.food;
      const selector = selectors.content;
      const evalCallback = this.evalCallback;
      const JSONPath = dbPaths.food;

      return (this as baseCrawlerType).saveJSON({ urlPath, selector, evalCallback, JSONPath });
    },
  },
});

const cultureCrawler = Object.create(contentCrawler, {
  crawl: {
    value: function () {
      const urlPath = zumUrl.culture;
      const selector = selectors.content;
      const evalCallback = this.evalCallback;
      const JSONPath = dbPaths.culture;

      return (this as baseCrawlerType).saveJSON({ urlPath, selector, evalCallback, JSONPath });
    },
  },
});

const tripCrawler = Object.create(contentCrawler, {
  crawl: {
    value: function () {
      const urlPath = zumUrl.trip;
      const selector = selectors.content;
      const evalCallback = this.evalCallback;
      const JSONPath = dbPaths.trip;

      return (this as baseCrawlerType).saveJSON({ urlPath, selector, evalCallback, JSONPath });
    },
  },
});

export { rankingCrawler, lifeCrawler, foodCrawler, cultureCrawler, tripCrawler, detailCrawler };

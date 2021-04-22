import { rankingCrawler, lifeCrawler, foodCrawler, cultureCrawler, tripCrawler } from '@/crawler/crawlers';
import cron from 'node-cron';

const handleCrawler = () => {
  return Promise.all([
    rankingCrawler.crawl(),
    lifeCrawler.crawl(),
    foodCrawler.crawl(),
    cultureCrawler.crawl(),
    tripCrawler.crawl(),
  ]);
};

// 10분마다 실행
cron.schedule('*/10 * * * *', async () => {
  console.log(`[LOG] Start Crawling at ${Date().toLocaleUpperCase()}`);
  await handleCrawler();
});

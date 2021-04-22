import { RequestHandler } from 'express';
import { detailCrawler } from '@/crawler/crawlers';
import { getHTMLReturn } from '@/crawler/base';
import { statusCode } from '@/common/statusCodes';
import { cache } from '@/utils';

const getDetail: RequestHandler = (req, res, next) => {
  const { mediaName, idx } = req.params;
  const cacheKey = `detail:${mediaName}:${idx}`;

  if (!mediaName || !idx) res.sendStatus(statusCode.badRequest);

  if (cache.has(cacheKey)) {
    return res.json({ data: cache.get(cacheKey) });
  }

  detailCrawler
    .crawl(`/${mediaName}/${idx}`)
    .then((html: getHTMLReturn | undefined) => {
      if (!html) return res.sendStatus(statusCode.badRequest);
      cache.save(cacheKey, html);
      res.json({ data: html });
    })
    .catch((e: Error) => {
      console.error(e);
      res.sendStatus(statusCode.serverError);
    });
};

const detailController = { getDetail };

export { detailController };

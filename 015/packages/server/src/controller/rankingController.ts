import { RequestHandler } from 'express';
import { jsonHelper, cache } from '@/utils';
import { dbPaths } from '@/common/dbPaths';

const rankingListLength = 12;

const getRanking: RequestHandler = (req, res, next) => {
  const { ranking: dbPath } = dbPaths;
  const cacheKey = dbPath;

  if (cache.has(cacheKey)) {
    return res.json({ data: cache.get(cacheKey) });
  }

  const rankingList = jsonHelper.read(dbPath).slice(0, rankingListLength);

  cache.save(cacheKey, rankingList);

  res.json({ data: rankingList });
};

const rankingController = { getRanking };

export { rankingController };

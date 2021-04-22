import { RequestHandler } from 'express';
import { cache, jsonHelper } from '@/utils';
import { dbPaths } from '@/common/dbPaths';
import { categoryList } from '@/controller/categoryList';
import { statusCode } from '@/common/statusCodes';

const defaultContentStart = 0;
const defaultContentLength = 12;

const getContent: RequestHandler = (req, res, next) => {
  const { category } = req.params;
  const { start, length } = req.query;
  const parsedStart = parseInt(String(start)) || defaultContentStart;
  const parsedLength = parseInt(String(length)) || defaultContentLength;
  const cacheKey = `content:${category}:${parsedStart}:${parsedLength}`;

  const isValidCategory = [...Object.values(categoryList)].includes(category);

  if (!isValidCategory) {
    return res.sendStatus(statusCode.notFound);
  }

  if (cache.has(cacheKey)) {
    return res.json({ data: cache.get(cacheKey) });
  }

  let content;

  switch (category) {
    case categoryList.life:
      content = jsonHelper.read(dbPaths.life);
      break;
    case categoryList.food:
      content = jsonHelper.read(dbPaths.food);
      break;
    case categoryList.trip:
      content = jsonHelper.read(dbPaths.trip);
      break;
    case categoryList.culture:
      content = jsonHelper.read(dbPaths.culture);
      break;
    default:
      return res.sendStatus(statusCode.notFound);
  }

  const result = content.slice(parsedStart, parsedStart + parsedLength);

  cache.save(cacheKey, result);
  res.json({ data: result });
};

const contentController = { getContent };

export { contentController };

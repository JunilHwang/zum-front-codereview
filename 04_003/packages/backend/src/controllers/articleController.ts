import express from 'express';

import articleService from '../services/articleService.js';

import Cache, { createCacheKey } from '../cache/index.js';

type DataObject = {
  [propsName: string]: any;
};

const articleController = (() => {
  const model = 'article';

  const cacheStorage = Cache.createStorage(model);

  return {
    postArticle: async (req: express.Request, res: express.Response) => {
      const payload = req.body;

      try {
        const data = articleService.postArticle(payload);
        cacheStorage.setCache(
          createCacheKey(model, (data as DataObject).id),
          data as DataObject,
        );
        return res.status(201).json({
          result: 'success',
          data,
        });
      } catch (err) {
        return res.status(500).json({
          result: 'fail',
        });
      }
    },
    getArticle: (req: express.Request, res: express.Response) => {
      const id = req.params.id;

      try {
        const cachedData = cacheStorage.getCache(createCacheKey(model, id));

        if (cachedData)
          return res.status(200).json({
            result: 'success',
            data: cachedData,
          });

        const data = articleService.getArticle({ id });
        if (data)
          cacheStorage.setCache(
            createCacheKey(model, (data as DataObject).id),
            data as DataObject,
          );

        return res.status(200).json({
          result: 'success',
          data,
        });
      } catch (err) {
        return res.status(500).json({
          result: 'fail',
        });
      }
    },
    getArticleAll: (req: express.Request, res: express.Response) => {
      try {
        const cachedData = cacheStorage.getCache(`${model}s`);

        if (cachedData)
          return res.status(200).json({
            result: 'success',
            data: cachedData,
          });

        const data = articleService.getArticle({});
        return res.status(200).json({
          result: 'success',
          data,
        });
      } catch (err) {
        return res.status(500).json({
          result: 'fail',
        });
      }
    },
    updateArticle: (req: express.Request, res: express.Response) => {
      const id = req.params.id;
      const payload = req.body;

      try {
        articleService.updateArticle(id, payload);
        cacheStorage.setCache(createCacheKey(model, id), { id, ...payload });
        return res.status(200).json({
          result: 'success',
        });
      } catch (err) {
        return res.status(500).json({
          result: 'fail',
        });
      }
    },
    deleteArticle: (req: express.Request, res: express.Response) => {
      const id = req.params.id;

      try {
        articleService.deleteArticle(id);
        cacheStorage.deleteCache(createCacheKey(model, id));
        return res.status(200).json({
          result: 'success',
        });
      } catch (err) {
        return res.status(500).json({
          result: 'fail',
        });
      }
    },
  };
})();

export default articleController;

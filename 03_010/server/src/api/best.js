const express = require('express');
const router = express.Router();

const createLocalCache = require('../utils/cache');
const localCache = createLocalCache();

router.get('/', function (req, res) {
  const cacheKey = 'best';
  const { cache } = localCache.get(cacheKey);

  if (cache) return res.json(cache);

  try {
    const data = require(`../data/rankings.json`);
    localCache.set(cacheKey, data);
    return res.json(data);
  } catch (e) {
    res.status(501).send({ ok: false, message: 'no resources in server' });
  }
});

module.exports = router;

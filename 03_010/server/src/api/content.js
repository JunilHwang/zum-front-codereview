const express = require('express');
const router = express.Router();

const createLocalCache = require('../utils/cache');
const localCache = createLocalCache();

router.get('/:category', function (req, res) {
  const category = req.params.category;
  const { cache } = localCache.get(category);

  if (cache) return res.json(cache);

  try {
    const data = require(`../data/${category}.json`);
    localCache.set(category, data);
    return res.json(data);
  } catch (e) {
    res.status(501).send({ ok: false, message: 'no resources in server' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

const ranking = require('../data/ranking.json');

router.get('/', (req, res) => {
  res.send({ data: ranking });
});

module.exports = router;

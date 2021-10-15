var express = require('express');
var router = express.Router();
var ranking = require('../api/Ranking.json')
var culture = require('../api/Culture.json')
var food = require('../api/Food.json')
var life = require('../api/LifeContents.json')
var travel = require('../api/Travel.json')
const getSub = require("../api/getUrl")


/* GET home page. */
router.get('/best', function(req, res, next) {
  res.status(200).json(
    {
      "RankingContent": ranking
    }
  );
});

//카테고리별 데이터
router.get(`/content/culture`, function(req, res, next) {
  res.status(200).json(
    {
      "RankingContent": culture
    }
  );
});

router.get(`/content/food`, function(req, res, next) {
  res.status(200).json(
    {
      "RankingContent": food
    }
  );
});

router.get(`/content/life`, function(req, res, next) {
  res.status(200).json(
    {
      "RankingContent": life
    }
  );
});

router.get(`/content/travel`, function(req, res, next) {
  res.status(200).json(
    {
      "RankingContent": travel
    }
  );
});

module.exports = router;

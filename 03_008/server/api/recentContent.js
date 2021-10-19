const { default: axios } = require('axios');
const express = require('express');
const contentScrap = require('../scrap/content');

const router = express.Router();

router.get('/', async (req, res) => {
  const recentContents = {
    lifeData: [],
    tripData: [],
    foodData: [],
    cultureData: [],
  };

  recentContents.lifeData = await contentScrap('life');
  recentContents.tripData = await contentScrap('trip');
  recentContents.foodData = await contentScrap('food');
  recentContents.cultureData = await contentScrap('culture');

  recentContents.lifeData.length = 4;
  recentContents.tripData.length = 4;
  recentContents.foodData.length = 4;
  recentContents.cultureData.length = 4;

  res.status(200).json(recentContents);
});

module.exports = router;

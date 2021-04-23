const express = require('express');
const router = express.Router();

const culture = require('../data/culture.json');
const food = require('../data/food.json');
const life = require('../data/life.json');
const trip = require('../data/trip.json');

router.get('/culture', (req, res) => {
  res.send({ data: culture });
});

router.get('/food', (req, res) => {
  res.send({ data: food });
});

router.get('/life', (req, res) => {
  res.send({ data: life });
});

router.get('/trip', (req, res) => {
  res.send({ data: trip });
});

router.get('/all', (req, res) => {
  res.send({ data: { culture, food, life, trip } });
});

module.exports = router;

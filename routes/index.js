const { request } = require("express");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index.html");
});
router.get("/life", function (req, res, next) {
  res.render("index.html");
});
router.get("/food", function (req, res, next) {
  res.render("index.html");
});
router.get("/culture", function (req, res, next) {
  res.render("index.html");
});
router.get("/trip", function (req, res, next) {
  res.render("index.html");
});
router.get("/favorite", function (req, res, next) {
  res.render("index.html");
});
module.exports = router;

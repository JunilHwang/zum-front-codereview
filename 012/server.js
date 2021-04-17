const express = require("express");
const path = require("path");
const cors = require("cors");
const crawling = require("./crawling.js");
const bestData = require("./data/best.js");
const lifeData = require("./data/life.js");
const foodData = require("./data/food.js");
const tripData = require("./data/trip.js");
const cultureData = require("./data/culture.js");

const app = express();
app.use("/src", express.static(path.resolve(__dirname, "frontend", "src")));

app.use(cors());

//api
app.get("/api/best", async (req, res) => {
  res.send(bestData);
});

app.get("/api/content/:category", async (req, res) => {
  let { category } = req.params;
  switch (category) {
    case "life":
      res.send(lifeData);
      break;
    case "food":
      res.send(foodData);
      break;
    case "trip":
      res.send(tripData);
      break;
    case "culture":
      res.send(cultureData);
      break;
  }

});

app.get("/api/detail/:url", async (req, res) => {
  let { url } = req.params;
  res.send(crawling("https://hub.zum.com/chosun/75511"));
});

//route
app.get("/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 5500, () => console.log("Server running.."));

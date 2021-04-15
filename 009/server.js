const path = require('path');
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8888

app.use(express.json())
app.use(cors())

app.get('/api/best', function (_, res) {
  const getJsonList = ['life.json', 'food.json', 'travel.json', 'culture.json']
  const data = fs.readdirSync(__dirname + `/json`)
    .filter(name => getJsonList.includes(name) && path.extname(name) === '.json')
    .flatMap(name => {
      const readJson = require(path.join(__dirname + `/json`, name))
      const sliceJson = [...readJson].splice(0, 3)

      return sliceJson
    });

  res.json({ success: false, data })
})

app.get('/api/content/:category', function (req, res) {
  const { query, params } = req
  const { category } = params
  const { limit } = query

  fs.readFile(__dirname + `/json/${category}.json`, 'utf8', function (err, data) {
    if (err) {
      res.status(500)
      res.json({ success: false, data: [] })
    }
    const parseJson = JSON.parse(data)
    const response = limit ? parseJson.splice(0, limit) : parseJson
    res.json({ success: true, data: limit ? response : parseJson })
  });
})

app.listen(PORT, function () {
  console.log(`server is running ::> http://localhost:${PORT}`)
})
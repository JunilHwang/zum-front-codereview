require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const controllers = require("./controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/board", controllers.createBoard);
app.get("/board", controllers.findBoard);
app.delete("/board", controllers.deleteBoard);
app.put("/board", controllers.updateBoard);

const HTTPS_PORT = process.env.HTTPS_PORT || 80;

let server;

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () =>
    console.log(`https server running on port ${HTTPS_PORT}`)
  );
} else {
  server = app.listen(HTTPS_PORT, () =>
    console.log(`http server running on port ${HTTPS_PORT}`)
  );
}

module.exports = server;

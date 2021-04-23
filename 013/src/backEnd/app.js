import express from "express";
import routes from "./routes";
import path from "path";
import cors from "cors";

import apiRouter from "./routers/apiRouter"

const app = express();
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "view"));
app.engine('html', require('ejs').renderFile);

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cors());


app.get(routes.home, (req, res) => res.render("index.html"));
app.use(routes.api, apiRouter);

export default app;
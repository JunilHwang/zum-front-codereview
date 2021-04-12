// @ts-check
import express from "express";
import cors from "cors";

import api from "./api";
import { allowedOrigin, methodsMap, params } from "./types";
import { initCrawler } from "./crawlers";

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.static("../prod/"));

const corsOptions = { origin: allowedOrigin, methods: methodsMap.get };
server.use(cors(corsOptions));
server.use(params.api, api);

server.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}/`);
});

initCrawler();

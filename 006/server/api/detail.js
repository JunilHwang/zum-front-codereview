// @ts-check
import { Router } from "express";
import { constants } from "fs";
import { access } from "fs/promises";

import { params, statusCode, crawlerTypes, assetsPath } from "../types";
import crawler from "../crawlers";

const router = Router();

/**
 * GET /api/detail/:url
 * - ex. /api/detail/valuechampion/75465
 */
router.get(params.url, (req, res) => {
  const { idx, media } = req.params;
  if (+idx < 0 || media.length === 0) res.sendStatus(statusCode.notFound);

  const path = assetsPath.getDetailPath(idx);

  access(path, constants.F_OK)
    // 해당 경로에 json 없는 경우에만 크롤링 후 생성
    .catch(() => {
      const url = `https://hub.zum.com/${media}/${idx}`;
      crawler(crawlerTypes.detailPage, url, +idx);
    })
    .then(() => {
      import(path).then((data) => {
        const result = data.default[idx];
        res.json(result);
      });
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(statusCode.notFound);
    });
});

export default router;

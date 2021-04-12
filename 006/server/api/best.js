// @ts-check
import { Router } from "express";
import { constants } from "fs";
import { access } from "fs/promises";

import { params, statusCode, assetsPath } from "../types";

const router = Router();

/**
 * GET /api/best
 */
router.get(params.root, (req, res) => {
  const path = assetsPath.rankingPath;

  access(path, constants.R_OK)
    .then(() => {
      import(path).then((data) => {
        const result = data.default;
        res.json(result);
      });
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(statusCode.notFound);
    });
});

export default router;

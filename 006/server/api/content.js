// @ts-check
import { Router } from "express";
import { constants } from "fs";
import { access } from "fs/promises";

import { params, categories, statusCode, assetsPath } from "../types";

const router = Router();

/**
 * GET /api/content/:category
 * - ex. /api/content/culture
 */
router.get(params.category, (req, res) => {
  const { category } = req.params;
  if (!categories.includes(category)) res.sendStatus(statusCode.notFound);

  const path = assetsPath.getCategoryPath(category);
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

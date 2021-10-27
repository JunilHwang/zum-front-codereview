import { Router } from "express";
import type { Request, Response } from "express";
import NodeCache from "node-cache";

import { contentData } from "../data";
import { httpStatus, errMessages, ZumHubContentKeys } from "../utils";
import { createExceptionJSON } from "../utils/funcs";

const router = Router();
const cache = new NodeCache();

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = httpStatus;
const { createNullMsg, okMsg, internalMsg, invalidInputMsg } = errMessages;

// 카테고리별 데이터 가져오기 ( /api/content/:category )
router.get("/:category", (req: Request, res: Response) => {
  try {
    const category = req.params.category as ZumHubContentKeys;
    if (cache.has(category))
      return res.status(OK).json({ statusCode: res.statusCode, message: okMsg, data: cache.get(category) });

    if (!category) return createExceptionJSON(res, BAD_REQUEST, invalidInputMsg);

    const data = contentData[category];
    if (!data) return createExceptionJSON(res, BAD_REQUEST, createNullMsg(category));

    cache.set(category, data);
    return res.status(OK).json({ statusCode: res.statusCode, message: okMsg, data });
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR);
    return res.json({ statusCode: res.statusCode, message: internalMsg, data: null });
  }
});

// 카테고리별 데이터 개별로 가져오기 ( /api/content/:category/:idx )
/* ❗️ 이거 역할이 중복되는 듯. (/api/detail/:url과 통합) */
/* 
router.get("/:category/:idx", (req, res) => {
  try {
    const category = req.params.category as ZumHubContentKeys;
    const idx = req.params.idx;
    const FIND_DATA_KEY = `${category}-${idx}`;

    if (cache.has(FIND_DATA_KEY))
      return res.status(OK).json({ statusCode: res.statusCode, message: okMsg, data: cache.get(FIND_DATA_KEY) });

    if (!category) return createExceptionJSON(res, BAD_REQUEST, invalidInputMsg);
    if (!idx) return createExceptionJSON(res, BAD_REQUEST, badIndexMsg);

    const data = contentData[category];
    if (!data) return createExceptionJSON(res, NOT_FOUND, createNullMsg(category));

    const findData = data.find(({ idx: valueIdx }) => +idx === valueIdx);
    if (!findData) return createExceptionJSON(res, NOT_FOUND, notFoundForIdxMsg);

    cache.set(FIND_DATA_KEY, findData);
    return res.status(OK).json({ statusCode: res.statusCode, message: okMsg, data: findData });
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR);
    return res.json({ statusCode: res.statusCode, message: internalMsg, data: null });
  }
});
*/

export default router;

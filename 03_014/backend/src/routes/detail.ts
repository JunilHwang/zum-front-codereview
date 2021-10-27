import { Router } from "express";
import type { Request, Response } from "express";
import NodeCache from "node-cache";

import { httpStatus, errMessages } from "../utils";
import { createExceptionJSON, getCrawledData } from "../utils/funcs";

const router = Router();
const cache = new NodeCache();

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = httpStatus;
const { createNullMsg, okMsg, internalMsg, invalidInputMsg } = errMessages;

// 상세 페이지 데이터 "크롤링"해서 가져오기 ( /api/detail/:url → /api/detail/* )
// "/*" 는 뒤에 오는 파라미터를 전부 받음
router.get("/*", async (req: Request, res: Response) => {
  const DETAIL = "detail";
  try {
    if (!req.params || !req.params[0]) return createExceptionJSON(res, BAD_REQUEST, invalidInputMsg);
    const url = req.params[0];
    const FIND_DATA_KEY = `${DETAIL}-${url}`;

    if (cache.has(FIND_DATA_KEY))
    return res.status(OK).json({ statusCode: res.statusCode, message: okMsg, data: cache.get(FIND_DATA_KEY) });

    const crawledData = await getCrawledData(url);
    if (!crawledData) return createExceptionJSON(res, NOT_FOUND, createNullMsg(DETAIL));

    cache.set(FIND_DATA_KEY, crawledData);
    return res.status(OK).json({ statusCode: res.statusCode, message: okMsg, data: crawledData });
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR);
    return res.json({ statusCode: res.statusCode, message: internalMsg, data: null });
  }
});

export default router;

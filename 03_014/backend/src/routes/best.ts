import { Router } from "express";
import type { Request, Response } from "express";
import NodeCache from "node-cache";

import { httpStatus, errMessages } from "../utils";
import { bestData } from "../data";
import { createExceptionJSON } from "../utils/funcs";

const router = Router();
const cache = new NodeCache();

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = httpStatus;
const { createNullMsg, okMsg, internalMsg } = errMessages;

// 랭킹 데이터 전부 가져오기 ( /api/best/ )
router.get("/", (req: Request, res: Response) => {
  const RANKING = 'ranking';
  try {
    if (cache.has(RANKING))
      return res.status(OK).json({ statusCode: res.statusCode, message: okMsg, data: cache.get(RANKING) })
    if (!bestData.length) return createExceptionJSON(res, BAD_REQUEST, createNullMsg(RANKING));

    cache.set(RANKING, bestData);
    return res.status(OK).json({ statusCode: res.statusCode, message: okMsg, data: bestData });
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR);
    return res.json({ statusCode: res.statusCode, message: internalMsg, data: null });
  }
});

export default router;

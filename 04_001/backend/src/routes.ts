import path from "path";
import { Router, Request, Response } from "express";
import { createMessage, getPostsData, setPostData } from "./utils";
import { httpStatus } from "./utils";
import { PostData, ResponseDataType } from "@common/types";
import { ServerError } from "./core";

// ----
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = httpStatus;
const jsonFileName = path.resolve("src/data", "posts.json");
const cacheMap: Map<string, ResponseDataType<PostData | PostData[]>> = new Map();
// ----

const router = Router();

// '/api/post/:id': 글 가져오기 (id 있을 때는 해당하는 데이터만 가져옴)
router.get("/post/:id?", async (req: Request, res: Response) => {
  try {
    const routeName = "api: posts";
    const id = req.params.id;
    const isId = Boolean(id);
    const POST_KEY = isId ? `posts_${id}` : `posts`;

    // 캐싱되어있는지 확인
    if (cacheMap.has(POST_KEY)) {
      const cache = cacheMap.get(POST_KEY);
      return res.status(OK).json(cache);
    }

    // JSON 파일 가져오기
    const { isError, result: postData } = getPostsData({ jsonFileName, id: isId ? +id : undefined });
    if (isError || !postData)
      throw new ServerError(createMessage({ type: "NOT_FOUND_POST_DATA", name: routeName }), BAD_REQUEST);

    // 캐싱 업데이트 & 반환
    const message = createMessage({ type: "SUCCESS" });
    const result: ResponseDataType<PostData | PostData[]> = { statusCode: OK, message, data: postData };
    cacheMap.set(POST_KEY, result);
    return res.status(OK).json(result);
  } catch (e) {
    console.error(e);
    const message = (e as Error).message;
    const result = { statusCode: res.statusCode, message, data: null };
    return res.status(res.statusCode).json(result);
  }
});

// '/api/write': 글 작성
router.post("/write", async (req: Request, res: Response) => {
  try {
    const routeName = "api: write";
    if (!req.body) throw new ServerError(createMessage({ type: "NO_DATA_SENT", name: routeName }), BAD_REQUEST);

    const { result: postData } = getPostsData({ jsonFileName });
    let id = -1;
    if (Array.isArray(postData)) {
      if (!postData.length) id = 1;
      else id = Math.max(...postData.map((v) => v.id ?? -1)) + 1;
    }
    if (id === -1) throw new ServerError(createMessage({ type: "UNABLE_WRITE", name: routeName }), BAD_REQUEST);

    const { subject, author, contents } = req.body;
    const newData: PostData = { id, subject, author, createdDate: new Date(), contents };

    setPostData({ jsonFileName, newData });
    cacheMap.clear();

    const result: ResponseDataType<number> = {
      data: id,
      message: createMessage({ type: "SUCCESS", name: routeName }),
      statusCode: OK,
    };
    return res.status(OK).json(result);
  } catch (e) {
    console.error(e);
    const message = (e as Error).message;
    const result = { statusCode: res.statusCode, message, data: null };
    return res.status(res.statusCode).json(result);
  }
});

// '/api/edit': 글 수정
router.put("/edit", async (req: Request, res: Response) => {
  try {
    const name = "api: edit";
    if (!req.body) throw new ServerError(createMessage({ type: "NO_DATA_SENT", name }), BAD_REQUEST);

    const { result: allData } = getPostsData({ jsonFileName });
    if (!allData || !Array.isArray(allData))
      throw new ServerError(createMessage({ type: "UNABLE_EDIT", name }), INTERNAL_SERVER_ERROR);

    const body: PostData = req.body;
    const findIdx = allData.findIndex((v) => body.id && v.id === +body.id);
    if (findIdx === -1) throw new ServerError(createMessage({ type: "UNABLE_EDIT", name }), INTERNAL_SERVER_ERROR);
    allData[findIdx] = body;

    setPostData({ jsonFileName, newData: allData });
    cacheMap.clear();

    const result: ResponseDataType<number> = {
      data: findIdx,
      message: createMessage({ type: "SUCCESS", name }),
      statusCode: OK,
    };
    return res.status(OK).json(result);
  } catch (e) {
    console.error(e);
    const message = (e as Error).message;
    const result = { statusCode: res.statusCode, message, data: null };
    return res.status(res.statusCode).json(result);
  }
});

// '/api/delete': 글 삭제
router.delete("/delete", async (req: Request, res: Response) => {
  try {
    const name = "api: delete";
    if (!req.body) throw new ServerError(createMessage({ type: "NO_DATA_SENT", name }), BAD_REQUEST);

    const { result: allData } = getPostsData({ jsonFileName });
    if (!allData || !Array.isArray(allData))
      throw new ServerError(createMessage({ type: "UNABLE_DELETE", name }), INTERNAL_SERVER_ERROR);

    const id: number = +req.body.id;
    if (Number.isNaN(id)) throw new ServerError(createMessage({ type: "UNABLE_DELETE", name }), INTERNAL_SERVER_ERROR);

    const newData = allData.filter((v) => v.id !== id);

    setPostData({ jsonFileName, newData });
    cacheMap.clear();

    const result = { data: null, message: createMessage({ type: "SUCCESS", name }), statusCode: OK };
    return res.status(OK).json(result);
  } catch (e) {
    console.error(e);
    const message = (e as Error).message;
    const result = { statusCode: res.statusCode, message, data: null };
    return res.status(res.statusCode).json(result);
  }
});

export default router;

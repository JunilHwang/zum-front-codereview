import fs from "fs";
import { ServerError } from "../core";
import { httpStatus } from "../utils";
import { PostData } from "@common/types";

// ----
const { INTERNAL_SERVER_ERROR } = httpStatus;
// ----

// [+] 일반 =============================================================================
type MessageName =
  | "SUCCESS"
  | "NOT_FOUND_POST_DATA"
  | "NOT_FOUND_JSON_DATA"
  | "CAN_NOT_UPDATE_JSON_DATA"
  | "NO_DATA_SENT"
  | "UNABLE_WRITE"
  | "UNABLE_EDIT"
  | "UNABLE_DELETE";
type MessageType = {
  [name in MessageName]: string;
};
const messages: MessageType = {
  SUCCESS: `정상적으로 처리되었습니다.`,
  NOT_FOUND_POST_DATA: `게시물 데이터를 찾을 수 없습니다`,
  NOT_FOUND_JSON_DATA: `JSON 데이터를 찾을 수 없습니다.`,
  CAN_NOT_UPDATE_JSON_DATA: `JSON 데이터를 업데이트 할 수 없습니다.`,
  NO_DATA_SENT: `전송된 데이터가 없습니다`,
  UNABLE_WRITE: `게시물을 작성할 수 없습니다`,
  UNABLE_EDIT: `게시물을 수정할 수 없습니다`,
  UNABLE_DELETE: `게시물을 삭제할 수 없습니다`,
};

interface CreateMessageProps {
  type: MessageName;
  name?: string;
}
/** ✨ createMessage: 각종 메시지 생성  */
export const createMessage = ({ type, name }: CreateMessageProps) => {
  const strName = name ? `[${name}]` : "";
  return `${strName} ${messages[type]}`;
};

// [+] JSON =============================================================================
interface SetPostDataProps {
  jsonFileName: string;
  newData: PostData | PostData[];
}

interface SetPostDataRetrunType {
  isError: boolean;
  result?: PostData[];
}

/** ✨ setPostData: 게시물 데이터 (JSON 파일) 작성 혹은 수정 (newData가 배열이면 수정함)  */
export function setPostData({ jsonFileName, newData }: SetPostDataProps): SetPostDataRetrunType {
  try {
    let postsData: PostData[] = [];
    if (Array.isArray(newData)) postsData = newData;
    else {
      if (fs.existsSync(jsonFileName)) {
        const buff = fs.readFileSync(jsonFileName);
        postsData = JSON.parse(buff.toString());
        postsData.push(newData);
      } else {
        const errMsg = createMessage({ type: "CAN_NOT_UPDATE_JSON_DATA", name: setPostData.name });
        throw new ServerError(errMsg, INTERNAL_SERVER_ERROR);
      }
    }

    const strPostsData = JSON.stringify(postsData);
    fs.writeFileSync(jsonFileName, strPostsData);

    return { isError: false, result: postsData };
  } catch (e) {
    console.error(e);
    return { isError: true };
  }
}

// ----

interface GetPostsDataProps {
  jsonFileName: string;
  id?: number;
}

interface GetPostsDataRetrunType {
  isError: boolean;
  result?: PostData | PostData[];
}

/** ✨ getPostsData: 게시물 데이터 (JSON 파일)에서 id 값을 기준으로 데이터를 가져오거나 전부 가져옴 */
export function getPostsData({ jsonFileName, id }: GetPostsDataProps): GetPostsDataRetrunType {
  try {
    if (!fs.existsSync(jsonFileName)) {
      const errMsg = createMessage({ type: "NOT_FOUND_JSON_DATA", name: getPostsData.name });
      throw new ServerError(errMsg, INTERNAL_SERVER_ERROR);
    }
    const buff = fs.readFileSync(jsonFileName);
    const postsData: PostData[] = JSON.parse(buff.toString());

    let result: PostData | PostData[] | undefined;
    if (typeof id === "number") result = postsData.find((v) => v.id === id);
    else result = postsData;

    return { isError: false, result };
  } catch (e) {
    console.error(e);
    return { isError: true };
  }
}

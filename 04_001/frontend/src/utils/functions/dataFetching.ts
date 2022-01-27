import { PostData, ResponseDataType } from "@common/types";

type RequestPathTypes = "getPost" | "write" | "edit" | "delete";
interface ExecFetchProps {
  type: RequestPathTypes;
  options?: Pick<RequestInit, "body" | "method" | "headers"> & { id?: number };
}

const createEndPoint = () => {
  const isDevMode = process.env.NODE_ENV === "development";
  const PORT = isDevMode ? 3000 : 4000;
  return `http://localhost:${PORT}/api`;
};

const createURL = (type: RequestPathTypes, id?: number) => {
  const END_POINT = createEndPoint();
  const currType = type === "getPost" ? "post" : type;
  if (typeof id !== "undefined" && type === "getPost") return `${END_POINT}/${currType}/${id}`;
  return `${END_POINT}/${currType}`;
};

/** ✨ execFetch: fetch API 활용하여 서버에서 데이터를 가져옴  */
export async function execFetch<T = any>({ type, options }: ExecFetchProps = { type: "getPost" }): Promise<T | null> {
  try {
    const url = createURL(type, options?.id);
    const res = await fetch(url, options);

    const isOK = 200 <= res.status && res.status < 400;
    if (!isOK) throw new Error(`[!] API : status - ${res.status}`);

    const resData: T = await res.json();
    return resData;
  } catch (e) {
    console.error((e as Error).message);
    return null;
  }
}

// ---------

/** ✨ getAllPostData: 서버에서 모든 게시물 데이터를 가져와서 정렬 및 추가 작업 후 반환 */
export async function getAllPostData(): Promise<PostData[] | undefined> {
  try {
    const resData = await execFetch<ResponseDataType<PostData[]>>();
    if (!resData || !resData.data) return;

    const { data: arrPosts } = resData;
    arrPosts.forEach((post, i) => {
      const { createdDate } = post;
      if (!createdDate) return;
      if (typeof createdDate === "string") arrPosts[i].createdDate = new Date(createdDate);
    });
    arrPosts.sort((a, b) => {
      if (!a.id || !b.id) return 0;
      return b.id - a.id;
    });
    return arrPosts;
  } catch (e) {
    console.error(e);
  }
}

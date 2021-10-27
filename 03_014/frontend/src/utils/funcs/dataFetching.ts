import { AllowedAPIPath, OptionPaths, FetchDataType, ZunContentKeys, AllResponseData } from "../types";

const END_POINT = "http://localhost:4000/api";

const httpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

function getUrl(apiPath: AllowedAPIPath, optionPath?: OptionPaths) {
  switch (apiPath) {
    case "content": {
      if (!optionPath) return null;
      const { category, idx } = optionPath;
      if (!category && !idx) return null;

      if (category) {
        if (idx) return `${END_POINT}/${apiPath}/${category}/${idx}`;
        return `${END_POINT}/${apiPath}/${category}`;
      }
      return null;
    }
    case "detail": {
      if (!optionPath) return null;
      const { url } = optionPath;
      if (!url) return null;
      return `${END_POINT}/${apiPath}/${url}`;
    }
    default:
      return `${END_POINT}/${apiPath}`;
  }
}

async function getData<T>(url: string | null): Promise<FetchDataType<T> | null | undefined> {
  const { OK, INTERNAL_SERVER_ERROR } = httpStatus;
  try {
    if (!url) throw new Error("[!] API : wrong address");
    const res = await fetch(url);

    const isErrorStatus = !(res.status >= OK && res.status < INTERNAL_SERVER_ERROR); // 200 ~ 399
    if (isErrorStatus) throw new Error(`[!] API : status - ${res.status}`);

    const resData = await res.json();
    return resData;
  } catch (e) {
    console.error((e as Error).message);
    return null;
  }
}

function createAllData(allResponseData: AllResponseData) {
  const keys = Object.keys(allResponseData) as ZunContentKeys[];
  const flatData = keys.flatMap((key) => allResponseData[key].data);

  return flatData.reduce((result, item) => {
    const idx = item.idx;

    if (result.has(idx) && JSON.stringify(result.get(idx)) !== JSON.stringify(item)) {
      const first = result.get(idx);
      const second = item;
      if (first.hasOwnProperty("summaryContent") || first.hasOwnProperty("imageUrl")) result.set(idx, first);
      else if (second.hasOwnProperty("summaryContent") || second.hasOwnProperty("imageUrl")) result.set(idx, second);
    } else result.set(idx, item);

    return result;
  }, new Map());
}
export { getUrl, getData, createAllData };

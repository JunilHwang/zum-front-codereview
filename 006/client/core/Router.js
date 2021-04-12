// @ts-check
import { templateNameMap, eventTypes, selectorNameMap } from "../types";
import { selectOne } from "../utils";

/**
 * getCurrentPathObj
 * - 현재 pathname을 "/"로 분리해서 객체로 리턴
 * @returns {{template: string, subpath?: string, restPath?: string[] }}
 */
export const getCurrentPathObj = () => {
  const currentPath = location.pathname;
  const pathObj = { template: templateNameMap.root };
  if (currentPath === templateNameMap.root) return pathObj;
  const [template, subpath, ...restPath] = currentPath.split("/").slice(1);
  pathObj.template = template;
  pathObj.subpath = subpath;
  pathObj.restPath = restPath;
  return pathObj;
};

/**
 * onLinkClick
 * @param {string} title 이동할 페이지 title
 * @param {string} path 이동할 pathname
 * @param {Object} options
 */
export const onLinkClick = (title = "", path = "", options = {}) => {
  history.pushState(options, title, location.origin + "/" + path);
};

/**
 *
 * @param {templateNameMap} template
 * @param {*} options
 */
export const setTemplate = (template, options = {}) => {
  const mainTag = selectOne(selectorNameMap.main.name);
  switch (template) {
    case templateNameMap.category:
      import("../components/templates/Subcategory").then((SubCategory) => {
        new SubCategory.default(mainTag, options);
      });
      break;
    case templateNameMap.detail:
      import("../components/templates/Detail").then((Detail) => {
        new Detail.default(mainTag, options);
      });
      break;
    case templateNameMap.favorite:
      import("../components/templates/Favorites").then((Favorites) => {
        new Favorites.default(mainTag, options);
      });
      break;

    // root 또는 잘못된 url인 경우 메인으로 fallback
    default:
      import("../components/templates/Main").then((Main) => {
        new Main.default(mainTag, options);
      });
      break;
  }
};

/**
 * onHistoryChange
 * - 뒤로가기 또는 앞으로가기
 * - window의 popstate 이벤트 적용
 * - history에서 이전 또는 이후 path 가져옴
 * - Home page에서 페이지 생성시 함수호출
 */
export const onHistoryChange = () => {
  window.addEventListener(eventTypes.popstate, () => {
    const { template, ...options } = getCurrentPathObj();
    setTemplate(template, options);
  });
};

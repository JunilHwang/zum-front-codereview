// @ts-check
import { eventTypes } from "./types";
import App from "./App";
import "./global.scss";

const setApp = () => {
  const appId = "app";
  const appDiv = document.getElementById(appId);
  new App(appDiv);
};

const setFavoritesInLocalStorage = () => {
  /**
   * @todo 즐겨찾기 로컬스토리지에 저장
   * - 전역 상태관리로 즐겨찾기 데이터 들고 있다가
   * - close 이벤트 발생시 localstorage에 저장
   */
};

document.addEventListener(eventTypes.DOMloaded, setApp);
document.addEventListener(eventTypes.unload, setFavoritesInLocalStorage);

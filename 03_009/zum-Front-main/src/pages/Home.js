import "babel-polyfill";
import { store, setLoading, getRankingData } from "../module/action.js";
import "../styles/component.scss";
import PageContent from "../core/PageContent";


//비동기처리 구현에는 실패했지만, 원 설계는 home 메뉴 진입시 ranking데이터를 불러오는 액션을 발생시킵니다. 
async function dispatchGetRankingData() {
  await store.dispatch(setLoading("loading"));
  await store.dispatch(getRankingData());
}


export function setHome() {
  new PageContent(document.querySelector("#contentDiv"));
}

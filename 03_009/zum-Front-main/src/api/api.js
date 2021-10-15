// 초기 설계대로 완성하지는 못했지만, 상태값 관리에서 사용할수 있도록 api 불러오는 동작들을 집합

import { getRankingData } from "../module/action";

async function getRankingata() {
  fetch("http://localhost:3000/best")
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(setRankingData(res));
    });
}

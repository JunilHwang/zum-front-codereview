import { Publisher } from "@src/core";
import { createAllData, delay, getData, getUrl } from "../funcs";
import {
  HubContent,
  RankingContentResponseData,
  HubContentsResponseData,
  RankingContent,
  AllResponseData,
  DetailContent,
  AllContent,
} from "../types";

type AppStoreState = {
  favorites: number[];
  rankingContentData: RankingContentResponseData | null;
  hubContentsData: HubContentsResponseData | null;
  detailData: DetailContent | null;
  allDataMap: Map<any, any> | null;
  isError: boolean;
  isLoading: boolean;
};

const initState: AppStoreState = {
  favorites: [],
  rankingContentData: null,
  hubContentsData: null,
  detailData: null,
  allDataMap: null,
  isError: false,
  isLoading: true,
};
const appStore = new Publisher(initState);

function createHubContentsData(): Promise<HubContentsResponseData> {
  return new Promise(async (resolve, reject) => {
    try {
      const life = await getData<HubContent>(getUrl("content", { category: "life" }));
      const food = await getData<HubContent>(getUrl("content", { category: "food" }));
      const travel = await getData<HubContent>(getUrl("content", { category: "travel" }));
      const culture = await getData<HubContent>(getUrl("content", { category: "culture" }));
      const allResData: HubContentsResponseData = { life, food, travel, culture };
      return resolve(allResData);
    } catch (error) {
      return reject(error);
    }
  });
}

async function setDataToAppStore(): Promise<void> {
  try {
    appStore.setState({ isError: false, isLoading: true });

    // RankingContent Data 요청 (메인 페이지)
    const ranking = await getData<RankingContent>(getUrl("best"));
    const rankingContentData: RankingContentResponseData = { ranking };
    // HubContents Data 요청 (서브 페이지)
    const hubContentsData: HubContentsResponseData = await createHubContentsData();

    // 모든 데이터 (Map) - 상세 데이터 불러올 때 쓰임
    const allResponseData = { ...rankingContentData, ...hubContentsData } as AllResponseData;
    const allDataMap = createAllData(allResponseData);

    const DELAY_MS = 500;
    await delay(DELAY_MS);

    appStore.setState({ rankingContentData, hubContentsData, allDataMap, isError: false, isLoading: false });
    console.log("✨ [appStore - setDataToAppStore] 데이터 불러오기 성공");
  } catch (error) {
    appStore.setState({ isError: true, isLoading: false });
    console.error("❗️ [appStore - setDataToAppStore] 데이터들을 가져올 수 없습니다.");
    console.error(error);
  }
}

async function setDetailDataToAppStore(detailIdx: number): Promise<void> {
  try {
    // 받아온 idx의 값 기준으로 state.allDataMap에서 데이터 가져옴
    const allDataMap = appStore.state.allDataMap;
    if (!allDataMap) return;
    const detailInfo = allDataMap.get(detailIdx) as AllContent;
    const url = detailInfo.url;

    appStore.setState({ isError: false, isLoading: true });

    const resDetailData = await getData(getUrl("detail", { url }));

    appStore.setState({ detailData: resDetailData?.data, isError: false, isLoading: false });
  } catch (error) {
    appStore.setState({ isError: true, isLoading: false });
    console.error(error);
  }
}

export type { AppStoreState };
export { setDataToAppStore, setDetailDataToAppStore, appStore };

export interface RankingContent {
  idx: number; // 고유번호
  mediaName: string; // 매체사
  title: string; // 제목
  url: string; // 상세페이지 URL
}

export interface HubContent extends RankingContent {
  summaryContent: string; // 컨텐츠 미리보기
  imageUrl: string; // 썸네일 URL
}

export interface RecentContents {
  lifeData: HubContent[];
  tripData: HubContent[];
  foodData: HubContent[];
  cultureData: HubContent[];
}

export interface GlobalState {
  loading: boolean;
  error: Error | null | unknown;
  currentPath: string;
  rankingDatas: RankingContent[];
  recentContents: RecentContents;
}

export interface Action {
  type: string | null;
  payload?: { [option: string]: any };
  [option: string]: any;
}

export interface Store {
  subscribe(listener: Function): Function;
  dispatch(action: Action): void;
  getState(): GlobalState;
}

export interface Reducer {
  (state?: GlobalState, action?: Action): GlobalState;
}

export type State = {
  [key: string]: any
};

export type Mutation = {
  [key: string]: Function
}

export type StoreInitializer = {
  states: State,
  mutations: Mutation,
}

export type EventObserverList = {
  [key: string]: Array<Function>
}

export interface RankingContent {
  idx: Number;        // 고유번호
  mediaName: String;  // 매체사
  title: String;      // 제목
  url: String;        // 상세페이지 URL
}

export interface HubContent {
  idx: Number;             // 고유번호
  mediaName: String;       // 매체사
  title: String;           // 제목
  summaryContent: String;  // 컨텐츠 미리보기
  url: String;             // 상세페이지 URL
  imageUrl: String;        // 썸네일 URL
}
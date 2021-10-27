// [1] 전역
interface ServerError extends Error {
  status?: number;
}
// ----

// [2] data 관련
interface RankingContent {
  idx: Number; // 고유번호
  mediaName: String; // 매체사
  title: String; // 제목
  url: String; // 상세페이지 URL
  imageUrl?: String; // 썸네일 URL
}

interface HubContent {
  idx: Number; // 고유번호
  mediaName: String; // 매체사
  title: String; // 제목
  summaryContent: String; // 컨텐츠 미리보기
  url: String; // 상세페이지 URL
  imageUrl: String; // 썸네일 URL
}
type AllHubContent = {
  [contentName in ZumHubContentKeys]: HubContent[];
};

type ZumHubContentKeys = "life" | "food" | "travel" | "culture";
type ZumDataKeys = "ranking" | ZumHubContentKeys | undefined;
// ----

// [3] 크롤링
type CrawledDataKeys = "category" | "subject" | "media" | "articleHtml" | "articleInfoDate";
type CrawledTextData = {
  [key in CrawledDataKeys]?: string;
};

export type {
  ServerError,
  RankingContent,
  HubContent,
  AllHubContent,
  ZumHubContentKeys,
  ZumDataKeys,
  CrawledDataKeys,
  CrawledTextData,
};

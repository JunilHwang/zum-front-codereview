import { ZumHubContentKeys, ZunContentKeys } from "@src/utils/types";

type RankingContent = {
  idx: number; // 고유번호
  mediaName: string; // 매체사
  title: string; // 제목
  url: string; // 상세페이지 URL
  imageUrl?: string; // 썸네일 URL
};

type HubContent = {
  idx: number; // 고유번호
  mediaName: string; // 매체사
  title: string; // 제목
  summaryContent: string; // 컨텐츠 미리보기
  url: string; // 상세페이지 URL
  imageUrl: string; // 썸네일 URL
};

type AllContent = Partial<Pick<HubContent, "imageUrl">> & Omit<HubContent, "imageUrl">;

// ❗️ 서버의 "CrawledTextData" type과 유사
type DetailDKeys = "category" | "subject" | "media" | "articleHtml" | "articleInfoDate";
type DetailContent = { [key in DetailDKeys]?: string };

type AllowedAPIPath = "best" | "content" | "detail";

type OptionPaths = {
  category?: ZumHubContentKeys;
  idx?: string;
  url?: string;
};

type FetchDataType<T> = { statusCode: number; message: string; data: T | T[] };

// store
type RankingContentResponseData = { ranking?: FetchDataType<RankingContent> | null };
type HubContentsResponseData = { [key in ZumHubContentKeys]?: FetchDataType<HubContent> | null };

// --

type AllResponseData = { [key in ZunContentKeys]: FetchDataType<RankingContent | HubContent> };

export type { RankingContent, HubContent, AllContent, DetailContent, AllowedAPIPath, OptionPaths, FetchDataType };
export type { RankingContentResponseData, HubContentsResponseData, AllResponseData };

import { Publisher } from ".";
import { PostData } from "@common/types";
import { getParseLocalItem, pipe, setConvertLocalItem } from "@src/utils/functions";

// [1] mainPublisher 정의
export interface MainFilterOptions {
  author: string;
  searchWord: string;
  isDesc?: boolean;
  numPost: number;
  pageNum: number;
}

export interface MainPublisherState {
  postData: PostData[]; // 👈 (주의) 무조건 서버에서 수정 / 삭제 / 조회할 때만 갱신하기!!
  editId: number;
  isInit: boolean;
  isRefresh: boolean;

  filterOptions: MainFilterOptions; // 👈 (참고) 요놈만 변경되어도 됨!
  numPostList: number[];
}

type InitMainPublisherState = Readonly<Omit<MainPublisherState, "postData">> & Pick<MainPublisherState, "postData">;
export const initMainState: InitMainPublisherState = {
  postData: [],
  editId: -1,
  isInit: false,
  isRefresh: false,

  filterOptions: {
    author: "",
    searchWord: "",
    isDesc: undefined,
    numPost: 5,
    pageNum: 1,
  },
  numPostList: [5, 10, 20, 30, 50, 100],
};

export const LOCAL_MAIN_KEY = "zum_board_main";

function getLocalMainPublisherState(): MainPublisherState | null {
  const state = getParseLocalItem<MainPublisherState>(LOCAL_MAIN_KEY);
  if (!state) return null;
  const arrPostData = state.postData;
  arrPostData.forEach((data, i) => {
    const { createdDate } = data;
    if (!createdDate) return;
    if (typeof createdDate === "string") state.postData[i].createdDate = new Date(createdDate);
  });
  return state;
}

const setStateCallback = () => setConvertLocalItem(LOCAL_MAIN_KEY, mainPublisher.state);
export const mainPublisher: Publisher<MainPublisherState> = new Publisher(
  getLocalMainPublisherState() ?? { ...initMainState },
  setStateCallback
);

// ---------------------

// [2] 게시물 필터링 함수 모음
// - 게시글 목록 생성, (페이지 번호, 정렬, 작성자, 검색 등)이 변경되었을 때 사용될 함수들

interface CreatePostDataProps {
  filterOptions: MainFilterOptions;
  postData: PostData[];
  isFullData?: boolean;
}

/** ✨ createPostData: 모든 필터 조건들을 활용하여 게시글 목록 생성 */
export function createPostData({ filterOptions, postData, isFullData }: CreatePostDataProps): PostData[] {
  const { author, isDesc, numPost, pageNum, searchWord } = filterOptions;
  const result = pipe<PostData[]>(
    createAuthorFilterItems(author),
    createSearchFilterItems(searchWord),
    createDateSortItems(isDesc),
    createNumPostItems(numPost, pageNum, isFullData)
  )(postData);
  return result;
}

/** 선택된 작성자 기준으로 필터링하여 게시글 목록 생성 -- (1) */
function createAuthorFilterItems(author: string): (arrPostData: PostData[]) => void {
  return (arrPostData: PostData[]) => {
    if (!author) return arrPostData;
    const filterData = arrPostData.filter((v) => v.author === author);
    return filterData;
  };
}
/** 검색창에 입력된 검색어 기준으로 필터링하여 게시글 목록 생성 -- (2) */
function createSearchFilterItems(searchWord: string): (arrPostData: PostData[]) => void {
  return (arrPostData: PostData[]) => {
    if (!searchWord) return arrPostData;
    const replacedSearchword = searchWord.replace(/\s+/g, "");
    const filterData = arrPostData.filter(({ subject }) => {
      if (subject === null) return;
      return subject.replace(/\s+/g, "").indexOf(replacedSearchword) > -1;
    });
    return filterData;
  };
}
/** 작성일 클릭 시, 내림차 & 오름차순으로 정렬한 게시글 목록 생성 -- (3) */
function createDateSortItems(isDesc?: boolean): (arrPostData: PostData[]) => void {
  return (arrPostData: PostData[]) => {
    if (typeof isDesc === "undefined") return arrPostData;
    const sortData = [...arrPostData].sort((a, b) => {
      if (a.createdDate === null || b.createdDate === null) return 0;
      // 내림차
      if (isDesc) return b.createdDate.valueOf() - a.createdDate.valueOf();
      else return a.createdDate.valueOf() - b.createdDate.valueOf(); // 오름차
    });
    return sortData;
  };
}

/** 보여질 게시글 수만큼 게시글 목록 생성 -- (4) */
function createNumPostItems(numPost: number, pageNum: number, isFullData?: boolean): (arrPostData: PostData[]) => void {
  return (arrPostData: PostData[]) => {
    if (isFullData) return arrPostData;
    const max = Math.ceil(arrPostData.length / numPost);
    if (pageNum > max) pageNum = max;
    const startIdx = (pageNum - 1) * numPost;
    const endIdx = pageNum * numPost;
    return arrPostData.slice(startIdx, endIdx);
  };
}

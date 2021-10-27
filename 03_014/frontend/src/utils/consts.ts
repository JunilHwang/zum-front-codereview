import { NavInfoType, ZumHubContentKeyNames } from "@src/utils/types";

const contentKeyNames: ZumHubContentKeyNames = {
  life: "라이프",
  food: "푸드",
  travel: "여행",
  culture: "컬쳐",
};

const navInfo: NavInfoType[] = [
  { path: "/", name: "HOME" },
  { path: "/life", name: "라이프" },
  { path: "/food", name: "푸드" },
  { path: "/travel", name: "여행" },
  { path: "/culture", name: "컬쳐" },
  { path: "/favorites", name: "즐겨찾기" },
];

export { contentKeyNames, navInfo };

import { PostData } from "@common/types";

export type PostDataKorKeys = {
  [name in keyof PostData]: string;
};
export const postDataKorKeys: PostDataKorKeys = {
  id: "번호",
  subject: "제목",
  author: "작성자",
  createdDate: "작성일",
  contents: "내용",
};

export type RequiredPostDataKey = keyof Omit<PostData, "id" | "createdDate">;
export const requiredPostDataKeys: RequiredPostDataKey[] = ["author", "contents", "subject"];

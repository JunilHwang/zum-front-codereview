import { BaseModel } from "./base";

export type Post = BaseModel & {
  title: string;
  author: string;
  content: string;
};

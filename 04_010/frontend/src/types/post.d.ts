export interface Post extends PostSearch, PostWrite {}
export interface PostSearch {
  id: number;
  date: string;
  title: string;
  writer: string;
}
export interface PostWrite {
  content: string;
  title: string;
  writer: string;
}
export interface PostGet {
  id?: number;
  date?: string;
  title?: string;
  writer?: string;
}
export interface PostModify {
  id: number;
  title: string;
  writer: string;
  content: string;
}

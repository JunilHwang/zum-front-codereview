export interface IPost {
  title: string;
  user: string;
  date: string;
  id: number;
}

export interface IPostDetail extends IPost {
  content: string;
}

export interface IPostDetailData {
  post: IPostDetail;
}

export interface IPostListData {
  postList: IPost[];
  pageCount: number;
}

export interface ICreatePostData {
  postId: string;
}

// export type TSearchType = '제목' | '내용' | '닉네임';
export type TSearchType = 'title' | 'content' | 'user';

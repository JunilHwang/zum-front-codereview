import connect from '@/config/db-config';
import { DB_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';
import { TSearchType } from '@/types';

export interface IPost {
  title: string;
  user: string;
  date: Date;
  id: number;
}

export interface IPostDetail extends IPost {
  content: string;
}

interface IPostList {
  postList: IPost[];
  pageCount: number;
}

type TPostList = Record<string, IPostList>;
type TPost = Record<string, IPostDetail>;

let cashPost: TPost = {};
let cashPostList: TPostList = {};

// 간단한 JSON db
// 변수로 캐시적용

class PostRepository {
  private getPostListKey(pageId: number, postNumber: number, isDescending: number) {
    const key = `pageId:${pageId} postNumber:${postNumber} isDescending:${isDescending}`;
    return key;
  }

  private allPostList(): IPostDetail[] {
    try {
      connect().push('/post', [], false);
      return connect().getObject<IPostDetail[]>('/post');
    } catch (err) {
      console.log(err);
      throw new CustomError({ ...DB_ERROR, developerMessage: 'all read post error' });
    }
  }

  public createPost(title: string, content: string, user: string): number {
    try {
      const allPostList = this.allPostList();
      const nextId = allPostList.length ? allPostList[allPostList.length - 1].id + 1 : 1;
      const date = new Date();
      connect().push('/post', [{ id: nextId, title, content, user, date }], false);
      this.initCash();
      return nextId;
    } catch (err) {
      throw new CustomError({ ...DB_ERROR, developerMessage: 'create post error' });
    }
  }

  public readPost(id: number): IPostDetail | undefined {
    try {
      const cash = cashPost[id];
      if (cash) return cash;

      const allPostList = this.allPostList();
      const post = allPostList.find((_post) => _post.id === id);
      return post;
    } catch (err) {
      throw new CustomError({ ...DB_ERROR, developerMessage: 'read post error' });
    }
  }

  private filterPostList(postList: IPost[]): IPost[] {
    const filterPostList = postList.map(({ id, title, user, date }) => ({
      id,
      title,
      user,
      date,
    }));
    return filterPostList;
  }

  public readPostList(pageId: number, postNumber: number, isDescending: number): IPostList {
    const key = this.getPostListKey(pageId, postNumber, isDescending);
    const cash = cashPostList[key];
    if (cash) return cash;

    const allPostList = this.allPostList();
    if (isDescending) allPostList.reverse();
    const pageCount = Math.ceil(allPostList.length / postNumber);
    const slicePostList = allPostList.slice(postNumber * (pageId - 1), postNumber * pageId);
    const postList = this.filterPostList(slicePostList);
    return { postList, pageCount };
  }

  public readSearchPostList(
    pageId: number,
    postNumber: number,
    isDescending: number,
    searchType: TSearchType,
    searchContent: string,
  ): IPostList {
    const allPostList = this.allPostList();
    if (isDescending) allPostList.reverse();
    const postListByData = allPostList.filter((post) => post[searchType] === searchContent);
    const pageCount = Math.ceil(postListByData.length / postNumber);
    const slicePostList = postListByData.slice(postNumber * (pageId - 1), postNumber * pageId);
    const postList = this.filterPostList(slicePostList);
    return { postList, pageCount };
  }

  public readSearchPostListByReg(
    pageId: number,
    postNumber: number,
    isDescending: number,
    searchType: TSearchType,
    searchContent: string,
  ): IPostList {
    const allPostList = this.allPostList();
    if (isDescending) allPostList.reverse();
    const regex = RegExp(searchContent, 'gi');
    const postListByData = allPostList.filter((post) => post[searchType].match(regex));
    const pageCount = Math.ceil(postListByData.length / postNumber);
    const slicePostList = postListByData.slice(postNumber * (pageId - 1), postNumber * pageId);
    const postList = this.filterPostList(slicePostList);
    return { postList, pageCount };
  }

  public updatePost(id: number, title: string, content: string): void {
    try {
      const allPostList = this.allPostList();
      const updatePost = allPostList.map((post) => {
        const { id: updateId } = post;
        if (updateId === id) return { ...post, title, content };
        return post;
      });
      connect().push('/post', updatePost);
      this.initCash();
    } catch (err) {
      throw new CustomError({ ...DB_ERROR, developerMessage: 'update post error' });
    }
  }

  public deletePost(id: number): void {
    try {
      const allPostList = this.allPostList();
      const deletePost = allPostList.filter((post) => post.id !== id);
      connect().push('/post', deletePost);
      this.initCash();
    } catch (err) {
      throw new CustomError({ ...DB_ERROR, developerMessage: 'delete post error' });
    }
  }

  private initCash() {
    cashPost = {};
    cashPostList = {};
  }
}

export default PostRepository;

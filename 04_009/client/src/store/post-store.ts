import LocalStore from '@/core/local-store';
import { IPostDetail, IPostListData } from '@/types/IPost';
import {
  getPostList,
  getSearchPostList,
  getPost,
  createPost,
  updatePost,
  deletePost,
  TSearchType,
} from '@/utils/api/post';

type TPostList = Record<string, IPostListData>;
type TPost = Record<string, IPostDetail>;
interface IState {
  post: TPost;
  postList: TPostList;
  searchPostList: TPostList;
  postNumber: number;
  isDescending: number;
}

const POST_LIST_KEY = 'postList';
const POST_KEY = 'post';
const POST_NUMBER = 'postNumber';
const IS_DESCENDING = 'isDescending';

const initialState = { post: {}, postList: {}, searchPostList: {}, postNumber: 30, isDescending: 1 };

// TODO: 테스트, 리덕스로 마이그레이션
class PostStore extends LocalStore {
  state: IState;

  constructor() {
    super();
    this.state = initialState;
    this.init();
  }

  private init() {
    const post = this.getLocalStorage(POST_KEY, initialState.post) as IState;
    const postList = this.getLocalStorage(POST_LIST_KEY, initialState.postList) as IState;
    const searchPostList = {} as IState;
    const postNumber = this.getLocalStorage(POST_NUMBER, initialState.postNumber) as IState;
    const isDescending = this.getLocalStorage(IS_DESCENDING, initialState.isDescending) as IState;
    this.setState({ postList, searchPostList, post, postNumber, isDescending });
  }

  public setOptionInit() {
    this.setLocalStorage(POST_NUMBER, initialState.postNumber);
    this.setLocalStorage(IS_DESCENDING, initialState.isDescending);
  }

  public setPostNumber(postNumber: number) {
    this.setLocalStorage(POST_NUMBER, postNumber);
  }

  public setDescending(isDescending: number) {
    this.setLocalStorage(IS_DESCENDING, isDescending);
  }

  private getPostListKey(pageId: number) {
    const { postNumber, isDescending } = this.state;
    const key = `pageId:${pageId} postNumber:${postNumber} isDescending:${isDescending}`;
    return key;
  }

  private getSearchPostListKey(searchType: TSearchType, searchContent: string, pageId: number) {
    const { postNumber, isDescending } = this.state;
    const key = `searchType:${searchType} searchContent:${searchContent} pageId:${pageId} postNumber${postNumber} isDescending:${isDescending}`;
    return key;
  }

  public getCashPost(postId: number) {
    return this.state.post[postId] || null;
  }

  public getCashPostList(pageId: number) {
    const key = this.getPostListKey(pageId);
    return this.state.postList[key] || [];
  }

  public getCashSearchPostList(searchType: TSearchType, searchContent: string, pageId: number) {
    const key = this.getSearchPostListKey(searchType, searchContent, pageId);
    return this.state.searchPostList[key] || [];
  }

  public async getPostList(pageId: number, force?: boolean) {
    const { postNumber, isDescending } = this.state;
    const key = this.getPostListKey(pageId);
    if (!force) {
      const cashPostList = this.getLocalStorage(POST_LIST_KEY, {}) as TPostList;
      if (cashPostList[key]) return;
    }

    const { postList, pageCount } = await getPostList(pageId, postNumber, isDescending);
    this.setLocalStorage<TPostList>(POST_LIST_KEY, { ...this.state.postList, [key]: { postList, pageCount } });
  }

  public async getSearchPostList(searchType: TSearchType, searchContent: string, pageId: number, force?: boolean) {
    const { postNumber, isDescending } = this.state;
    const key = this.getSearchPostListKey(searchType, searchContent, pageId);
    if (!force) {
      const cashPostList = this.state.searchPostList;
      if (cashPostList[key]) return;
    }

    const { postList, pageCount } = await getSearchPostList(
      searchType,
      searchContent,
      pageId,
      postNumber,
      isDescending,
    );
    this.setState({ searchPostList: { ...this.state.searchPostList, [key]: { postList, pageCount } } });
    return postList;
  }

  public async getPost(postId: number) {
    const key = postId;
    const post = this.getLocalStorage(POST_KEY, {}) as TPost;
    if (!post[key]) {
      const { post } = await getPost(postId);
      this.setLocalStorage<TPost>(POST_KEY, { ...this.state.post, [key]: post });
    }
  }

  public async createPost(title: string, content: string, user: string) {
    const { postId } = await createPost(title, content, user);
    this.initCash();
    return postId;
  }

  public async updatePost(postId: number, title: string, content: string) {
    await updatePost(postId, title, content);
    this.initCash();
  }

  public async deletePost(postId: number) {
    await deletePost(postId);
    this.initCash();
  }

  private initCash() {
    this.setLocalStorage(POST_KEY, initialState.post);
    this.setLocalStorage(POST_LIST_KEY, initialState.postList);
  }
}

export default new PostStore();

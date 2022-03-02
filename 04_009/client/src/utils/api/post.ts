import { ICreatePostData, IPostDetailData, IPostListData } from '@/types/IPost';
import request from './request';

export type TSearchType = 'user' | 'title' | 'content';

export const getPostList = (pageId: number, postNumber: number, isDescending: number) =>
  request<IPostListData>('GET', `/api/post?pageId=${pageId}&postNumber=${postNumber}&isDescending=${isDescending}`);

export const getSearchPostList = (
  searchType: TSearchType,
  searchContent: string,
  pageId: number,
  postNumber: number,
  isDescending: number,
) =>
  request<IPostListData>(
    'GET',
    `/api/post/search/?searchType=${searchType}&searchContent=${searchContent}&pageId=${pageId}&postNumber=${postNumber}&isDescending=${isDescending}`,
  );

export const getPost = (postId: number) => request<IPostDetailData>('GET', `/api/post/${postId}`);

export const createPost = (title: string, content: string, user: string) =>
  request<ICreatePostData>('POST', '/api/post', { title, content, user });

export const updatePost = (postId: number, title: string, content: string) =>
  request('PUT', `/api/post/${postId}`, { title, content });

export const deletePost = (postId: number) => request('DELETE', `/api/post/${postId}`);

import { POST_ERROR } from '@/constants/error';
import CustomError from '@/error/custom-error';
import PostRepository from '@/repositories/post-repository';
import { TSearchType } from '@/types';

const searchesByNotReg = ['user'];
const postRepository = new PostRepository();

class PostService {
  public createPost(title: string, content: string, user: string) {
    const postId = postRepository.createPost(title, content, user);
    return postId;
  }

  public readPost(id: number) {
    const post = postRepository.readPost(id);
    if (!post) {
      throw new CustomError(POST_ERROR.notFoundPost);
    }
    return post;
  }

  public readPostList(pageId: number, postNumber: number, isDescending: number) {
    const { postList, pageCount } = postRepository.readPostList(pageId, postNumber, isDescending);
    return { postList, pageCount };
  }

  public readSearchPostList(
    pageId: number,
    postNumber: number,
    isDescending: number,
    searchType: TSearchType,
    searchContent: string,
  ) {
    const { postList, pageCount } = searchesByNotReg.includes(searchType)
      ? postRepository.readSearchPostList(pageId, postNumber, isDescending, searchType, searchContent)
      : postRepository.readSearchPostListByReg(pageId, postNumber, isDescending, searchType, searchContent);
    return { postList, pageCount };
  }

  public updatePost(id: number, title: string, content: string) {
    const post = postRepository.readPost(id);
    if (!post) {
      throw new CustomError(POST_ERROR.notFoundPost);
    }
    postRepository.updatePost(id, title, content);
  }

  public deletePost(id: number) {
    const post = postRepository.readPost(id);
    if (!post) {
      throw new CustomError(POST_ERROR.notFoundPost);
    }
    postRepository.deletePost(id);
  }
}

export default PostService;

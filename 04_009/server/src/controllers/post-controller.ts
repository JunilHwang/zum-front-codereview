import { NextFunction, Request, Response } from 'express';
import PostService from '@/services/post-service';
import { TSearchType } from '@/types';

interface ICreatePost {
  title: string;
  content: string;
  user: string;
}

interface IPostList {
  pageId: number;
  postNumber: string;
  isDescending: string;
}

interface ISearchPostList extends IPostList {
  searchType: TSearchType;
  searchContent: string;
}

interface IUpdatePost {
  title: string;
  content: string;
}

const service = new PostService();

class PostController {
  public createPost(req: Request, res: Response, next: NextFunction) {
    const { title, content, user } = req.body as ICreatePost;
    try {
      const postId = service.createPost(title, content, user);
      res.status(200).json({ postId });
    } catch (err) {
      next(err);
    }
  }

  public readPost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const post = service.readPost(+id);
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  }

  public readPostList(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageId, postNumber, isDescending } = req.query as unknown as IPostList;
      const { postList, pageCount } = service.readPostList(pageId, +postNumber, +isDescending);
      res.status(200).json({ postList, pageCount });
    } catch (err) {
      next(err);
    }
  }

  public readSearchPostList(req: Request, res: Response, next: NextFunction) {
    try {
      const { searchType, searchContent, pageId, postNumber, isDescending } = req.query as unknown as ISearchPostList;
      const { postList, pageCount } = service.readSearchPostList(
        pageId,
        +postNumber,
        +isDescending,
        searchType,
        searchContent,
      );
      res.status(200).json({ postList, pageCount });
    } catch (err) {
      next(err);
    }
  }

  public updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, content } = req.body as IUpdatePost;
      service.updatePost(+id, title, content);
      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  }

  public deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      service.deletePost(+id);
      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  }
}

export default PostController;

import { Request, Response } from "express";
import { Post } from "../model/post";
import PostService, { Service } from "../services/postService";

interface PostController {
  createPost(req: Request, res: Response): void;
  getAllPosts(req: Request, res: Response): void;
  getPostById(req: Request, res: Response): void;
  updatePost(req: Request, res: Response): void;
  deletePost(req: Request, res: Response): void;
}

class PostControllerImpl implements PostController {
  constructor(private readonly postService: Service<Post>) {}

  createPost = (req: Request, res: Response) => {
    const { title, author, content } = req.body;
    const post = {
      title: title as string,
      author: author as string,
      content: content as string,
    };
    const { result } = this.postService.createItem(post);
    if (result) {
      res.status(201).end();
    }
  };

  getAllPosts = (_: Request, res: Response) => {
    const { result, data } = this.postService.getAllItems();
    if (result) {
      res.status(200).json({ response: data });
    }
  };

  getPostById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { result, error, data } = this.postService.getItemById(Number(id));
    if (result) {
      res.status(200).json({ response: data });
    } else {
      res.status(404).json({ response: error });
    }
  };

  updatePost = (req: Request, res: Response) => {
    const { id } = req.params;
    const { result, error } = this.postService.updateItem(
      Number(id),
      req.body as Post
    );
    if (result) {
      res.status(200).end();
    } else {
      res.status(404).json({ response: error });
    }
  };

  deletePost = (req: Request, res: Response) => {
    const { id } = req.params;
    const { result, error } = this.postService.deleteItem(Number(id));
    if (result) {
      res.status(200).end();
    } else {
      res.status(404).json({ response: error });
    }
  };
}

export default new PostControllerImpl(PostService);

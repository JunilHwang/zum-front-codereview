import { RequestHandler } from "express";
import { GetPostDto } from "./dto/get-post.dto";
import { SetPostDto } from "./dto/set-post.dto";
import { PutPostDto } from "./dto/put-post.dto";
import { PostService } from "./post.service";

export class PostController {
  constructor(private postService: PostService) {}
  public getPost: RequestHandler = (req, res) => {
    const getPostDto: GetPostDto = req.query;
    res.send(this.postService.getPost(getPostDto));
  };
  public setPost: RequestHandler = (req, res) => {
    const setPostDto: SetPostDto = req.body;
    res.send(this.postService.setPost(setPostDto));
  };
  public putPost: RequestHandler = (req, res) => {
    const putPostDto: PutPostDto = req.body;
    res.send(this.postService.putPost(putPostDto));
  };
}

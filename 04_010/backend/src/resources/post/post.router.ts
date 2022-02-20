import { Router } from "express";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

const postRouter = Router();
const controller = new PostController(new PostService());

postRouter.get("", controller.getPost);
postRouter.post("", controller.setPost);
postRouter.put("", controller.putPost);

export default postRouter;

import express from "express";
import controller from "../controllers/postController";

const router = express.Router();

router.post("/", controller.createPost);
router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPostById);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

export default router;

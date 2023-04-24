import express from "express";
import * as postsController from "../controllers/postController";

export const postsRouter = express.Router();

postsRouter.post("/", postsController.createPost);

postsRouter.get("/", postsController.getAllPosts);

postsRouter.get("/:id", postsController.getPost);

postsRouter.patch("/:id", postsController.updatePost);

postsRouter.delete("/:id", postsController.deletePost);

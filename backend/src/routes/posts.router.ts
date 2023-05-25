import express from "express";
import * as authController from "../controllers/authController";
import * as postController from "../controllers/postController";
import * as userController from "../controllers/userController";

export const postsRouter = express.Router();

postsRouter
  .route("/")
  .get(userController.attatchUserToReq, postController.getAllPosts)
  .post(
    authController.protect,
    postController.uploadPhotos,
    postController.resizePhoto,
    postController.createPost
  );

postsRouter
  .route("/:postId")
  .get(
    userController.attatchUserToReq,
    authController.protect,
    postController.getPost
  )
  .post(
    userController.attatchUserToReq,
    authController.protect,
    userController.updateFavouritePosts
  );

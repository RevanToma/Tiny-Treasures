import express from "express";
import * as authController from "../controllers/authController";

export const userRouter = express.Router();

userRouter.post("/signup", authController.signUp);
userRouter.post(
  "/signin",
  authController.verifyPassword,
  authController.signIn
);
userRouter.post("/logout", authController.logout);

userRouter.use(authController.protect);

userRouter.patch(
  "/updatePassword",
  authController.verifyPassword,
  authController.updatePassword
);
userRouter.patch(
  "/updateEmail",
  authController.verifyPassword,
  authController.updateEmail
);

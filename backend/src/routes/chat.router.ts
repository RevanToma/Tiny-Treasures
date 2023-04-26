import express from "express";
import * as chatController from "./../controllers/chatController";
export const chatRouter = express.Router();

chatRouter.post("/", chatController.createChat);
chatRouter.get("/:userId", chatController.userChats);
chatRouter.get("/find/:firstId/:secondId", chatController.findChat);

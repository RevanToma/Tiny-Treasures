import express from "express";
import * as chatController from "./../controllers/chatController";
export const chatRouter = express.Router();

chatRouter.post("/", chatController.createChat);
chatRouter.get("/:id", chatController.userChats);
chatRouter.get("/find/:id", chatController.findChat);

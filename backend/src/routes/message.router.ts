import express from "express";
import * as messageController from "./../controllers/messageController";
export const messageRouter = express.Router();

messageRouter.post("/", messageController.addMessage);
messageRouter.get("/:chatId", messageController.getMessages);

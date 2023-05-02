import express from "express";
import * as chatController from "./../controllers/chatController";

export const chatRouter = express.Router();

chatRouter.get("/:id", chatController.userChats);

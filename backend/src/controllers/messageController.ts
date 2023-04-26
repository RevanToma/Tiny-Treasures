import { MessageModel } from "../models/messageModal";
import ChatRoomModel from "../models/chatRoomModel";
import { Request, Response } from "express";
export const addMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { chatId, senderId, text } = req.body;
  try {
    // find the chat room with the right ID
    const chat = await ChatRoomModel.findById(chatId);
    if (!chat) {
      res.status(404).json({ error: "Chat room not found" });
      return;
    }

    // add the new message to the chat rooms messages arrayu
    chat.messages.push({ senderId, text });
    await chat.save();

    res.status(200).json(chat.messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

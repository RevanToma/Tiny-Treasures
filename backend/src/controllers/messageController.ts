import { MessageModel } from "../models/messageModal";
import ChatRoomModel from "../models/chatRoomModel";
import { Request, Response } from "express";
export const addMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { chatId, senderId, text } = req.body;
  try {
    // Find the chat room with the given ID
    const chat = await ChatRoomModel.findById(chatId);
    if (!chat) {
      res.status(404).json({ error: "Chat room not found" });
      return;
    }

    // Add the new message to the chat room's messages array
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

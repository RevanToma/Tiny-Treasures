import { Request, Response } from "express";
import ChatModel from "../models/chatRoomModel";

export const createChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req: Request, res: Response): Promise<void> => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(id);
    const chat = await ChatModel.findById(id);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

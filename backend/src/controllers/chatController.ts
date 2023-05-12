import { Request, Response } from "express";
import ChatModel from "../models/chatRoomModel";
import { catchAsync } from "../utils/catchAsync";

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

export const userChats = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const chats = await ChatModel.find({
      members: { $in: [id] },
    });
    res.status(200).json(chats);
  }
);

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

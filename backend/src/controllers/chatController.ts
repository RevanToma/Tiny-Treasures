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
    const sortedChats = chats.map((chat) => {
      const messages = chat.messages.map((message) => {
        const sentByMe = message.senderId?.toString() === id;
        return {
          senderId: message.senderId,
          text: message.text,
          _id: message._id,
          sentByMe,
        };
      });

      return { members: chat.members, _id: chat._id, messages };
    });
    res.status(200).json(sortedChats);
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

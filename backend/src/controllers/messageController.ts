/* import { MessageModel } from "../models/messageModal";
import ChatModel from "../models/chatRoomModel";
import { Request, Response } from "express"; */

// export const addMessage = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { id, senderId, text } = req.body;
//   try {
//     // find the chat room with the right ID
//     const chat = await ChatModel.findById(id);
//     if (!chat) {
//       res.status(404).json({ error: "Chat room not found" });
//       return;
//     }

//     // add the new message to the chat rooms messages array
//     chat.messages.push({ senderId, text });
//     await chat.save();
//     // io.emit("chat message", { senderId, text });

//     res.status(200).json(chat.messages);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// export const getMessages = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const result = await MessageModel.findById(id);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

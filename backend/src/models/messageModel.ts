import mongoose from "mongoose";

export const MessageSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  text: {
    type: String,
  },
  postId: {
    type: String,
  },
  roomId: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

export const MessageModel = mongoose.model("Message", MessageSchema);

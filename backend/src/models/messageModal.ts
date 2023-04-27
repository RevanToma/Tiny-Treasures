import mongoose from "mongoose";

export const MessageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = mongoose.model("Message", MessageSchema);

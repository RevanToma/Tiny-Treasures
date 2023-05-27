import mongoose from "mongoose";
import Post from "./postModel";

export const MessageSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const chatRoomSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [MessageSchema],
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

chatRoomSchema.pre(/^find/, function (next) {
  this.populate("post");
  next();
});

const ChatModel = mongoose.model("Chat-room", chatRoomSchema);

export default ChatModel;

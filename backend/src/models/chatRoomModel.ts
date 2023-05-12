import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

MessageSchema.virtual("sentByMe").get(function (userId: string) {
  return this.senderId?.toString() === userId;
});

const ChatModel = mongoose.model("Chat-room", chatRoomSchema);

export default ChatModel;

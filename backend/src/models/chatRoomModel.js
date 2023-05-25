"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.MessageSchema = new mongoose_1.default.Schema({
    id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    receiverId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const chatRoomSchema = new mongoose_1.default.Schema({
    members: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    messages: [exports.MessageSchema],
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
}, {
    timestamps: true,
});
chatRoomSchema.pre(/^find/, function (next) {
    this.populate("post");
    next();
});
const ChatModel = mongoose_1.default.model("Chat-room", chatRoomSchema);
exports.default = ChatModel;

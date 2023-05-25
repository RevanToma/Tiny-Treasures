"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = exports.MessageSchema = void 0;
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
    createdAt: {
        type: Date,
    },
});
exports.MessageModel = mongoose_1.default.model("Message", exports.MessageSchema);

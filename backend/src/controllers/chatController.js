"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChat = exports.userChats = exports.createChat = void 0;
const chatRoomModel_1 = __importDefault(require("../models/chatRoomModel"));
const catchAsync_1 = require("../utils/catchAsync");
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newChat = new chatRoomModel_1.default({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const result = yield newChat.save();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createChat = createChat;
exports.userChats = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const chats = yield chatRoomModel_1.default.find({
        members: { $in: [id] },
    });
    console.log(chats);
    res.status(200).json(chats);
}));
const findChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const chat = yield chatRoomModel_1.default.findById(id);
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.findChat = findChat;

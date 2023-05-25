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
exports.SocketServer = void 0;
const server_1 = require("../server");
const chatRoomModel_1 = __importDefault(require("../models/chatRoomModel"));
const authController_1 = require("../controllers/authController");
class SocketServer {
    constructor(io) {
        this.connectedUsers = {};
        this.connection = (socket, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (token && token.length > 6) {
                    const decoded = yield (0, authController_1.decodeToken)(token);
                    const userId = decoded.id;
                    if (userId) {
                        socket.userId = userId;
                        this.connectedUsers[userId] = socket.id;
                    }
                }
            }
            catch (e) {
                console.log("SOMETHING WENT WRONG!");
            }
        });
        this.createChat = (io, socket, data) => __awaiter(this, void 0, void 0, function* () {
            const receiverId = data.receiverId.toString();
            const userId = socket.userId;
            const recvSocketId = this.connectedUsers[receiverId];
            console.log("userID: ", socket.userId);
            console.log("recvID: ", receiverId);
            if (userId) {
                let chatRoom;
                chatRoom = yield chatRoomModel_1.default.findOne({
                    members: {
                        $all: [receiverId, userId],
                    },
                    post: data.post._id,
                });
                if (!chatRoom) {
                    chatRoom = yield chatRoomModel_1.default.create({
                        members: [receiverId, userId],
                        messages: [],
                        post: data.post._id,
                    }).then((doc) => {
                        return chatRoomModel_1.default.populate(doc, { path: "post" });
                    });
                }
                const sendTo = recvSocketId ? [socket.id, recvSocketId] : [socket.id];
                io.to(sendTo).emit("create-chat", chatRoom);
            }
            //const test = connectedUsers.get();
        });
        this.typing = (io, socket, typingInfo) => __awaiter(this, void 0, void 0, function* () {
            const receiverId = typingInfo.receiverId.toString();
            const recvSocketId = this.connectedUsers[receiverId];
            if (recvSocketId)
                io.to(recvSocketId).emit("typing", typingInfo);
        });
        this.onChatMessage = (io, socket, message) => __awaiter(this, void 0, void 0, function* () {
            const { text, receiverId, postId, roomId } = message;
            const recvSocketId = this.connectedUsers[receiverId.toString()];
            const sendTo = recvSocketId ? [socket.id, recvSocketId] : [socket.id];
            io.to(sendTo).emit("chat-message", message);
            chatRoomModel_1.default.findById(roomId).then((chat) => {
                chat === null || chat === void 0 ? void 0 : chat.messages.push(message);
                chat === null || chat === void 0 ? void 0 : chat.save();
            });
        });
        this.io = io;
    }
    start() {
        server_1.io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const token = (_b = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.toString().trim();
            this.connection(socket, token);
            socket.on("create-chat", (data) => __awaiter(this, void 0, void 0, function* () { return this.createChat(server_1.io, socket, data); }));
            socket.on("typing", (typingInfo) => this.typing(server_1.io, socket, typingInfo));
            socket.on("chat-message", (msg) => this.onChatMessage(server_1.io, socket, msg));
        }));
    }
}
exports.SocketServer = SocketServer;

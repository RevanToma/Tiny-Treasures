import { io } from "../server";

import ChatModel from "../models/chatRoomModel";
import { Server, Socket } from "socket.io";
import { decodeToken } from "../controllers/authController";


interface CustomSocket extends Socket {
    userId?: string
}

interface TypingInfo {
    senderId: string,
    receiverId: string,
    chatRoomId: string,
    typing: boolean
}


export class SocketServer {
    private connectedUsers: { [key: string]: string } = {};

    private io;

    constructor(io: Server) {
        this.io = io;
    }

    public start() {
        io.on("connection", async(socket: CustomSocket) => {
            const token: string | undefined = socket.handshake.query?.userId?.toString().trim();
            this.connection(socket, token);
          
            socket.on("create-chat", async(data) => this.createChat(io, socket, data));
          
            socket.on("typing", (typingInfo: TypingInfo) => this.typing(io,socket,typingInfo));
          
            socket.on("chat-message", (msg) => this.onChatMessage(io, socket, msg));
          });
    }

    private connection = async(socket: CustomSocket, token: string | undefined) => {
        try {
            if(token && token.length > 6) {
              const decoded = await decodeToken(token);
              const userId : string = decoded.id;
              if (userId) {
                socket.userId = userId;
                this.connectedUsers[userId] = socket.id;
              }
          }
        
          } catch (e) {
            console.log("SOMETHING WENT WRONG!");
          }
    }

    private createChat = async(io: Server, socket: CustomSocket, data: any) => {
        const receiverId : string = data.receiverId.toString();

        const userId : string | undefined = socket.userId;
    
        const recvSocketId : string | undefined = this.connectedUsers[receiverId];

        console.log("userID: ",socket.userId);
        console.log("recvID: ", receiverId);

    if(userId) {
        let chatRoom;

        chatRoom = await ChatModel.findOne({
          members: {
            $all: [receiverId, userId],
          },
          post: data.post._id,
        });
    
        if (!chatRoom) {
          chatRoom = await ChatModel.create({
            members: [receiverId, userId],
            messages: [],
            post: data.post._id,
          }).then((doc) => {
            return ChatModel.populate(doc, { path: "post" });
          });
      }

      const sendTo : string[] = recvSocketId ? [socket.id, recvSocketId] : [socket.id];

      io.to(sendTo).emit(
        "create-chat",
        chatRoom
      );
    }
    //const test = connectedUsers.get();

    }

    private typing = async(io: Server, socket: CustomSocket, typingInfo: TypingInfo) => {
        const receiverId : string = typingInfo.receiverId.toString();
        const recvSocketId : string | undefined = this.connectedUsers[receiverId];
    
        if(recvSocketId)
          io.to(recvSocketId).emit("typing", typingInfo);
    }

    private onChatMessage = async(io: Server, socket: CustomSocket, message: any) => {
        const { text, receiverId, postId, roomId } = message;

        const recvSocketId : string | undefined = this.connectedUsers[receiverId.toString()];
        
        const sendTo : string[] = recvSocketId ? [socket.id, recvSocketId] : [socket.id];
        io.to(sendTo).emit(
          "chat-message",
          message
        );
    
        ChatModel.findById(roomId).then((chat) => {
          chat?.messages.push(message);
          chat?.save();
        });
    }

}



import { connectToMongoDB } from "./db/mongoose_connection";
import { app } from "./app";
import http from "http";
import { Server } from "socket.io";
import { MessageModel } from "./models/messageModel";
import ChatModel from "./models/chatRoomModel";
import mongoose from "mongoose";
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const start = async () => {
  try {
    await connectToMongoDB().then(() => console.log("Connected to DB..."));
    server.listen(port, () => {
      console.log(`listening to ${port}:  http://127.0.0.1:${port}`);
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

start();

io.on("connection", (socket) => {
  socket.on("create-chat", async (data) => {
    const { recieverId, userToken: userId } = data;

    let chatRoom;

    chatRoom = await ChatModel.findOne({
      members: {
        $all: [recieverId, userId],
      },
    });

    if (!chatRoom) {
      chatRoom = await ChatModel.create({
        members: [recieverId, userId],
        messages: [],
        // _id: mongoose.Types.ObjectId,
      });
    }

    const id = chatRoom._id.toString();

    socket.join(id);

    // socket.emit("create-chat", id);
    socket.emit("create-chat", chatRoom);
    // socket.to(chatRoom._id).emit("create-chat", chatRoom);
  });

  socket.on("join-rooms", async (userToken) => {
    const chats = await ChatModel.find({ members: { $all: [userToken] } });
    console.log(chats);
    chats.map((chat) => {
      socket.join(chat.id);
    });
    socket.emit("join-rooms", chats);
  });

  console.log("a user connected");
  socket.on("chat-message", (msg) => {
    console.log(socket.id);

    // console.log(socket.rooms);
    const chatRoomId = [...socket.rooms][1];
    // console.log(chatRoomId);
    const { text, senderId, socketId } = msg;
    // console.log(chatRoomId);

    ChatModel.findById(chatRoomId).then((chat) => {
      chat?.messages.push({ senderId, text });
      chat?.save().then(() => {
        io.to(chatRoomId).emit("chat-message", msg);
        //socket.broadcast.to(socketId).emit("chat-message", msg);

        console.log("TEXT", text);
      });
    });
  });
});

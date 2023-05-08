import { connectToMongoDB } from "./db/mongoose_connection";
import { app } from "./app";
import http from "http";
import { Server } from "socket.io";
import ChatModel from "./models/chatRoomModel";
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

const connectedUsers: { [key: string]: string } = {};

io.on("connection", (socket) => {
  const userId: string | undefined = socket.handshake.query?.userId?.toString();

  if (userId) {
    connectedUsers[userId] = socket.id;
  }

  socket.on("create-chat", async (data) => {
    const { receiverId, userId } = data;

    console.log(`RECIVERID: ${receiverId} , userId: ${userId}`);

    let chatRoom;

    chatRoom = await ChatModel.findOne({
      members: {
        $all: [receiverId, userId],
      },
    });

    if (!chatRoom) {
      chatRoom = await ChatModel.create({
        members: [receiverId, userId],
        messages: [],
      });
    }

    socket.emit("create-chat");
  });

  socket.on("typing", (typingInfo) => {
    const { receiverId } = typingInfo;

    io.to(connectedUsers[receiverId]).emit("typing", typingInfo);
  });

  socket.on("chat-message", (msg) => {
    const { text, senderId, receiverId } = msg;

    io.to([connectedUsers[senderId], connectedUsers[receiverId]]).emit(
      "chat-message",
      msg
    );

    ChatModel.findOne({
      members: {
        $all: [receiverId, senderId],
      },
    }).then((chat) => {
      chat?.messages.push({ senderId, text });
      chat?.save();
    });
  });
});

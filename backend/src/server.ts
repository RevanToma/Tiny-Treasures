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

io.on("connection", (socket) => {
  socket.on("create-chat", async (data) => {
    const { recieverId, userId } = data;

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
      });
    }

    const id = chatRoom._id.toString();
    socket.join(id);
    socket.emit("create-chat", chatRoom);
  });

  socket.on("join-rooms", async (userId) => {
    const chats = await ChatModel.find({ members: { $all: [userId] } });

    chats.map((chat) => {
      socket.join(chat.id);
    });
    socket.emit("join-rooms", chats);
  });

  socket.on("typing", (typingInfo) => {
    const { chatRoomId } = typingInfo;
    io.to(chatRoomId).emit("typing", typingInfo);
  });

  socket.on("chat-message", (msg) => {
    const { text, senderId, chatRoomId } = msg;
    console.log(msg);

    const checkChatRoomId: string | undefined = [...socket.rooms].find(
      (room) => room === chatRoomId
    );
    if (!checkChatRoomId) return;

    io.to(checkChatRoomId).emit("chat-message", msg);
    console.log("roomid, ", checkChatRoomId, "messageroom", chatRoomId);

    ChatModel.findById(checkChatRoomId).then((chat) => {
      chat?.messages.push({ senderId, text });
      chat?.save();
    });
  });
});

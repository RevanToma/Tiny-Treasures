import { connectToMongoDB } from "./db/mongoose_connection";
import { app } from "./app";
import http from "http";
import { Server } from "socket.io";
import { MessageModel } from "./models/messageModal";
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
    console.log("DATA", data);
    const { recieverId, userToken: userId } = data;

    let chatRoom;

    chatRoom = await ChatModel.findOne({
      members: {
        $all: [recieverId, userId],
      },
    });

    if (!chatRoom) {
      chatRoom = ChatModel.create({
        members: [recieverId, userId],
        messages: [],
      });

      console.log("NEW CHAT");
    }
    socket.emit("create-chat", chatRoom);
  });

  console.log("a user connected");
  socket.on("chat-message", (msg) => {
    console.log(msg);
    const { text, id, senderId } = msg;

    ChatModel.findById(id).then((chat) => {
      chat?.messages.push({ senderId, text });
      chat?.save().then(() => {
        io.emit("chat-message", msg);
        console.log(text);
      });
    });
  });
});

/*  getChatRoom(recieverId, userId).then((chatroom) => {
      console.log("-------");
      console.log(chatroom);
      console.log("-------");
      socket.emit("output-messages", chatroom);
    }); */

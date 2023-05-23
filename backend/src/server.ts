import { connectToMongoDB } from "./db/mongoose_connection";
import { app } from "./app";
import http from "http";
import { Server } from "socket.io";
import { SocketServer } from "./utils/socketServer";
const port = process.env.PORT || 3000;

const server = http.createServer(app);
export const io = new Server(server, {
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

new SocketServer(io).start();
import { connectToMongoDB } from "./db/mongoose_connection";
import { app } from "./app";

import { addUser, getUser, removeUser } from "./utils/addUser";
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToMongoDB().then(() => console.log("Connected to DB..."));

    // Add the following lines for Socket.IO

    server.listen(port, () => {
      console.log(`listening to ${port}:  http://127.0.0.1:${port}`);
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

start();

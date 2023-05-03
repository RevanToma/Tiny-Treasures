import { io } from "socket.io-client";

export const socket = io("http://localhost:8000");
socket.onAny((event, ...args) => {
  console.log(event, args);
});

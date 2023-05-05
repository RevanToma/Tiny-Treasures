import { io } from "socket.io-client";

export class Socket {
  private static instance: Socket;

  public socketIO;

  private constructor(userId: string) {
    console.log("CONNECTING TO SOCKET");
    this.socketIO = io("http://localhost:8000", {
      query: {
        userId,
      },
    });
  }

  public static init(userId: string | undefined): Socket {
    if (userId) {
      Socket.instance = new Socket(userId);
    }

    return Socket.instance;
  }

  public static getInstance(): Socket {
    if (!Socket.instance) {
      console.log("NOT CONNECTED TO ANY SOCKETS");
    }
    return Socket.instance;
  }
}

export const socket = () => Socket.getInstance().socketIO;

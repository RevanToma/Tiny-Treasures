import React, { useEffect, useState } from "react";
import { socket } from "../../Sockets/Message.socket";

type Message = {
  senderId: string;
  text: string;
};

type ChatRoomConnection = {
  userToken: string;
  recieverId: string;
  socketId: string;
};

type Props = {
  userToken: string;
  recieverId: string;
  socketId: string;
};

const MessageForm: React.FC<Props> = ({ userToken, recieverId, socketId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState();

  const [chatRoomConnection, setChatRoomConnection] =
    useState<ChatRoomConnection>({
      userToken: userToken,
      recieverId: recieverId,
      socketId: socketId,
    });

  const [message, setMessage] = useState<Message>({
    text: "",
    senderId: "614a74ec4f43f38d1c9054d1",
  });

  function onSubmit(event: any) {
    event.preventDefault();
    console.log(message);
    if (!message) return null;
    socket.emit("chat-message", message);
  }

  const handleCreateNewChat = () => {
    socket.emit("create-chat", chatRoomConnection);
  };

  useEffect(() => {
    socket.on("chat-message", (data) => {
      setMessages([...messages, data]);
      console.log("instant", data);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("create-chat", (data) => {
      console.log("CHAT CREATED", data);
    });
  }, [chatRoomConnection]);

  useEffect(() => {
    socket.emit("join-rooms", userToken);
  }, [userToken]);

  useEffect(() => {
    socket.on("join-rooms", (rooms) => {
      setRooms(rooms);
    });
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => setMessage({ ...message, text: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleCreateNewChat}>create chat</button>

      <div>
        {messages.map((message, i) => (
          <div key={i}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MessageForm;

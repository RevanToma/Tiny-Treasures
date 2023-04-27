import React, { useEffect, useState } from "react";
import { socket } from "../../Sockets/Message.socket";

type Message = {
  senderId: string;
  id: string;
  text: string;
};

type ChatRoomConnection = {
  userToken: string;
  recieverId: string;
};

const MessageForm: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatRoomConnection, setChatRoomConnection] =
    useState<ChatRoomConnection>({
      userToken: "614a74ec4f43f38d1c9054d1",
      recieverId: "614a74ec4f43f38d1c9054d2",
    });

  const [message, setMessage] = useState<Message>({
    text: "",
    senderId: "614a74ec4f43f38d1c9054d1",
    id: "6449689b342c2e9942f086f3",
  });

  function onSubmit(event: any) {
    event.preventDefault();

    if (!message) return null;
    socket.emit("chat message", message);
  }

  const handleCreateNewChat = () => {
    console.log(chatRoomConnection);
    socket.emit("create-chat", chatRoomConnection);
  };

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages([...messages, data]);
      console.log("instant", data);
    });

    socket.on("create-chat", (data) => {
      console.log(data);
      setMessages([...messages, ...data.messages]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("output-messages", (data) => {
      console.log(data);
      setMessages([...messages, ...data[0].messages]);
      console.log({ ...data });
    });
  }, [messages]);

  console.log(messages);

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

import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../Sockets/Message.socket";

type Message = {
  senderId: string;
  text: string;
  chatRoomId: string;
  sentByMe?: boolean;
};

type ChatRoomConnection = {
  userToken: string;
  recieverId: string;
};

type Props = {
  userToken: string;
  recieverId: string;
};

const MessageForm: React.FC<Props> = ({ userToken, recieverId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState();
  const [typing, setTyping] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const [chatRoomConnection, setChatRoomConnection] =
    useState<ChatRoomConnection>({
      userToken: userToken,
      recieverId: recieverId,
    });

  const [message, setMessage] = useState<Message>({
    text: "",
    senderId: userToken,
    chatRoomId: "",
  });

  function onSubmit(event: any) {
    event.preventDefault();
    // console.log(message);
    if (!message) return null;
    socket.emit("chat-message", message);
  }

  const handleCreateNewChat = () => {
    socket.emit("create-chat", chatRoomConnection);
  };

  const handleChatInput = (e: any) => {
    setMessage({ ...message, text: e.target.value });
  };

  useEffect(() => {
    const typingInfo = {
      userToken,
      chatRoomId: message.chatRoomId,
    };
    let timeout: ReturnType<typeof setTimeout>;

    const handleKeyDown = (e: any) => {
      if (e.key != "enter") {
        socket.emit("typing", { ...typingInfo, typing: true });
        clearTimeout(timeout);
      }
    };

    const handleKeyUp = () => {
      timeout = setTimeout(() => {
        socket.emit("typing", { ...typingInfo, typing: false });
      }, 3000);
    };

    chatInputRef.current?.addEventListener("keydown", handleKeyDown);
    chatInputRef.current?.addEventListener("keyup", handleKeyUp);

    return () => {
      chatInputRef.current?.removeEventListener("keydown", handleKeyDown);
      chatInputRef.current?.removeEventListener("keyup", handleKeyUp);
    };
  }, [message.chatRoomId, userToken]);

  useEffect(() => {
    socket.on("typing", (data) => {
      const { typing, userToken } = data;
      const iAmTyping = userToken === chatRoomConnection.recieverId && typing;
      setTyping(iAmTyping);
    });
  }, []);

  useEffect(() => {
    socket.on("chat-message", (data) => {
      const isSentByMe = data.senderId === userToken;
      const updateMsg = [...messages, { ...data, sentByMe: isSentByMe }];
      setMessages(updateMsg);
    });
  }, [messages, userToken]);

  useEffect(() => {
    socket.on("create-chat", (data) => {
      // console.log("CHAT CREATED", data);
      setMessage({ ...message, chatRoomId: data._id });
    });
  }, [chatRoomConnection]);

  useEffect(() => {
    socket.emit("join-rooms", userToken);
  }, [userToken]);

  useEffect(() => {
    socket.on("join-rooms", (rooms) => {
      setRooms(rooms);
    });
  }, [userToken]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input ref={chatInputRef} onChange={(e) => handleChatInput(e)} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleCreateNewChat}>OPEN CHAT WITH RECIEVER</button>
      <div>
        {messages.map((message, i) => (
          <div key={i}>
            <h4 style={{ textAlign: message.sentByMe ? "right" : "left" }}>
              sent by: {message.sentByMe && "SENT BY ME"}
            </h4>
            <p style={{ textAlign: message.sentByMe ? "right" : "left" }}>
              {message.text}
            </p>
            <div style={{ height: "2px", backgroundColor: "black" }}></div>
          </div>
        ))}
      </div>
      {typing && <div>{userToken} is typing...</div>}
    </>
  );
};

export default MessageForm;

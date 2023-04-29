import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../../Sockets/Message.socket";
import Message from "../Message/Message";
import { IMessage } from "../../../types";
import * as S from "./styled";
import TypingAnimation from "../TypingAnimation/TypingAnimation";

type ChatRoomConnection = {
  userToken: string;
  recieverId: string;
};

type Props = {
  userToken: string;
  recieverId: string;
};

const MessageForm: React.FC<Props> = ({ userToken, recieverId }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [rooms, setRooms] = useState();
  const [typing, setTyping] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const [chatRoomConnection, setChatRoomConnection] =
    useState<ChatRoomConnection>({
      userToken: userToken,
      recieverId: recieverId,
    });

  const [message, setMessage] = useState<IMessage>({
    text: "",
    senderId: userToken,
    chatRoomId: "",
    _id: "",
  });

  function onSubmit(event: any) {
    event.preventDefault();
    // console.log(message);
    if (!message || !chatInputRef.current?.value) return null;
    socket.emit("chat-message", message);
    if (chatInputRef.current) {
      chatInputRef.current.value = "";
    }
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

    chatInputRef.current?.scrollIntoView();
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

  console.log(messages);

  return (
    <>
      <button onClick={handleCreateNewChat}>OPEN CHAT WITH RECIEVER</button>
      <S.ChatContainer>
        {messages.map((message) => (
          <Message message={message} />
        ))}
        {typing && <TypingAnimation />}
        <S.MessageInputForm onSubmit={onSubmit}>
          <S.MessageInput
            ref={chatInputRef}
            onChange={(e) => handleChatInput(e)}
          />
          <S.SendButton type="submit">Submit</S.SendButton>
        </S.MessageInputForm>
      </S.ChatContainer>
    </>
  );
};

export default MessageForm;

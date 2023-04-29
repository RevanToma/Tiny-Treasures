import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../../Sockets/Message.socket";
import Message from "../Message/Message";
import { IMessage } from "../../../types";
import * as S from "./styled";
import TypingAnimation from "../TypingAnimation/TypingAnimation";

type ChatMembers = {
  userId: string;
  recieverId: string;
};

type Props = {
  chatMembers: ChatMembers;
};

const ChatRoom: React.FC<Props> = ({ chatMembers }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<IMessage>({
    text: "",
    senderId: chatMembers.userId,
    chatRoomId: "",
    _id: "",
  });

  useEffect(() => {
    const typingInfo = {
      userId: chatMembers.userId,
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
  }, [message.chatRoomId, chatMembers.userId]);

  useEffect(() => {
    socket.on("typing", (data) => {
      const { typing, userId } = data;
      const iAmTyping = userId === chatMembers.recieverId && typing;
      setTyping(iAmTyping);
    });
  }, []);

  useEffect(() => {
    socket.on("chat-message", (data) => {
      const isSentByMe = data.senderId === chatMembers.userId;
      const updateMsg = [...messages, { ...data, sentByMe: isSentByMe }];
      setMessages(updateMsg);
    });

    chatInputRef.current?.scrollIntoView();
  }, [messages, chatMembers.userId]);

  useEffect(() => {
    socket.on("create-chat", (data) => {
      setMessage({ ...message, chatRoomId: data._id });
    });
  }, [chatMembers, message]);

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
    socket.emit("create-chat", chatMembers);
  };

  const handleChatInput = (e: any) => {
    setMessage({ ...message, text: e.target.value });
  };

  return (
    <S.ChatRoomContainer>
      <button onClick={handleCreateNewChat}>OPEN CHAT WITH RECIEVER</button>
      <S.ChatContainer>
        {messages.map((message) => (
          <Message message={message} />
        ))}
        {typing && <TypingAnimation />}
      </S.ChatContainer>
      <S.MessageInputForm onSubmit={onSubmit}>
        <S.MessageInput
          ref={chatInputRef}
          onChange={(e) => handleChatInput(e)}
        />
        <S.SendButton type="submit">Submit</S.SendButton>
      </S.MessageInputForm>
    </S.ChatRoomContainer>
  );
};

export default ChatRoom;

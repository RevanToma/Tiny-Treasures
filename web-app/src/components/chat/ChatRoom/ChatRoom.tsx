import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../../Sockets/Message.socket";
import Message from "../Message/Message";
import { IChatRoom, IMessage } from "../../../types";
import * as S from "./styled";
import TypingAnimation from "../TypingAnimation/TypingAnimation";

type Props = {
  room: IChatRoom;
  userId: string;
  receiverId?: string;
};

const ChatRoom: React.FC<Props> = ({ room, userId, receiverId = "" }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<IMessage>({
    text: "",
    senderId: userId,
    receiverId,
  });

  useEffect(() => {
    console.log("room updated", room);
    setMessages(room.messages);
  }, [room]);

  useEffect(() => {
    const typingInfo = {
      userId,
      receiverId,
      chatRoomId: room._id,
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
  }, [room._id, userId, receiverId]);

  useEffect(() => {
    socket.on("typing", (data) => {
      const { typing, userId: typingId } = data;
      const receiverIsTyping = userId !== typingId && typing;
      setTyping(receiverIsTyping);
    });
  }, [userId]);

  useEffect(() => {
    socket.on("chat-message", (data) => {
      console.log("chat-message received", data);
      const isSentByMe = data.senderId === userId;
      const updateMsg = [...messages, { ...data, sentByMe: isSentByMe }];
      setMessages(updateMsg);
    });

    chatInputRef.current?.scrollIntoView();
  }, [messages, userId]);

  function onSubmit(event: any) {
    event.preventDefault();
    if (!message || !chatInputRef.current?.value) return null;
    socket.emit("chat-message", message);
    if (chatInputRef.current) {
      chatInputRef.current.value = "";
    }
  }

  const handleChatInput = (e: any) => {
    setMessage({ ...message, text: e.target.value });
  };

  return (
    <S.ChatRoomContainer>
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
    </S.ChatRoomContainer>
  );
};

export default ChatRoom;

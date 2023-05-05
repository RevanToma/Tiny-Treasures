import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../../Sockets/Message.socket";
import Message from "../Message/Message";
import { IChatRoom, IMessage } from "../../../types";
import * as S from "./styled";
import TypingAnimation from "../TypingAnimation/TypingAnimation";
import SendButton from "../../../assets/svg.icons/SendButton";
import Box from "../../common/Box/Box";

type Props = {
  room: IChatRoom;
  userId: string;
  receiverId?: string;
};

const ChatRoom: React.FC<Props> = ({ room, userId, receiverId = "" }) => {
  const [messages, setMessages] = useState<IMessage[]>(room.messages);
  const [typing, setTyping] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<IMessage>({
    text: "",
    senderId: userId,
    receiverId,
  });

  // useEffect(() => {
  //   console.log("room updated", room);
  //   setMessages(room.messages);
  // }, [room]);

  useEffect(() => {
    const typingInfo = {
      senderId: userId,
      receiverId,
      chatRoomId: room._id,
    };
    let timeout: ReturnType<typeof setTimeout>;

    const handleKeyDown = (e: any) => {
      if (e.key != "enter") {
        socket().emit("typing", { ...typingInfo, typing: true });
        clearTimeout(timeout);
      }
    };

    const handleKeyUp = () => {
      timeout = setTimeout(() => {
        socket().emit("typing", { ...typingInfo, typing: false });
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
    socket().on("typing", (data) => {
      console.log(userId, " is typing");

      if (data.senderId == receiverId) {
        const { typing, userId: typingId } = data;
        const receiverIsTyping = userId !== typingId && typing;
        setTyping(receiverIsTyping);
      }
    });
  }, [userId]);

  useEffect(() => {
    socket().on("chat-message", (data) => {
      const senderIsMember = room.members.some(
        (member) => member === data.senderId
      );
      const receiverIsMember = room.members.some(
        (member) => member === receiverId
      );
      if (senderIsMember && receiverIsMember) {
        const isSentByMe = data.senderId === userId;
        const updateMsg = [...messages, { ...data, sentByMe: isSentByMe }];
        setMessages(updateMsg);
        console.log("sent by meeeee");
        lastMessageRef.current?.scrollIntoView();
      }
    });
    chatInputRef.current?.scrollIntoView();
  }, [messages, receiverId, room, userId]);

  function onSubmit(event: any) {
    if (!message || !chatInputRef.current?.value) return null;
    socket().emit("chat-message", message);
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
        {messages.map((message, i, arr) => (
          <>
            <Message key={message._id} message={message} />
          </>
        ))}
        <Box ref={lastMessageRef} height="1px" width="100%"></Box>
        {typing && <TypingAnimation />}
      </S.ChatContainer>
      <Box flexDirection="row" gap="10px" justifyContent="space-between">
        <S.MessageInputForm>
          <S.MessageInput
            placeholder="Message"
            ref={chatInputRef}
            onChange={(e) => handleChatInput(e)}
          />
        </S.MessageInputForm>
        <SendButton onClick={onSubmit} />
      </Box>
    </S.ChatRoomContainer>
  );
};

export default ChatRoom;

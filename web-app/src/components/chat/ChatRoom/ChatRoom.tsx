import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../../Sockets/Message.socket";
import Message from "../Message/Message";
import { IChatRoom, IMessage, Post } from "../../../types";
import * as S from "./styled";
import TypingAnimation from "../TypingAnimation/TypingAnimation";
import Box from "../../common/Box/Box";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import ChatInput from "../ChatInput/ChatInput";
import ChatPostItem from "../ChatPostItem/ChatPostItem";

function createJaggedArray(messagesArray: IMessage[]): IMessage[][] {
  const jaggedArray: IMessage[][] = [];

  let currentDate: Date | null = null;

  let currentGroup: IMessage[] = [];

  console.log("äinput", messagesArray);

  for (const obj of messagesArray) {
    if (obj.createdAt) {
      const objUnix = Date.parse(obj.createdAt.toString());
      const objDate = new Date(objUnix);
      if (currentDate === null || !isSameDay(currentDate, objDate)) {
        currentDate = objDate;
        currentGroup = [];
        jaggedArray.push(currentGroup);
      }
      currentGroup.push(obj);
    }
  }
  console.log("output", jaggedArray);
  return jaggedArray;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

type Props = {
  room: IChatRoom;
  userId: string;
  receiverId: string;
  post: Post;
};

const ChatRoom: React.FC<Props> = ({ post, room, userId, receiverId = "" }) => {
  const chatInputPlace = document.getElementById("chat-input-portal");
  const messageElRef = useRef<HTMLDivElement | null>(null);
  const chatPostItemPlace = document.getElementById("chat-post-item-portal");
  const navigate = useNavigate();
  const [messages, setMessages] = useState<IMessage[]>(room.messages);
  const [typing, setTyping] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<IMessage>({
    text: "",
    senderId: userId,
    receiverId,
    roomId: room._id,
    createdAt: new Date(),
  });

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
      if (data.senderId == receiverId) {
        const { typing, userId: typingId } = data;
        const receiverIsTyping = userId !== typingId && typing;
        setTyping(receiverIsTyping);
      }
    });
  }, [userId, receiverId]);

  useEffect(() => {
    const messageEl = messageElRef.current;
    if (!messageEl) return;

    messageEl.scrollIntoView();
  }, [messages, typing, messageElRef.current]);

  useEffect(() => {
    const handleChatMessage = (data: IMessage) => {
      const senderIsMember = room.members.some(
        (member) => member === data.senderId
      );
      const receiverIsMember = room.members.some(
        (member) => member === receiverId
      );
      if (senderIsMember && receiverIsMember) {
        console.log("data", data);
        const updatedMessages = [...messages, data];
        setMessages(updatedMessages);
      }
    };

    socket().on("chat-message", handleChatMessage);

    return () => {
      socket().off("chat-message", handleChatMessage);
    };
  }, [messages, receiverId, room, userId]);

  function onSubmit() {
    if (!message || !chatInputRef.current?.value) return null;
    socket().emit("chat-message", message);
    if (chatInputRef.current) {
      chatInputRef.current.value = "";
    }
  }

  const handleChatInput = (e: any) => {
    setMessage({ ...message, text: e.target.value });
  };

  const navigateToPost = () => {
    navigate(`/post/${post._id}`);
  };

  const jaggedMessageListByDay = createJaggedArray(messages);

  const messageListWithFirst = jaggedMessageListByDay.map((sameDayMessages) => {
    return sameDayMessages.map((message, index) => ({
      ...message,
      firstOfDay: index === 0,
    }));
  });

  const messageList = messageListWithFirst.map((messageArray) =>
    messageArray.map((message) => (
      <Message key={message._id} message={message} />
    ))
  );

  return (
    <Box width="100%" alignItems="center">
      {chatPostItemPlace !== null &&
        createPortal(
          <ChatPostItem navigateToPost={navigateToPost} post={post} />,
          chatPostItemPlace
        )}
      <S.ChatContainer ref={messageElRef}>
        {messageList}
        {typing && <TypingAnimation />}
        <div ref={messageElRef}></div>
      </S.ChatContainer>
      {chatInputPlace !== null &&
        createPortal(
          <ChatInput
            chatInputRef={chatInputRef}
            handleChatInput={handleChatInput}
            onSubmit={onSubmit}
          />,
          chatInputPlace
        )}
    </Box>
  );
};

export default ChatRoom;

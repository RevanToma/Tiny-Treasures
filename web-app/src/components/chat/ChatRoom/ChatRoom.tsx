import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../../Sockets/Message.socket";
import Message from "../Message/Message";
import { IChatRoom, IMessage, Post } from "../../../types";
import * as S from "./styled";
import TypingAnimation from "../TypingAnimation/TypingAnimation";
import { FaPaperPlane } from "react-icons/fa";
import Box from "../../common/Box/Box";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

type Props = {
  room: IChatRoom;
  userId: string;
  receiverId: string;
  post: Post;
};

const chatInputPlace = document.getElementById("chat-input-portal");

const ChatRoom: React.FC<Props> = ({ post, room, userId, receiverId = "" }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<IMessage[]>(room.messages);
  const [typing, setTyping] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<IMessage>({
    text: "",
    senderId: userId,
    receiverId,
    roomId: room._id,
    postId: post._id,
  });

  console.log("place", chatInputPlace);

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
    socket().on("chat-message", (data) => {
      const senderIsMember = room.members.some(
        (member) => member === data.senderId
      );
      const receiverIsMember = room.members.some(
        (member) => member === receiverId
      );
      if (senderIsMember && receiverIsMember) {
        const updateMsg = [...messages, data];
        setMessages(updateMsg);
      }
    });
  }, [messages, receiverId, room, userId]);

  function onSubmit(event: any) {
    console.log("submitted?");
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

  return (
    <Box>
      <Box alignItems="center" onClick={navigateToPost}>
        {post.title}
      </Box>
      <S.ChatContainer>
        {messages.map((message) => (
          <>
            <Message key={message._id} message={message} />
          </>
        ))}
        {typing && <TypingAnimation />}
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

type ChatInputProps = {
  onSubmit: (event: MouseEvent) => void;
  handleChatInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  chatInputRef: React.RefObject<HTMLInputElement>;
};

const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  handleChatInput,
  chatInputRef,
}) => {
  return (
    <Box flexDirection="row" gap="10px" justifyContent="space-between">
      <S.MessageInputForm>
        <S.MessageInput
          ref={chatInputRef}
          placeholder="Message"
          onChange={handleChatInput}
        />
      </S.MessageInputForm>
      <Box justifyContent="center" alignItems="center">
        <FaPaperPlane onClick={onSubmit} />
      </Box>
    </Box>
  );
};

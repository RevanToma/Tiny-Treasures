import React, { useState } from "react";
import { IChatRoom } from "../../../types";
import { useChats } from "../../../hooks/useChats";
import * as S from "./styled";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { setCurrentChatRoom } from "../../../store/user/userSlice";
import Spinner from "../../common/spinner/spinner.component";
import ChatListCard from "./ChatListCard/ChatListCard";
import { useNavigate } from "react-router-dom";

type ChatRoomListProps = {
  userId: string;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: chats, isLoading, error } = useChats(userId);

  if (isLoading && userId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!chats) return <h1>No messages here!</h1>;

  const handleSwitchChat = (room: IChatRoom) => {
    const postId = room.messages[room.messages.length - 1].postId;
    dispatch(setCurrentChatRoom(room));
    if (postId) {
      navigate(`/chat/${room._id}/${postId}`);
    }
  };

  const chatList = chats.map((room) => {
    const lastMessage = room.messages[room.messages.length - 1]?.text;
    const receiverId = room.members.find((member) => member !== userId);

    if (!receiverId) return null;

    return (
      <ChatListCard
        handleSwitchChat={handleSwitchChat}
        lastMessage={lastMessage}
        room={room}
      />
    );
  });

  return <S.ChatListContainer>{chatList}</S.ChatListContainer>;
};

export default ChatRoomList;

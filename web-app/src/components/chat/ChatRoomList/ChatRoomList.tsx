import React, { useState } from "react";
import { IChatRoom } from "../../../types";
import ChatRoom from "../ChatRoom/ChatRoom";
import { useChats } from "../../../hooks/useChats";

import { useAppDispatch } from "../../../hooks/useDispatch";
import { setCurrentChatRoom } from "../../../store/user/userSlice";
import Spinner from "../../common/spinner/spinner.component";
import Box from "../../common/Box/Box";
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
  if (!chats) return null;

  const handleSwitchChat = (room: IChatRoom) => {
    console.log(room.messages);
    dispatch(setCurrentChatRoom(room));
    navigate(
      `/chat/${room._id}/${room.messages[room.messages.length - 1].postId}`
    );
  };

  const chatList = chats.map((room) => {
    const lastMessage = room.messages[room.messages.length - 1]?.text;
    const lastSender = room.messages[room.messages.length - 1]?.sentByMe
      ? "Received"
      : "You";

    return (
      <Box
        gap="10px"
        flexDirection="row"
        key={room._id}
        onClick={() => handleSwitchChat(room)}
      >
        <p>{room._id}</p>
        <h4>{lastMessage && `${lastSender} ${lastMessage}`}</h4>
      </Box>
    );
  });

  return <>{chatList}</>;
};

export default ChatRoomList;

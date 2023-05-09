import React, { useState } from "react";
import { IChatRoom } from "../../../types";
import ChatRoom from "../ChatRoom/ChatRoom";
import { useChats } from "../../../hooks/useChats";

import { useAppDispatch } from "../../../hooks/useDispatch";
import { setCurrentChatRoom } from "../../../store/user/userSlice";
import Spinner from "../../common/spinner/spinner.component";
import Box from "../../common/Box/Box";

type ChatRoomListProps = {
  userId: string;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ userId }) => {
  const [currentRoom, setCurrentRoom] = useState<IChatRoom>();
  const [receiverId, setReceiverId] = useState<undefined | string>();
  const dispatch = useAppDispatch();

  const { data: chats, isLoading, error } = useChats(userId);

  if (isLoading && userId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!chats) return null;

  console.log(chats);
  const handleSwitchChat = (room: IChatRoom) => {
    const switchedReceiverId = room.members.find((member) => member !== userId);
    setReceiverId(switchedReceiverId);
    dispatch(setCurrentChatRoom(room));
    setCurrentRoom(room);
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

  return (
    <>
      {chatList}
      {currentRoom && (
        <ChatRoom
          key={currentRoom._id}
          receiverId={receiverId}
          userId={userId}
          room={currentRoom}
        ></ChatRoom>
      )}
    </>
  );
};

export default ChatRoomList;

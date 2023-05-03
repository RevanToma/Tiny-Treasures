import React, { useState } from "react";
import { IChatRoom } from "../../../types";
import ChatRoom from "../ChatRoom/ChatRoom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useChats } from "../../../hooks/useChats";
import { socket } from "../../../Sockets/Message.socket";

type ChatRoomListProps = {
  userId: string;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ userId }) => {
  const [currentRoom, setCurrentRoom] = useState<IChatRoom>();
  const [receiverId, setReceiverId] = useState<undefined | string>();
  const queryClient = useQueryClient();

  const { data: chats, isLoading, error } = useChats(userId);

  if (isLoading && userId) return <h1>is loading...</h1>;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!chats) return null;

  const handleSwitchChat = (room: IChatRoom) => {
    const switchedReceiverId = room.members.find((member) => member !== userId);
    setReceiverId(switchedReceiverId);
    setCurrentRoom(room);
    socket.emit("create-chat", { userId, receiverId: switchedReceiverId });
    console.log(room._id);
  };

  return (
    <div>
      {chats.map((room) => {
        return (
          <div onClick={() => handleSwitchChat(room)}>ROOMS: {room._id}</div>
        );
      })}
      {currentRoom && (
        <ChatRoom
          receiverId={receiverId}
          userId={userId}
          room={currentRoom}
        ></ChatRoom>
      )}
    </div>
  );
};

export default ChatRoomList;

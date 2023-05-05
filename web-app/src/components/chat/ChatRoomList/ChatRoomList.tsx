import React, { useState, useEffect } from "react";
import { IChatRoom } from "../../../types";
import ChatRoom from "../ChatRoom/ChatRoom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useChats } from "../../../hooks/useChats";
import { socket, Socket } from "../../../Sockets/Message.socket";

type ChatRoomListProps = {
  userId: string;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ userId }) => {
  const [currentRoom, setCurrentRoom] = useState<IChatRoom>();
  const [receiverId, setReceiverId] = useState<undefined | string>();

  const { data: chats, isLoading, error } = useChats(userId);

  if (isLoading && userId) return <h1>is loading...</h1>;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!chats) return null;

  console.log(chats);
  const handleSwitchChat = (room: IChatRoom) => {
    const switchedReceiverId = room.members.find((member) => member !== userId);
    setReceiverId(switchedReceiverId);
    setCurrentRoom(room);
    socket().emit("create-chat", { userId, receiverId: switchedReceiverId });
    console.log(room._id);
  };

  return (
    <div>
      {chats.map((room) => {
        return (
          <div key={room._id} onClick={() => handleSwitchChat(room)}>
            ROOMS: {room._id}
          </div>
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

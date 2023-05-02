import React, { useState } from "react";
import { IChatRoom } from "../../../types";
import ChatRoom from "../ChatRoom/ChatRoom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchChats } from "../../../api/requests";
import { socket } from "../../../Sockets/Message.socket";

type ChatRoomListProps = {
  userId: string;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ userId }) => {
  const [currentRoom, setCurrentRoom] = useState<IChatRoom>();
  const queryClient = useQueryClient();

  const {
    data: chats,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchChats(userId),
    queryKey: [fetchChats.name],
    enabled: !!userId,
    onSuccess: () => console.log("fetched"),
  });

  if (isLoading) return <h1>is loading...</h1>;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!chats) return null;

  const handleSwitchChat = (room: IChatRoom) => {
    const receiverId = room.members.find((member) => member !== userId);

    queryClient.invalidateQueries({
      queryKey: [fetchChats.name],
    });

    socket.emit("create-chat", { userId, receiverId });
    setCurrentRoom(room);
  };

  return (
    <div>
      {chats.map((room) => {
        return <div onClick={() => handleSwitchChat(room)}>{room._id}</div>;
      })}
      {currentRoom && (
        <ChatRoom
          receiverId={currentRoom.members.find((member) => member !== userId)}
          userId={userId}
          room={currentRoom}
        ></ChatRoom>
      )}
    </div>
  );
};

export default ChatRoomList;

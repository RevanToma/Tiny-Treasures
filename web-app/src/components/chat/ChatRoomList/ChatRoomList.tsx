import React, { useState, useEffect } from "react";
import { IChatRoom, IMessage } from "../../../types";
import ChatRoom from "../ChatRoom/ChatRoom";
import { useChats } from "../../../hooks/useChats";
import { socket, Socket } from "../../../Sockets/Message.socket";
import { useQueryClient } from "@tanstack/react-query";
import { fetchChats } from "../../../api/requests";

type ChatRoomListProps = {
  userId: string;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ userId }) => {
  const [currentRoom, setCurrentRoom] = useState<IChatRoom>();
  const [receiverId, setReceiverId] = useState<undefined | string>();

  const queryClient = useQueryClient();

  const { data: chats, isLoading, error } = useChats(userId);

  useEffect(() => {
    socket().on("chat-message", (data: IMessage) => {
      console.log(data);
    });
  }, [receiverId, currentRoom, userId]);

  useEffect(() => {
    socket().on("chat-message", (data: IMessage) => {
      if (data.roomId !== currentRoom || !currentRoom) {
        queryClient.invalidateQueries([fetchChats.name]);
      }
    });
  }, [receiverId, currentRoom, userId, queryClient]);

  if (isLoading && userId) return <h1>is loading...</h1>;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!chats) return null;

  console.log(chats);
  const handleSwitchChat = (room: IChatRoom) => {
    const switchedReceiverId = room.members.find((member) => member !== userId);
    setReceiverId(switchedReceiverId);
    setCurrentRoom(room);
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
          key={currentRoom._id}
          receiverId={receiverId}
          userId={userId}
          room={currentRoom}
        ></ChatRoom>
      )}
    </div>
  );
};

export default ChatRoomList;

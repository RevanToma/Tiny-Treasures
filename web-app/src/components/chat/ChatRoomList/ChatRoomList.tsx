import React from "react";
import { IChatRoom } from "../../../types";
import ChatRoom from "../ChatRoom/ChatRoom";

type ChatRoomListProps = {
  chatRooms: IChatRoom[];
  userId: string;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRooms, userId }) => {
  console.log(chatRooms);
  return (
    <div>
      {chatRooms.map((room) => {
        return <ChatRoom userId={userId} room={room}></ChatRoom>;
      })}
    </div>
  );
};

export default ChatRoomList;

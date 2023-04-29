import React from "react";
import { IChatRoom } from "../../../types";
import ChatRoom from "../ChatRoom/ChatRoom";

type ChatRoomListProps = {
  chatRooms: IChatRoom[];
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRooms }) => {
  return (
    <div>
      {chatRooms.map((room) => {
        return <ChatRoom chatMembers={room.members}></ChatRoom>;
      })}
    </div>
  );
};

export default ChatRoomList;

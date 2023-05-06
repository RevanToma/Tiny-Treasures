import React, { useState } from "react";
import { IChatRoom } from "../../../types";
import ChatRoom from "../ChatRoom/ChatRoom";
import { useChats } from "../../../hooks/useChats";

import { useAppDispatch } from "../../../hooks/useDispatch";
import { setCurrentChatRoom } from "../../../store/user/userSlice";
import Spinner from "../../common/spinner/spinner.component";

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

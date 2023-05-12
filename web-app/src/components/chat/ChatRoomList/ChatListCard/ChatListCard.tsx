import React from "react";
import Box from "../../../common/Box/Box";
import { IChatRoom } from "../../../../types";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../store/user/userSelectors";

type ChatListCardProps = {
  room: IChatRoom;
  handleSwitchChat: (room: IChatRoom) => void;
  lastMessage: string;
  lastSenderNotMeId?: string | undefined;
};

const ChatListCard: React.FC<ChatListCardProps> = ({
  room,
  handleSwitchChat,
  lastMessage,
  lastSenderNotMeId,
}) => {
  const user = useSelector(selectUser);
  const userName = user.name;

  return (
    <Box
      gap="10px"
      flexDirection="row"
      key={room._id}
      onClick={() => handleSwitchChat(room)}
    >
      <p>{room._id}</p>
      <h4>
        {lastSenderNotMeId
          ? `other ${lastMessage}`
          : `${userName} ${lastMessage}`}
      </h4>
    </Box>
  );
};

export default ChatListCard;

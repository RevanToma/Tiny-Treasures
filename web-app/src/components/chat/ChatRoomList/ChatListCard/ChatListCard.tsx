import React from "react";
import Box from "../../../common/Box/Box";
import { IChatRoom } from "../../../../types";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../store/user/userSelectors";
import { useUserName } from "../../../../hooks/useUserName";

type ChatListCardProps = {
  room: IChatRoom;
  handleSwitchChat: (room: IChatRoom) => void;
  lastMessage: string;
  lastSenderNotMeId?: string | undefined;
  receiverId: string;
};

const ChatListCard: React.FC<ChatListCardProps> = ({
  room,
  handleSwitchChat,
  lastMessage,
  lastSenderNotMeId,
  receiverId,
}) => {
  const user = useSelector(selectUser);
  const userName = user.name;

  const { data: receiverUserName } = useUserName(receiverId);

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
          ? `${receiverUserName} ${lastMessage}`
          : `${userName} ${lastMessage}`}
      </h4>
    </Box>
  );
};

export default ChatListCard;

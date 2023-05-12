import React from "react";
import Box from "../../../common/Box/Box";
import { IChatRoom } from "../../../../types";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../store/user/userSelectors";
import * as S from "./styled";
import {
  getFullDate,
  getHoursAndMinutes,
} from "../../../../utils/helperfunctions";

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

  const lastMessageDate = room.messages[room.messages.length - 1]?.createdAt;
  if (!lastMessageDate) return null;
  const dateString = Date.parse(lastMessageDate.toString());
  const messageDay = new Date(dateString).getDay();
  const todaysDay = new Date().getDay();
  const isToday = messageDay === todaysDay;

  return (
    <S.Card key={room._id} onClick={() => handleSwitchChat(room)}>
      <img alt="" />
      <Box width="100%" alignItems="flex-start" justifyContent="center">
        <p>{room._id}</p>
        <h2>{lastSenderNotMeId ? "other" : userName}</h2>
        <Box width="100%" flexDirection="row" justifyContent="space-between">
          <h3>{lastMessage}</h3>
          <h5>
            {isToday
              ? getHoursAndMinutes(dateString)
              : `${getFullDate(dateString)} ${getHoursAndMinutes(dateString)}`}
          </h5>
        </Box>
      </Box>
    </S.Card>
  );
};

export default ChatListCard;

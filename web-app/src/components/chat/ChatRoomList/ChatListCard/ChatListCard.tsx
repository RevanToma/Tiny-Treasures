import React from 'react';
import Box from '../../../common/Box/Box';
import { IChatRoom, IPost } from '../../../../types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/user/userSelectors';
import * as S from './styled';
import {
  getFullDate,
  getHoursAndMinutes,
} from '../../../../utils/helperfunctions';

type ChatListCardProps = {
  room: IChatRoom;
  handleSwitchChat: (room: IChatRoom) => void;
  lastMessage: string;
  lastSenderNotMeId?: string | undefined;
  post: IPost;
};

const ChatListCard: React.FC<ChatListCardProps> = ({
  room,
  handleSwitchChat,
  lastMessage,
  lastSenderNotMeId,
  post,
}) => {
  const user = useSelector(selectUser);
  const userName = user.name;

  const lastMessageDate = room.messages[room.messages.length - 1]?.createdAt;

  const getDateText = (lastMessage: Date) => {
    const dateString = Date.parse(lastMessage.toString());
    const messageDay = new Date(dateString).getDay();
    const todaysDay = new Date().getDay();
    const isToday = messageDay === todaysDay;

    let dateText;

    if (isToday) {
      dateText = getHoursAndMinutes(dateString);
    } else {
      dateText = `${getFullDate(dateString)} ${getHoursAndMinutes(dateString)}`;
    }

    return dateText;
  };

  return (
    <S.Card key={room._id} onClick={() => handleSwitchChat(room)}>
      <S.Image src={post.images[0]} />
      <Box width="100%" alignItems="flex-start" justifyContent="center">
        <p>{room._id}</p>
        <Box width="100%" gap="10px">
          <Box width="100%" flexDirection="row" justifyContent="space-between">
            <h3>{lastSenderNotMeId ? 'other' : userName}</h3>
            <p>{lastMessageDate && getDateText(lastMessageDate)}</p>
          </Box>
          <Box width="100%" flexDirection="row" justifyContent="flex-start">
            {lastMessage}
          </Box>
        </Box>
      </Box>
    </S.Card>
  );
};

export default ChatListCard;

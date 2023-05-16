import React from "react";
import { IMessage } from "../../../types";
import * as S from "./styled";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/userSelectors";
import Box from "../../common/Box/Box";
import {
  getFullDate,
  getHoursAndMinutes,
} from "../../../utils/helperfunctions";

type MessageProps = {
  message: IMessage;
};

const Message: React.FC<MessageProps> = ({
  message: { text, _id, senderId, createdAt, firstOfDay },
}) => {
  const user = useSelector(selectUser);
  if (!createdAt) return null;

  const dateString: number = Date.parse(createdAt.toString());

  const messageDay = new Date(dateString).getDay();
  const todaysDay = new Date().getDay();
  const messageSentTodayAndFirst = messageDay === todaysDay && firstOfDay;

  const firstDateOfDay = firstOfDay ? getFullDate(dateString) : "";

  return (
    <Box width="100%">
      <S.DateText>
        {messageSentTodayAndFirst ? "Today" : firstDateOfDay}
      </S.DateText>
      <S.MessageContainer sentByMe={user._id === senderId} key={_id}>
        <S.Text>{text}</S.Text>
        <S.Time>{getHoursAndMinutes(dateString)}</S.Time>
      </S.MessageContainer>
    </Box>
  );
};

export default Message;

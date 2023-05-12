import React from "react";
import { IMessage } from "../../../types";
import * as S from "./styled";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/userSelectors";
import Box from "../../common/Box/Box";

type MessageProps = {
  message: IMessage;
};

const Message: React.FC<MessageProps> = ({
  message: { text, _id, senderId, createdAt, firstOfDay },
}) => {
  const user = useSelector(selectUser);
  if (!createdAt) return null;

  const dateString: number = Date.parse(createdAt.toString());

  const getFullDate = function (unixTime: number) {
    const t = new Date(unixTime);
    return `${t.getFullYear()}-${(t.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
  };

  const getHoursAndMinutes = (unixTime: number): string => {
    const t = new Date(unixTime);
    const currentHour = t.getHours();
    const currentMinute = t.getMinutes();

    const time = `${currentHour}:${currentMinute}`;
    return time;
  };

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

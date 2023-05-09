import React from "react";
import { IMessage } from "../../../types";
import * as S from "./styled";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/userSelectors";

type MessageProps = {
  message: IMessage;
};

const Message: React.FC<MessageProps> = ({
  message: { text, _id, senderId },
}) => {
  const user = useSelector(selectUser);

  return (
    <S.MessageContainer sentByMe={user._id === senderId} key={_id}>
      {text}
    </S.MessageContainer>
  );
};

export default Message;

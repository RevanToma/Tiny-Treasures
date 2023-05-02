import React from "react";
import { IMessage } from "../../../types";
import * as S from "./styled";

type MessageProps = {
  message: IMessage;
};

const Message: React.FC<MessageProps> = ({
  message: { text, sentByMe, _id },
}) => {
  return (
    <S.MessageContainer sentByMe={sentByMe} key={_id}>
      {text},
    </S.MessageContainer>
  );
};

export default Message;

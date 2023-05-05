import React from "react";
import { IMessage } from "../../../types";
import * as S from "./styled";

type MessageProps = {
  message: IMessage;
  ref?: React.RefObject<HTMLDivElement> | null;
};

const Message: React.FC<MessageProps> = ({
  ref,
  message: { text, sentByMe, _id },
}) => {
  return (
    <S.MessageContainer ref={ref} sentByMe={sentByMe} key={_id}>
      {text},
    </S.MessageContainer>
  );
};

export default Message;

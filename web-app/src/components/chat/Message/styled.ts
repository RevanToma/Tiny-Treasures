import styled from "styled-components";
import { theme } from "../../../styles/themes";

type MessageContainerProps = {
  sentByMe: boolean | undefined;
};

export const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ sentByMe }) =>
    sentByMe ? theme.color.primary : theme.color.grayLight2};
  color: ${({ sentByMe }) => (sentByMe ? "" : "#000000")};
  align-self: ${({ sentByMe }) => (sentByMe ? "end" : "start")};
  box-shadow: ${theme.shadow};
  padding: 10px;
  margin: 10px;
  gap: 5px;
  word-wrap: break-word;
  font-family: Arial, Helvetica, sans-serifs;
  font-size: 12px;
  color: white;
  max-width: 150px;
`;

export const DateText = styled.p`
  text-align: center;
  color: #403f3f;
`;

export const Time = styled.div`
  align-self: end;
  color: #f0eaea;
  font: 8px;
`;
export const Text = styled.div``;

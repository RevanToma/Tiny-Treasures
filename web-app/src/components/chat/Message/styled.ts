import styled from "styled-components";
import { theme } from "../../../styles/themes";

type MessageProps = {
  sentByMe: boolean | undefined;
};

export const MessageContainer = styled.div<MessageProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 10px;
  background-color: ${({ sentByMe }) =>
    sentByMe ? theme.color.primary : theme.color.grayLight2};
  color: ${({ sentByMe }) => (sentByMe ? "white" : "#000000")};
  align-self: ${({ sentByMe }) => (sentByMe ? "end" : "start")};
  box-shadow: ${theme.shadow};
  padding: 10px;
  margin: 10px;
  gap: 5px;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  font-family: Arial, Helvetica, sans-serifs;
  font-size: 12px;
  max-width: 220px;
`;

export const DateText = styled.p`
  text-align: center;
  color: #403f3f;
`;

export const Time = styled.div<MessageProps>`
  align-self: end;
  color: ${({ sentByMe }) => (sentByMe ? "white" : "#000000")};
  font: 8px;
`;
export const Text = styled.div``;

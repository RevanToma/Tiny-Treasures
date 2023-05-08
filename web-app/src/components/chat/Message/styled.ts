import styled from "styled-components";
import { theme } from "../../../styles/themes";

type MessageContainerProps = {
  sentByMe: boolean | undefined;
};

export const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ sentByMe }) =>
    sentByMe ? theme.color.primary : theme.color.grayLight2};
  color: ${({ sentByMe }) => (sentByMe ? "" : "#000000")};
  align-self: ${({ sentByMe }) => (sentByMe ? "end" : "start")};
  box-shadow: ${theme.shadow};
  padding: 10px;
  margin: 10px;
  word-wrap: break-word;
  font-family: Arial, Helvetica, sans-serifs;
  font-size: 12px;
`;

import styled from "styled-components";

type MessageContainerProps = {
  sentByMe: boolean | undefined;
};
export const MessageContainer = styled.div<MessageContainerProps>`
  border-radius: 10px;
  background-color: ${({ sentByMe }) => (sentByMe ? "#1982FC" : "#3f3f3f")};
  width: fit-content;
  align-self: ${({ sentByMe }) => (sentByMe ? "end" : "start")};
  color: white;
  padding: 10px;
  margin: 10px;
  max-width: 200px;
  word-wrap: break-word;
  font-family: Arial, Helvetica, sans-serifs;
  font-size: 12px;
`;

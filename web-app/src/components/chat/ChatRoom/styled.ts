import styled from "styled-components";
import { theme } from "../../../styles/themes";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  color: white;
  gap: 5px;
  align-items: center;
  overflow-y: scroll;
`;

export const MessageInputForm = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 10px;
`;

export const MessageInput = styled.input`
  width: 100%;
  box-shadow: ${theme.shadow};
  border: 1px solid gray;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  background-color: #d9d6d6;

  &:hover {
    background-color: #d7bdbd;
  }
`;

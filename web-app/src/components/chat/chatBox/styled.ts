import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #161616;
  padding: 10px;
  color: white;
  gap: 15px;
  align-items: center;
  overflow-y: scroll;
  max-height: 400px;
`;

export const MessageInputForm = styled.form`
  display: flex;
  width: 100%;
  gap: 10px;
  margin: 10px;
`;

export const MessageInput = styled.input`
  width: 100%;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.button`
  padding: 10px;
  border-radius: 10px;
`;

import styled from "styled-components";

export const ChatContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #161616;
  padding: 15px;
  color: white;
  gap: 15px;
  align-items: center;
  overflow-y: scroll;
  height: 400px;
`;

export const MessageInputForm = styled.form`
  position: absolute;
  bottom: 10px;
  display: flex;
  width: 100%;
  gap: 10px;
`;

export const MessageInput = styled.input`
  bottom: 0;
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

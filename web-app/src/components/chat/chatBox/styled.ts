import styled from "styled-components";

export const ChatRoomContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  flex-direction: column;
`;

export const ChatContainer = styled.div`
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
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px;
  gap: 10px;
`;

export const MessageInput = styled.input`
  bottom: 0;
  width: 100%;
  border-radius: 10px;
  border: none;
  padding: 10px;
  background-color: #bdd0df;
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

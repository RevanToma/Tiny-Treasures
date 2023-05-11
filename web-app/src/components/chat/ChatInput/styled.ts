import styled from "styled-components";
import { theme } from "../../../styles/themes";

export const MessageInputForm = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  gap: 10px;
`;

export const MessageInput = styled.input`
  box-shadow: ${theme.shadow};
  height: 50px;
  font-size: 16px;
  border: 1px solid lightgray;
  width: 100%;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

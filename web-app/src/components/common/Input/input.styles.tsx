import styled from "styled-components";
import { theme } from "../../../styles/themes";

export const StyledInput = styled.input`
  width: 100%;
  font-size: 1em;
  border-radius: ${theme.radius.button};
  border: 1px solid #b4b4b4;
  padding: 7.5px;
  cursor: text;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

`;

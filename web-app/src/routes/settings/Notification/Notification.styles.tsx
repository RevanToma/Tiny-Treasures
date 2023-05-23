import styled from "styled-components";
import { theme } from "../../../styles/themes";

export const CheckBoxDiv = styled.div`
  display: flex;
  margin: 1rem 0rem;
  gap: 2rem;

  p {
    ${theme.type.body}
  }
`;

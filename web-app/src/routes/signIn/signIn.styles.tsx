import styled from "styled-components";

import { StyledButton } from "../../components/common/Button/button.styles";

export const TextContainer = styled.div`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  margin: 1.5rem;
  line-height: 21.7px;

  h5 {
    font-size: 1.6rem;
  }

  &:nth-child(3) {
    margin: 1rem;
  }
`;

export const GoogleButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
  padding: 1.5rem;
`;

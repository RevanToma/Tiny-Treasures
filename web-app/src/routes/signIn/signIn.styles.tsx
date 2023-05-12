import styled from "styled-components";
import Button from "../../components/common/Button/Button.component";
import { StyledButton } from "../../components/common/Button/button.styles";

export const TextContainer = styled.div`
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  margin: 2.4rem;

  &:nth-child(3) {
    margin: 1rem;
  }
`;

export const GoogleButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
`;

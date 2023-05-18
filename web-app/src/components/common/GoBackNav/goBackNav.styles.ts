import styled from "styled-components";
import { theme } from "../../../styles/themes";

export const Title = styled.h1`
  text-align: center;
  ${theme.type.h6}
  color: ${({ color }) => (color ? color : "")}
`;

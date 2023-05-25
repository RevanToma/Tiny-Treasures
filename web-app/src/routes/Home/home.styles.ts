import styled from "styled-components";
import { theme } from "../../styles/themes";

export const HeroImg = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

export const HeroTextBox = styled.div`
  position: absolute;
  top: 3rem;
  left: 3rem;
  width: 20rem;
  color: #fff;

  h1 {
    ${theme.type.h5}
    line-height: 4rem;
    margin-bottom: 1.2rem;
  }
  p {
    ${theme.type.body}
    line-height: 2.2rem;
    width: 18rem;
  }
`;

export const Divider = styled.div`
  content: "";
  font-size: 1.6rem;
  width: 100%;
  margin-top: 2.4rem;
  border-top: 1px solid #aaa;
`;

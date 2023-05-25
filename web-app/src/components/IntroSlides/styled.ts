import styled, { css } from "styled-components";
import Box from "../common/Box/Box";
import { theme } from "../../styles/themes";

type Props = {
  current: boolean;
};

export const Slide = styled(Box)<Props>`
  gap: 30px;
  width: 300px;
  height: 400px;
  text-align: center;
  display: ${({ current }) => !current && "none"};
`;

export const SlideContainer = styled(Box)`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 25px;
`;

type FirstNavBtnProps = {
  isFirst: boolean;
};

export const FirstNavBtn = styled.div<FirstNavBtnProps>`
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadow};
  padding: 15px;
  border-radius: 50%;
  gap: 20px;

  ${({ isFirst }) =>
    !isFirst &&
    css`
      &:hover {
        background-color: #eae9e9;
        cursor: pointer;
      }
    `}
`;

type SecondNavBtnProps = {
  isLast: boolean;
};

export const SecondNavBtn = styled(Box)<SecondNavBtnProps>`
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadow};
  padding: 20px;
  border-radius: 50%;
  gap: 20px;

  ${({ isLast }) =>
    !isLast &&
    css`
      &:hover {
        background-color: #eae9e9;
        cursor: pointer;
      }
    `}
`;

export const Header = styled.h1`
  font-family: "Josefin Sans";
  font-size: 3rem;
  font-weight: 700;
  color: #474747;
  height: 50px;
`;

export const SubHeader = styled.p`
  font-family: "Poppins";
  font-size: 2.5rem;

  color: #474747;
  height: 50px;
`;

export const Description = styled.p`
  ${theme.type.h6}
  font-size: 14px;
`;

type DotProps = {
  current: boolean;
};

export const Dot = styled.div<DotProps>`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${({ current }) => (current ? "#2b2a2a" : "#9f9f9f")};
`;

export const Image = styled.img`
  width: auto;
  height: 140px;
`;

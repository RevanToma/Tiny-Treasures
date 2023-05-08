import styled from "styled-components";

type ImageProps = {
  current: boolean;
};

export const Image = styled.img<ImageProps>`
  width: auto;
  height: 100px;
  display: ${({ current }) => (current ? "block" : "none")};
`;

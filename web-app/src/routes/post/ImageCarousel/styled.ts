import styled from "styled-components";

type ImageProps = {
  current: boolean;
};

export const Image = styled.img<ImageProps>`
  width: auto;
  height: 200px;
  display: ${({ current }) => (current ? "block" : "none")};
`;

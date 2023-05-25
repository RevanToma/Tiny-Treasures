import styled from "styled-components";
import Box from "../Box/Box";

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ImageBox = styled.div`
  object-fit: contain;

  img {
    width: 100%;
  }
`;

export const BoxWithChildren = styled(Box)`
  p {
    font-size: 1.3rem;
    weight: 400;
    line-height: 19.5px;
  }
  p {
    /* white-space: normal; */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: fit-content;
  }
`;

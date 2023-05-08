import styled from 'styled-components';
import Box from '../Box/Box';

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
  h2 {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 600;
  }
  p {
    /* white-space: normal; */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 4rem;
  }
`;

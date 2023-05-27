import styled from 'styled-components';
import Box from '../Box/Box';
import { theme } from '../../../styles/themes';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ImageBox = styled.div`
  width: 100%;

  img {
    object-fit: cover;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${theme.radius.image};
  }
`;

export const Wrapper = styled(Box)`
  position: relative;

  h2 {
    ${theme.type.bodyBold}
    /* text-align: center; */
    margin-bottom: 1.6rem;
  }
  p {
    ${theme.type.navbar}
  }
  h2 {
    /* white-space: normal; */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: fit-content;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1.5rem;
  }
`;

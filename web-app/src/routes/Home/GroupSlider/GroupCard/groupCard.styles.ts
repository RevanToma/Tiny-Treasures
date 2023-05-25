import styled from 'styled-components';
import { theme } from '../../../../styles/themes';
import Box from '../../../../components/common/Box/Box';

interface ImageBoxProps {
  url: string;
}

export const Wrapper = styled(Box)`
  p {
    ${theme.type.body}
  }
`;

export const ImageBox = styled.div<ImageBoxProps>`
  width: 100%;
  height: 9.5rem;
  object-fit: cover;
  justify-content: center;
  align-items: center;
  background-image: ${({ url }) => `url(${url});`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: ${theme.radius.image} ${theme.radius.image} 0 0;
`;

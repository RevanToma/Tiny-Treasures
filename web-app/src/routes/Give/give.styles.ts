import styled from 'styled-components';
import { theme } from '../../styles/themes';
import { FaTimes } from 'react-icons/fa';
import Box from '../../components/common/Box/Box';

export const Wrapper = styled(Box)`
  h1 {
    ${theme.type.h5}
    color: #555;
  }
`;

export const StyledRemovImgIcon = styled(FaTimes)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

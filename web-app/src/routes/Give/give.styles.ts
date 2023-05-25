import styled from 'styled-components';
import { theme } from '../../styles/themes';
import { FaTimes } from 'react-icons/fa';
import Box from '../../components/common/Box/Box';

export const Wrapper = styled(Box)`
  .remove-icon {
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 2.4rem;
    width: 2.4rem;

    color: ${theme.color.black};
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 2rem;
    font-weight: 700;

    border-radius: 0 8px 0 4px;
  }
`;

export const StyledRemovImgIcon = styled(FaTimes)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

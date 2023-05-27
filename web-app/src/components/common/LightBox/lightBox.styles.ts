import styled, { css } from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { theme } from '../../../styles/themes';

const iconsStyles = css`
  position: absolute;
  top: 50%;

  height: 6rem;
  width: 6rem;
  background-color: #fff;
  border-radius: 50%;
  padding: 0.6rem;
  box-shadow: ${theme.shadow};
`;

export const StyledArrowBack = styled(IoIosArrowBack)`
  ${iconsStyles}
  left: 0;
  transform: translate(-50%, -50%);
`;

export const StyledArrowForward = styled(IoIosArrowForward)`
  ${iconsStyles}
  right: 0;
  transform: translate(50%, -50%);
`;

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: ${theme.shadow};
  border-radius: ${theme.radius.image};
`;

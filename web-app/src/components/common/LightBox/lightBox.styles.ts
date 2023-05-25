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
  padding: 1.2rem;
  box-shadow: ${theme.shadow};
  color: ${theme.color.placeholderText};
  stroke: 10px;
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

interface IBReadcrumbsProps {
  active: boolean;
}

export const Breadcrumbs = styled.div<IBReadcrumbsProps>`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#323232' : '#c9c8c8')};
`;

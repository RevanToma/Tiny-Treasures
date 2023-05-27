import styled from 'styled-components';
import Box from '../../../components/common/Box/Box';
import { theme } from '../../../styles/themes';

interface IWrapperProps {
  active: boolean;
}

export const Wrapper = styled(Box)`
  ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 2rem;
  }
`;

export const NavItem = styled.li<IWrapperProps>`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: ${({ active }) =>
    active ? `3px solid ${theme.color.primaryBlue}` : 'none'};
`;

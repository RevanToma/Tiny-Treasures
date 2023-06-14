import styled from 'styled-components';
import { theme } from '../../../styles/themes';
import { StyledInput } from '../Input/input.styles';
import { FaCaretDown } from 'react-icons/fa';
import Box from '../Box/Box';

interface InputProps {
  open: boolean;
}

export const BoxExtended = styled(Box)<InputProps>`
  ul {
    position: absolute;
    top: 5rem;
    z-index: 10;

    display: flex;
    flex-direction: column;

    width: 100%;
    background-color: #fff;
    border-radius: 0 0 1rem 1rem;
    margin-top: -0.2rem;
    font-size: 2rem;

    li {
      display: flex;
      align-items: center;
      padding: 0 1.2rem;
      height: 4.5rem;
      ${theme.type.body}

      &:hover {
        background-color: ${theme.color.primary};
        color: #fff;
      }
    }
  }

  .hidden-input {
    position: absolute;
    opacity: 0;
    z-index: -10;
  }
`;

// TODO: Check this!!
export const Modal = styled.div`
  position: absolute;
  top: 5rem;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
`;

export const StyledSelect = styled(StyledInput)``;

export const StyledCaretDown = styled(FaCaretDown)`
  position: absolute;
  right: 1.6rem;
  top: 1rem;
`;

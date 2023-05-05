import styled from 'styled-components';

import { theme } from '../../../styles/themes';
import Box from '../Box/Box';

interface InputProps {
  open: boolean;
}

export const BoxExtended = styled(Box)<InputProps>`
  label {
    height: 3rem;
    color: ${theme.color.text};
    padding: 0.4rem;
  }

  input {
    width: 100%;
    padding: 1.2rem;

    background-color: #fff;
    color: ${theme.color.text};

    border: none;

    border-radius: ${({ open }) => (open ? ' 10px 10px 0 0' : '10px')};

    &:focus {
      outline: 2px solid ${theme.color.primary};
    }
  }

  ul {
    position: absolute;
    top: 8rem;
    z-index: 10;

    display: flex;
    flex-direction: column;

    width: 100%;
    background-color: #fff;
    border-radius: 0 0 1rem 1rem;
    margin-top: -0.2rem;

    /* border: 2px solid ${theme.color.primary}; */

    li {
      padding: 1.2rem;

      &:hover {
        background-color: ${theme.color.primary};
        color: #fff;
      }
    }
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

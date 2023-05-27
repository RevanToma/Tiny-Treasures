import styled, { css } from 'styled-components';
import { theme } from '../../../styles/themes';

const commonStyles = css`
  width: 100%;
  border-radius: ${theme.radius.button};
  border: 1px solid #b4b4b4;
  cursor: text;
  box-shadow: ${theme.shadow};
  ${theme.type.body}

  &:hover {
    outline: 1px solid ${theme.color.black};
  }

  &:active,
  &:focus {
    outline: 3px solid ${theme.color.primaryBlue};
  }
`;

export const StyledInput = styled.input`
  ${commonStyles}

  padding: 0 1rem;
  height: 4.5rem;
`;

export const StyledTextarea = styled.textarea`
  ${commonStyles}

  padding: 1rem;
  height: 18rem;
`;

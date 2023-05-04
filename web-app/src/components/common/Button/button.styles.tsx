import styled from 'styled-components';
import { ButtonType, buttons } from './button.types';

export const StyledButton = styled.button<{ buttonType: ButtonType }>`
  color: ${({ buttonType }) => buttons[buttonType].color || '#fff'};
  background: ${({ buttonType }) => buttons[buttonType].background};
  width: ${({ buttonType }) => buttons[buttonType].width || 'fit-content'};
  border: ${({ buttonType }) => buttons[buttonType].border || 'none'};

  &:hover {
    color: ${({ buttonType }) => buttons[buttonType].hoverColor || '#fff'};
    background: ${({ buttonType }) => buttons[buttonType].hoverBackground};
  }

  &:active {
    color: ${({ buttonType }) => buttons[buttonType].activeColor || '#fff'};
    background: ${({ buttonType }) => buttons[buttonType].activeBackground};
    border: ${({ buttonType }) =>
      buttons[buttonType].activeBackground || 'none'};
  }
`;

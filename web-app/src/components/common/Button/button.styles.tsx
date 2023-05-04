import styled, { css } from 'styled-components';
import { ButtonType } from './Button.component';
import { theme } from '../../../styles/themes';

const disabledState = css`
  color: ${theme.color.gray};
  background: ${theme.color.grayLight2};
`;

const primary = css`
  background-color: ${theme.color.primary};
  width: ${theme.button.width};
  &:hover {
    background-color: ${theme.color.primaryDark};
  }
  &:active {
    background-color: ${theme.color.primaryLight2};
  }
`;

const secondary = css`
  color: ${theme.color.text};
  background-color: ${theme.color.textGray};
  width: ${theme.button.width};
  border: 1px solid ${theme.color.gray};
  &:hover {
    background-color: ${theme.color.grayLight1};
  }
  &:active {
    background-color: ${theme.color.grayLight2};
    border: 1px solid ${theme.color.primary};
  }
`;

const message = css`
  background: ${theme.gradient.message1Primary};
  height: ${theme.button.height2};
  &:hover {
    background-color: ${theme.gradient.message1Dark};
  }
  &:active {
    background-color: ${theme.gradient.message1Light2};
  }
`;

const trade = css`
  background: ${theme.gradient.tradePrimary};
  &:hover {
    background-color: ${theme.gradient.tradeDark};
  }
  &:active {
    background-color: ${theme.gradient.tradeLight1};
  }
`;

const disabled = css`
  ${disabledState}
  &:hover {
    ${disabledState}
  }
  &:active {
    ${disabledState}
  }
`;

const pending = css`
  background: ${theme.gradient.pending};
  &:hover {
    background: ${theme.gradient.pending};
  }
  &:active {
    background: ${theme.gradient.pending};
  }
`;

const completed = css`
  background: ${theme.gradient.completed};
  &:hover {
    background: ${theme.gradient.completed};
  }
  &:active {
    background: ${theme.gradient.completed};
  }
`;

export const StyledButton = styled.button<{ buttonType: ButtonType }>`
  ${({ buttonType }) => {
    if (buttonType === ButtonType.Primary) return primary;
    if (buttonType === ButtonType.Secondary) return secondary;
    if (buttonType === ButtonType.Messaging) return message;
    if (buttonType === ButtonType.Trade) return trade;
    if (buttonType === ButtonType.Disabled) return disabled;
    if (buttonType === ButtonType.Pending) return pending;
    if (buttonType === ButtonType.Completed) return completed;
  }}
`;

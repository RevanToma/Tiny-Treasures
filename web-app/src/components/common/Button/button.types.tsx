import { theme } from '../../../styles/themes';

export enum ButtonType {
  Trade = 'trade',
  Message = 'message',
  Primary = 'primary',
  Secondary = 'secondary',
  Disabled = 'disabled',
  Pending = 'pending',
  Completed = 'completed',
}

interface Buttons {
  [key: string]: {
    color?: string; // default: #fff
    background: string;
    width?: string; // default: fit-content
    height?: string;
    border?: string; // default: none
    hoverBackground: string;
    hoverColor?: string;
    activeBackground: string;
    activeColor?: string;
    activeBorder?: string;
  };
}

export const buttons: Buttons = {
  primary: {
    background: theme.color.primary,
    width: theme.button.width,
    hoverBackground: theme.color.primaryDark,
    activeBackground: theme.color.primaryLight2,
  },
  secondary: {
    color: theme.color.text,
    background: theme.color.textGray,
    width: theme.button.width,
    border: `1px solid ${theme.color.gray}`,
    hoverBackground: theme.color.grayLight1,
    activeBackground: theme.color.grayLight2,
    activeBorder: ` 1px solid ${theme.color.primary}`,
  },
  message: {
    background: theme.gradient.message1Primary,
    height: theme.button.height2,
    hoverBackground: theme.color.grayLight1,
    activeBackground: theme.color.grayLight2,
    activeBorder: ` 1px solid ${theme.color.primary}`,
  },
  trade: {
    background: theme.gradient.tradePrimary,
    hoverBackground: theme.gradient.tradeDark,
    activeBackground: theme.gradient.tradeLight1,
  },
  disabled: {
    color: theme.color.gray,
    background: theme.color.grayLight2,
    hoverBackground: theme.color.grayLight2,
    hoverColor: theme.color.gray,
    activeBackground: theme.color.grayLight2,
    activeColor: theme.color.gray,
  },
  pending: {
    background: theme.gradient.pending,
    hoverBackground: theme.gradient.pending,
    activeBackground: theme.gradient.pending,
  },
  completed: {
    background: theme.gradient.completed,
    hoverBackground: theme.gradient.completed,
    activeBackground: theme.gradient.completed,
  },
};

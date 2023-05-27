import { theme } from '../../../styles/themes';

export enum ButtonType {
  Trade = 'trade',
  Message = 'message',
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  SmallGreen = 'smallGreen',
  SmallYellow = 'smallYellow',
  SmallBlue = 'smallBlue',
  Disabled = 'disabled',
  SmallTransparent = 'smallTransparent',
  Pending = 'pending',
  Completed = 'completed',
  SignIn = 'signIn',
  Google = 'google',
}

interface Buttons {
  [key: string]: {
    color?: string; // default: #fff
    background: string;
    width?: string; // default: fit-content
    height?: string; // default: 4.5rem
    border?: string; // default: none
    hoverBackground: string;
    hoverColor?: string; //  default: #fff
    activeBackground: string;
    activeColor?: string; //  default: #fff
    activeBorder?: string; //  default: none
    fontWeight?: string | number;
    fontSize?: string;
    fontFamily?: string;
  };
}

export const buttons: Buttons = {
  primary: {
    background: theme.color.primaryBlue,
    width: theme.button.widthLarge,
    hoverBackground: theme.color.darkBlueHover,
    activeBackground: theme.color.lighterBlueActive,
  },
  secondary: {
    background: theme.gradient.tradeDefault,
    width: theme.button.widthLarge,
    hoverBackground: theme.gradient.tradeDarkHover,
    activeBackground: theme.gradient.tradeLightActive,
  },
  tertiary: {
    color: theme.color.black,
    background: theme.color.primaryOffWhite,
    width: theme.button.widthLarge,
    border: `1px solid ${theme.color.primaryMediumGray}`,
    hoverBackground: theme.color.primaryMediumGray,
    activeBackground: theme.color.lighterGray,
  },
  smallGreen: {
    background: theme.gradient.tradeDefault,
    width: theme.button.widthSmall,
    hoverBackground: theme.gradient.tradeDarkHover,
    activeBackground: theme.gradient.tradeDarkHover,
  },
  smallYellow: {
    background: theme.gradient.tradePending,
    width: theme.button.widthSmall,
    hoverBackground: theme.gradient.tradePending,
    activeBackground: theme.gradient.tradePending,
  },
  smallBlue: {
    background: theme.color.primaryBlue,
    width: theme.button.widthSmall,
    hoverBackground: theme.color.darkBlueHover,
    activeBackground: theme.color.lighterBlueActive,
  },
  smallTransparent: {
    color: theme.color.primaryBlue,
    width: theme.button.widthSmall,
    background: theme.color.transparent,
    hoverBackground: theme.color.transparent,
    activeBackground: theme.color.transparent,
  },
  google: {
    color: theme.color.black,
    fontWeight: 400,
    fontSize: '1.6rem',
    fontFamily: 'Poppins',
    background: theme.color.primaryPureWhite,
    width: theme.button.widthLarge,
    hoverBackground: theme.color.grayLight1,
    activeBackground: theme.color.grayLight2,
  },
  signIn: {
    background: theme.color.logo,
    width: theme.button.widthLarge,
    hoverBackground: theme.color.signIn,
    activeBackground: theme.color.lighterBlueActive,
  },
  disabled: {
    color: '#aaa',
    background: theme.color.lighterGray,
    width: theme.button.widthLarge,
    hoverBackground: theme.color.lighterGray,
    activeBackground: theme.color.lighterGray,
  },
};

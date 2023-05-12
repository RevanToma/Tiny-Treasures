import { theme } from '../../../styles/themes';

export enum ButtonType {
  Trade = 'trade',
  Message = 'message',
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  SmallGreen = 'smallGreen',
  SmallYellow = 'smallYellow',
  SmallTransparent = 'smallTransparent',
  Disabled = 'disabled',
  Pending = 'pending',
  Completed = 'completed',
  ReviewOrSignIn = 'reviewOrSignIn',
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

// export const buttons: Buttons = {
//   primary: {
//     background: theme.color.primary,
//     width: theme.button.widthLarge,
//     hoverBackground: theme.color.primaryDark,
//     activeBackground: theme.color.primaryLight2,
//   },
//   secondary: {
//     color: theme.color.text,
//     background: theme.color.textGray,
//     width: theme.button.widthLarge,
//     border: `1px solid ${theme.color.gray}`,
//     hoverBackground: theme.color.grayLight1,
//     activeBackground: theme.color.grayLight2,
//     activeBorder: ` 1px solid ${theme.color.primary}`,
//   },
//   message: {
//     background: theme.gradient.message1Primary,
//     height: theme.button.height2,
//     hoverBackground: theme.color.grayLight1,
//     activeBackground: theme.color.grayLight2,
//     activeBorder: ` 1px solid ${theme.color.primary}`,
//   },
//   trade: {
//     background: theme.gradient.tradePrimary,
//     hoverBackground: theme.gradient.tradeDark,
//     activeBackground: theme.gradient.tradeLight1,
//   },
//   disabled: {
//     color: theme.color.gray,
//     background: theme.color.grayLight2,
//     hoverBackground: theme.color.grayLight2,
//     hoverColor: theme.color.gray,
//     activeBackground: theme.color.grayLight2,
//     activeColor: theme.color.gray,
//   },
//   pending: {
//     background: theme.gradient.pending,
//     hoverBackground: theme.gradient.pending,
//     activeBackground: theme.gradient.pending,
//   },
//   completed: {
//     background: theme.gradient.completed,
//     hoverBackground: theme.gradient.completed,
//     activeBackground: theme.gradient.completed,
//   },
//   reviewOrSignIn: {
//     background: theme.gradient.tradePrimary,
//     hoverBackground: theme.gradient.tradeDark,
//     activeBackground: theme.gradient.tradeLight1,
//     width: theme.button.width,
//   },
// };

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
};

import { css } from "styled-components";

export const theme = {
  color: {
    lighterGray: "#E1DFDF",
    placeholderText: "#646464",
    black: "#323232",
    primaryBlue: "#549DF2",
    primaryMediumGray: "#aaaaaa",
    primaryOffWhite: "#f5f5f5",
    primaryPureWhite: "#fff",
    lightGrayHover: "#c9c8c8",
    darkBlueHover: "#3781D7",
    lighterBlueActive: "#97C2F4",
    transparent: "transparent",
    grayDark: "#9B9797",
    filterGray: "#eee",
    logo: "#82D280",
    signIn: "#54CD52",

    white: "#fff",
    text: "#323232",
    textGray: "#F5F5F5",

    primary: "#549DF2",
    primaryDark: "#3781D7",
    primaryLight1: "#75ADEE",
    primaryLight2: "#97C2F4",

    gray: "#AAA",
    grayLight1: "#C9C8C8",
    grayLight2: "#E1DFDF",

    pending: "#ECBD78, #EAB05B",
    backgroundMain: "#F3F0E6",
  },

  gradient: {
    primaryBlue: "linear-gradient(180deg, #7CB4F4, #549DF2)",
    tradeDefault: "linear-gradient(180deg, #7AEC78, #71CF6F)",
    tradeDarkHover: "linear-gradient(180deg, #68CE66, #54CD52)",
    tradeLightActive: "linear-gradient(180deg, #B4F6B3, #9FE89D)",
    tradePending: "linear-gradient(180deg,#ECBD78, #EAB05B)",

    message1Primary: "linear-gradient(180deg, #7CB4F4, #549DF2)",
    message1Dark: "linear-gradient(180deg, #579DEF, #308BF5)",
    message1Light1: "linear-gradient(180deg, #7CB4F4, #549DF2)",
    message1Light2: "linear-gradient(180deg, #BEDAFA, #63A4F0)",

    message2Primary: "linear-gradient(180deg, #E1DFDF, #C2C2C2)",
    message2Dark: "linear-gradient(180deg, #DAD5D5, #AEAAAA)",
    message2Light1: "linear-gradient(180deg, #EFEEEE, #BAB8B8)",
    message2Light2: "linear-gradient(180deg, #F9F7F7, #C9C9C9)",

    tradePrimary: "linear-gradient(180deg, #7AEC78, #71CF6F)",
    tradeDark: "linear-gradient(180deg, #68CE66, #54CD52)",
    tradeLight1: "linear-gradient(180deg, #B4F6B3, #9FE89D)",
    tradeLight2: "linear-gradient(180deg, #DBFBDA, #78C577)",

    confirmedPrimary: "linear-gradient(180deg, #EC7878, #CE5F5F)",
    confirmedDark: "linear-gradient(180deg, #E55858, #C35252)",
    confirmedLight1: "linear-gradient(180deg, #F29C9C, #BB6767)",
    confirmedLight2: "linear-gradient(180deg, #FFCFCF, #C37070)",

    pending: "linear-gradient(180deg,#ECBD78, #EAB05B)",
    completed: "linear-gradient(180deg, #EC7878, #CE5F5F)",
  },

  radius: {
    button: "5px",
    image: "8px",
  },

  shadow: "0 4px 4px rgba(0, 0, 0, .25)",

  button: {
    widthLarge: "31.3rem",
    widthSmall: "14rem",
    widthfilterSmall: "31.3rem",
    widthfilterLarge: "31.3rem",
    height: "4.5rem",
    padding: "0 3rem",
    transition: "all 0.3s",
    primary: {
      height: "4.5rem",
    },
    secondary: {},
  },
  type: {
    h1: css`
      font-family: "Josefin Sans";
      font-size: 11.1rem;
      font-weight: 700;
    `,
    h2: css`
      font-family: "Josefin Sans";
      font-size: 6.8rem;
      font-weight: 700;
    `,
    h3: css`
      font-family: "Josefin Sans";
      font-size: 4.2rem;
      font-weight: 700;
    `,
    h4: css`
      font-family: "Poppins";
      font-size: 3.5rem;
      font-weight: 500;
    `,
    h5: css`
      font-family: "Poppins";
      font-size: 2.6rem;
      font-weight: 700;
    `,
    h6: css`
      font-family: "Open Sans";
      font-size: 1.6rem;
      font-weight: 700;
    `,
    body: css`
      font-family: "Open Sans";
      font-size: 1.6rem;
      font-weight: 400;
    `,
    buttons: css`
      font-family: "Open Sans";
      font-size: 20rem;
      font-weight: 700;
    `,
    microcopy: css`
      font-family: "Open Sans";
      font-size: 1rem;
      font-weight: 700;
    `,
    navbar: css`
      font-family: "Poppins";
      font-size: 1.3rem;
      font-weight: 400;
    `,
    navbarBold: css`
      font-family: "Poppins";
      font-size: 1.3rem;
      font-weight: 700;
    `,
    inputField: css`
      font-family: "Open Sans";
      font-size: 20rem;
      font-weight: 700;
    `,
  },
};

// FILTER ITEMS

const filterICheckboxStyles = css`
  font-size: 1.6rem;
  color: ${theme.color.black};
  border: 1px solid ${theme.color.black};
  height: 3.2rem;
  border-radius: 5px;

  transition: all 0.3s;
`;

export const filterCheckboxSmall = css`
  ${filterICheckboxStyles}
  width: 9rem;
`;

export const filterCheckboxLarge = css`
  ${filterICheckboxStyles}
  width: 11.5rem;
`;

export const selectedStyle = css`
  color: ${theme.color.primaryOffWhite};
  background-color: ${theme.color.darkBlueHover};
`;

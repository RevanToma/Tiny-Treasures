import { createGlobalStyle } from "styled-components";
import { theme } from "./themes";

export const GlobalStyles = createGlobalStyle`

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}
  
#root {
  max-width: 1280px;
  margin: 0 auto;
}

 body {
  margin: 0!;
  padding-bottom: 3rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
  Arial, sans-serif;
  font-size: 1.4rem;

  overflow: hidden;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  border-radius: ${theme.radius.button};
  box-shadow: ${theme.shadow};
  transition: ${theme.button.transition};
  height: ${theme.button.height};
  color: ${theme.color.primaryOffWhite};
  ${theme.type.buttons}
}
h3{
  font-family: 'Open Sans';
  font-weight: 700;
font-size: 1.6rem;
line-height: 22px;
color:#646464;
}

span{
  ${theme.type.bodyBold}
}
`;

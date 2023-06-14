import styled from "styled-components";
import Box from "../../components/common/Box/Box";
import { theme } from "../../styles/themes";
interface CreditsProp {
  credits: string;
}
export const CreditsDiv = styled(Box)`
  span {
    ${theme.type.h5}
    color:#646464;
  }
  p {
    ${theme.type.body}
    color: #646464;
  }
`;
export const CreditsLogoWrapper = styled.div`
  position: relative;
  height: 12rem;
  margin: 2.4rem 0rem;
`;
export const CreditsLogoDiv = styled.img`
  width: 100%;
  height: 100%;
`;
export const CreditsOverlay = styled.div<CreditsProp>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #646464;
  ${theme.type.h3}
  color: #2E576D;
`;

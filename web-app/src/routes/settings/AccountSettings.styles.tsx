import styled from "styled-components";
import Box from "../../components/common/Box/Box";
import { theme } from "../../styles/themes";

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

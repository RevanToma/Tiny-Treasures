import styled from 'styled-components';
import Box from '../Box/Box';
import { theme } from '../../../styles/themes';

export const Wrapper = styled(Box)`
  h1 {
    ${theme.type.buttons}
    color: ${theme.color.black};
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export const Details = styled.p`
  ${theme.type.navbar}
  color: ${theme.color.placeholderText};
`;

export const Description = styled.p`
  ${theme.type.body}
  color:#323232;
`;

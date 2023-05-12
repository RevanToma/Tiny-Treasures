import styled from 'styled-components';
import { theme } from '../../../styles/themes';
import Box from '../../../components/common/Box/Box';

export const Wrapper = styled(Box)`
  padding-bottom: 2.4rem;

  p {
    ${theme.type.body}
  }
`;

export const CategoryTitle = styled.h1`
  ${theme.type.h4}
  line-height: 52.5px;
  text-align: center;
  color: ${theme.color.primaryBlue};
`;

import styled from 'styled-components';
import { theme } from '../../../styles/themes';
import Box from '../../../components/common/Box/Box';

export const Wrapper = styled(Box)`
  h1 {
    ${theme.type.h5}
  }

  h2 {
    ${theme.type.h5}
  }
`;

import styled from 'styled-components';
import Box from '../../../components/common/Box/Box.component';
import { theme } from '../../../styles/themes';

export const Wrapper = styled(Box)`
  h1 {
    ${theme.type.h5}
  }

  h2 {
    ${theme.type.h5}
  }
`;

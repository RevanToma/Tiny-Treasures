import styled, { css } from 'styled-components';
import Box from '../../../components/common/Box/Box';
import { theme } from '../../../styles/themes';

export const Wrapper = styled(Box)`
  h1 {
    ${theme.type.h6}
  }
`;

const commonStyles = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  width: 34.3rem;
  height: 47.2rem;
  background-color: ${theme.color.primaryBlue};
  border-radius: 5px;
  p {
    ${theme.type.h5}
    color: ${theme.color.primaryOffWhite};
    text-align: center;
  }
`;

export const Uploading = styled.div`
  ${commonStyles}
`;

export const Success = styled.div`
  ${commonStyles}
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 150vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

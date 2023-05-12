import { FC } from 'react';
import styled from 'styled-components';

export const StyledDivider = styled.div`
  content: '';
  font-size: 1.6rem;
  width: 100%;
  margin-top: 2.4rem;
  border-top: 1px solid #aaa;
`;

const Divider: FC = () => {
  return <StyledDivider>&nbsp;</StyledDivider>;
};

export default Divider;

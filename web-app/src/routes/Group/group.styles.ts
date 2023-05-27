import styled from 'styled-components';
import { theme } from '../../styles/themes';

export const PostListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const MainImg = styled.img`
  width: 100%;
`;

export const SearchInput = styled.input`
  height: 4.5rem;
  width: 100%;
  max-width: 45rem;
  margin: 0 10px;
  padding: 0 2rem;
  ${theme.type.body}
  border: none;

  &:focus {
    outline: 3px solid ${theme.color.grayDark};
    outline-offset: 2px;
  }
  border-radius: 15px;
`;

import styled from "styled-components";
import { theme } from "../../styles/themes";

export const PostListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const MainImg = styled.img`
  width: 100%;
`;

export const SearchInput = styled.input``;

export const SearchWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  padding: 2rem;

  img {
    width: 5rem;
    margin-right: 2rem;
  }

  input {
    height: 4.5rem;
    flex: 1;

    margin: 0 1rem;
    padding: 0 2rem;
    ${theme.type.body}
    border: none;

    &:focus {
      outline: 3px solid ${theme.color.primary};
      outline-offset: 2px;
    }
    border-radius: 4rem;
    padding-right: 4rem;
  }
  svg {
    position: absolute;
    right: 0;
    transform: translateX(-130%);
    margin: 1rem;
  }
`;

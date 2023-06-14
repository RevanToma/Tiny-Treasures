import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  min-height: 120px;
  width: 80%;
  border-bottom: 2px solid lightgray;

  &:last-of-type {
    border-bottom: none;
  }

  :hover {
    background-color: #eeeeee;
    cursor: pointer;
  }
`;

export const Image = styled.img`
  width: auto;
  height: 50px;
  object-fit: contain;
  margin: 20px;
  border-radius: 50%;
`;

import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  min-height: 120px;
  border-bottom: 2px solid lightgray;

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
`;

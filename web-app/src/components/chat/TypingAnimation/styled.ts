import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-self: start;
  width: fit-content;
  background-color: #cbcacd;
  padding: 10px;
  border-radius: 10px;
  gap: 5px;
`;

export const Dot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #848485;
  animation: loadingFade 1s infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes loadingFade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }
`;

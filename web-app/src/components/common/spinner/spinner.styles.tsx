import styled from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  padding-top: 20rem;
`;

export const StyledSpinner = styled.div`
  height: 3.6rem;
  width: 3.6rem;
  border-top: 3px solid #000;
  border-right: 3px solid transparent;
  border-radius: 50%;
  animation: rotation 0.8s linear infinite;

  @keyframes rotation {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

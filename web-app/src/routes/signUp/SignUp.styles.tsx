import styled from "styled-components";

export const SignUpContainer = styled.div`
  gap: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0 2.5rem;
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2.4rem;

  input {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    padding: 1.2rem;
  }
`;

export const SignUpFooter = styled.div`
  border-top: 1px #aaaaaa solid;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2rem;
  width: 100%;
`;

export const InputPassword = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  svg {
    position: absolute;
    right: 0;
    transform: translateX(-20px);
  }
`;

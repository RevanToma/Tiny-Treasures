import styled from "styled-components";

export const GiveAwayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem !important;
  margin: 1rem;
  align-items: center;
  h2 {
    margin: 1rem 0rem;
  }
`;

export const GiveAwayHead = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 32px;
  gap: 5rem;
`;

export const GiveAwayForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1rem;

  input {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    border-style: none;
  }
`;

export const GiveAwayDescription = styled.textarea`
  height: 149px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border-style: none;
  padding: 1rem;
  resize: none;
`;

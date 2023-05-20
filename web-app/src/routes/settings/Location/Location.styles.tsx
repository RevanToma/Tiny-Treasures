import styled from "styled-components";
import { theme } from "../../../styles/themes";

export const LocationDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  padding: 0rem 4.2rem;

  p {
    margin-top: 4rem;
    color: #646464;
    font-size: 1.6rem;
  }
`;

export const InfoPara = styled.p`
  font-size: 1rem;
  color: #646464;
  ${theme.type.microcopy}
`;

export const Label = styled.label`
  ${theme.type.body}
  color:#646464
`;

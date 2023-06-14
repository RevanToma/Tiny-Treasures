import styled from 'styled-components';
import { theme } from '../../../styles/themes';

export const LocationDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  padding: 0rem 4.2rem;
  margin: 2.4rem 0;

  p {
    color: #646464;
    font-size: 1.6rem;
  }

  h4 {
    text-align: center;
  }
`;

export const InfoPara = styled.p`
  font-size: 1rem;
  color: #646464;
  ${theme.type.microcopy}
`;

export const Label = styled.label`
  ${theme.type.body};
  color: #646464;
`;

export const YourCity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  width: 100%;
  padding: 0 1rem;
  background-color: #fff;
  color: #555;
  height: 10rem;
  border-radius: ${theme.radius.image};
  border: 1px solid ${theme.color.gray};

  p {
    text-align: center;
  }
  span {
    ${theme.type.h6}
  }
`;

import styled, { css, keyframes } from "styled-components";
interface msgType {
  type?: string;
  visible?: boolean;
}

const slideDown = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const slideUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
`;
export const ToastContainer = styled.div<msgType>`
  animation: ${({ visible }) =>
    visible
      ? css`
          ${slideDown} 0.5s forwards
        `
      : css`
          ${slideUp} 0.5s forwards
        `};
  position: fixed;
  top: 0%;
  left: 10%;
  transform: translate(-50%, -50%);
  min-width: 25rem;
  max-width: 32rem;
  padding: 10px;
  color: #000;
  background: white;
  border-radius: 5px;

  z-index: 10000;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 2.5rem;
  font-weight: 500;

  transition: transform all 0.5s ease;
  svg {
    margin: 0rem 0.5rem;
  }

  ${({ type }) =>
    type === "success" &&
    css`
      border-left: 3px solid green;
    `}

  ${({ type }) =>
    type === "error" &&
    css`
      border-left: 3px solid red;
    `}

  ${({ type }) =>
    type === "warning" &&
    css`
      border-left: 3px solid orange;
    `}
`;

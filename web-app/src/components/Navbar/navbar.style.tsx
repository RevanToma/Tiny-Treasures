import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../styles/themes";

interface NavProps {
  active: boolean;
}
interface NavLinkProps {
  active: string;
}
export const NavbarStyle = styled.nav`
  width: 100%;
  padding: 12px;

  background-color: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0px 0px;
  font-family: Arial, Helvetica, sans-serif;
`;

export const NavText = styled.p<NavProps>`
  ${theme.type.navbarBold}
  margin: 0;
  ${({ active }) =>
    active &&
    css`
      color: ${theme.color.primary};
    `}
`;

export const NavLink = styled(Link)<NavLinkProps>`
  color: #505050;
  text-decoration: none;

  &:hover,
  &:focus {
    color: #141414;
  }

  ${({ active }) =>
    active === "true" ? `color: ${theme.color.primary};` : ""};
`;

export const ChatIcon = styled.div`
  position: relative;
`;

export const Notification = styled.div`
  color: white;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  text-align: center;
  position: absolute;
  right: -6px;
  top: -6px;
  background-color: red;
  width: 16px;
  height: 16px;
  border-radius: 100%;
`;

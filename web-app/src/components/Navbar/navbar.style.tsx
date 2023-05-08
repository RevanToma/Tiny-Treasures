import styled from "styled-components";
import { theme } from "../../styles/themes";
import { Link } from "react-router-dom";

export const NavbarStyle = styled.nav`
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0px 0px;
  font-family: Arial, Helvetica, sans-serif;
`;

export const NavText = styled.p`
  margin: 0;
`;

export const NavLink = styled(Link)`
  color: #505050;
  text-decoration: none;
  &:hover,
  &:focus {
    color: #141414;
  }
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

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../../styles/themes'

interface NavLinkProps {
  active: boolean
  isSignedIn?: boolean
}
export const NavbarStyle = styled.nav`
  width: 100%;
  padding: 12px;

  background-color: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0px 0px;
`

export const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ active }) => (active ? theme.color.primary : '#505050')};

  &:hover,
  &:focus {
    color: ${theme.color.primary};
  }

  p {
    ${theme.type.navbarBold}
    color: ${({ active }) => active && theme.color.primary};
  }
`

export const NavLinkNotSignedIn = styled(NavLink)<NavLinkProps>`
  color: ${({ active }) => (active ? theme.color.primary : '')};
  filter: ${({ isSignedIn }) => (isSignedIn ? '' : ' brightness(250%)')};

  &:hover,
  &:focus {
    color: ${({ isSignedIn }) =>
      isSignedIn ? theme.color.primary : '#505050'};
  }
`

export const ChatIcon = styled.div`
  position: relative;
`

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
`

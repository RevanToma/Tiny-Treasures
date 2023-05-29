import React, { useState } from 'react'
import * as S from './navbar.style'
import Box from '../../components/common/Box/Box'

import { FaComment, FaUser, FaPlus, FaHeart } from 'react-icons/fa'
import Logo from '../../assets/LogoNavbar.svg'
import { useSelector } from 'react-redux'
import { selectIsSignedIn } from '../../store/user/userSelectors'
import { useLocation } from 'react-router-dom'

const ICON_SIZE = 21

const Navbar: React.FC = () => {
  const isSignedIn = useSelector(selectIsSignedIn)
  const location = useLocation()
  const currentPath = location.pathname
  const [activeLink, setActiveLink] = useState<string>(currentPath)

  const handleNavItemClick = (Link: string) => {
    setActiveLink(Link)
  }

  return (
    <S.NavbarStyle>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        margin="0"
      >
        <S.NavLink
          to="/"
          onClick={() => handleNavItemClick('home')}
          active={currentPath === '/' ? 'true' : 'false'}
        >
          <Box alignItems="center" gap="5px">
            <img src={Logo} />
            <S.NavText active={activeLink === 'home'}>Home</S.NavText>
          </Box>
        </S.NavLink>
        <S.NavLinkNotSignedIn
          to="/account/myFavourites"
          onClick={() => handleNavItemClick('myFavourites')}
          active={currentPath === '/account/myFavourites' ? 'true' : 'false'}
          isSignedIn={isSignedIn}
        >
          <Box alignItems="center" gap="5px">
            <FaHeart size={ICON_SIZE} />
            <S.NavText active={activeLink === 'myFavourites'}>
              Favourites
            </S.NavText>
          </Box>
        </S.NavLinkNotSignedIn>
        <S.NavLinkNotSignedIn
          to="/giveaway"
          onClick={() => handleNavItemClick('giveaway')}
          active={currentPath === '/giveaway' ? 'true' : 'false'}
          isSignedIn={isSignedIn}
        >
          <Box alignItems="center" gap="5px">
            <FaPlus size={ICON_SIZE} />
            <S.NavText active={activeLink === 'giveaway'}>Upload</S.NavText>
          </Box>
        </S.NavLinkNotSignedIn>
        <S.NavLinkNotSignedIn
          to="/chat"
          onClick={() => handleNavItemClick('Messages')}
          active={currentPath === '/chat' ? 'true' : 'false'}
          isSignedIn={isSignedIn}
        >
          <Box alignItems="center" gap="5px">
            <S.ChatIcon>
              <FaComment size={ICON_SIZE} />
              <S.Notification>3+</S.Notification>
            </S.ChatIcon>
            <S.NavText active={activeLink === 'Messages'}>Messages</S.NavText>
          </Box>
        </S.NavLinkNotSignedIn>
        <S.NavLink
          to={isSignedIn ? '/account' : '/signin'}
          onClick={() => handleNavItemClick('account')}
          active={currentPath === '/account' ? 'true' : 'false'}
        >
          <Box alignItems="center" gap="5px">
            <FaUser size={ICON_SIZE} />
            <S.NavText active={activeLink === 'account'}>
              {isSignedIn ? 'Account' : 'Sign In'}
            </S.NavText>
          </Box>
        </S.NavLink>
      </Box>
    </S.NavbarStyle>
  )
}

export default Navbar

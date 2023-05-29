import React from 'react'
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

  return (
    <S.NavbarStyle>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        margin="0"
      >
        <S.NavLink to="/" active={currentPath === '/'}>
          <Box alignItems="center" gap="5px">
            <img src={Logo} />
            <p>Home</p>
          </Box>
        </S.NavLink>

        <S.NavLinkNotSignedIn
          to={isSignedIn ? '/account/myFavourites' : '#'}
          active={currentPath === '/account/myFavourites'}
          isSignedIn={isSignedIn}
        >
          <Box alignItems="center" gap="5px">
            <FaHeart size={ICON_SIZE} />
            <p>Favourites</p>
          </Box>
        </S.NavLinkNotSignedIn>

        <S.NavLinkNotSignedIn
          to={isSignedIn ? '/giveaway' : '#'}
          active={currentPath === '/giveaway'}
          isSignedIn={isSignedIn}
        >
          <Box alignItems="center" gap="5px">
            <FaPlus size={ICON_SIZE} />
            <p>Upload</p>
          </Box>
        </S.NavLinkNotSignedIn>

        <S.NavLinkNotSignedIn
          to={isSignedIn ? '/chat' : '#'}
          active={currentPath === '/chat'}
          isSignedIn={isSignedIn}
        >
          <Box alignItems="center" gap="5px">
            <S.ChatIcon>
              <FaComment size={ICON_SIZE} />
              <S.Notification>3+</S.Notification>
            </S.ChatIcon>
            <p>Messages</p>
          </Box>
        </S.NavLinkNotSignedIn>

        <S.NavLink
          to={isSignedIn ? '/account' : '/signin'}
          active={currentPath === '/account'}
        >
          <Box alignItems="center" gap="5px">
            <FaUser size={ICON_SIZE} />
            <p>{isSignedIn ? 'Account' : 'Sign In'}</p>
          </Box>
        </S.NavLink>
      </Box>
    </S.NavbarStyle>
  )
}

export default Navbar

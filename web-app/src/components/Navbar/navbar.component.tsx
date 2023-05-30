import React from 'react'
import * as S from './navbar.style'
import Box from '../../components/common/Box/Box'

import { FaComment, FaUser, FaPlus, FaHeart } from 'react-icons/fa'
import Logo from '../../assets/LogoNavbar.svg'
import { useSelector } from 'react-redux'
import { selectIsSignedIn } from '../../store/user/userSelectors'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
        <S.NavLink active={currentPath === '/'}>
          <Link to="/">
            <Box alignItems="center" gap="5px">
              <img src={Logo} />
              <p>Home</p>
            </Box>
          </Link>
        </S.NavLink>

        <S.NavLinkNotSignedIn
          isSignedIn={isSignedIn}
          active={currentPath === '/account/myFavourites'}
        >
          <Link to={isSignedIn ? '/account/myFavourites' : '#'}>
            <Box alignItems="center" gap="5px">
              <FaHeart size={ICON_SIZE} />
              <p>Favourites</p>
            </Box>
          </Link>
        </S.NavLinkNotSignedIn>

        <S.NavLinkNotSignedIn
          isSignedIn={isSignedIn}
          active={currentPath === '/giveaway'}
        >
          <Link to={isSignedIn ? '/giveaway' : '#'}>
            <Box alignItems="center" gap="5px">
              <FaPlus size={ICON_SIZE} />
              <p>Upload</p>
            </Box>
          </Link>
        </S.NavLinkNotSignedIn>

        <S.NavLinkNotSignedIn
          isSignedIn={isSignedIn}
          active={currentPath === '/chat'}
        >
          <Link to={isSignedIn ? '/chat' : '#'}>
            <Box alignItems="center" gap="5px">
              <S.ChatIcon>
                <FaComment size={ICON_SIZE} />
                <S.Notification>3</S.Notification>
              </S.ChatIcon>
              <p>Messages</p>
            </Box>
          </Link>
        </S.NavLinkNotSignedIn>

        <S.NavLink
          active={currentPath === '/account' || currentPath === '/signin'}
        >
          <Link to={isSignedIn ? '/account' : '/signin'}>
            <Box alignItems="center" gap="5px">
              <FaUser size={ICON_SIZE} />
              <p>{isSignedIn ? 'Account' : 'Sign In'}</p>
            </Box>
          </Link>
        </S.NavLink>
      </Box>
    </S.NavbarStyle>
  )
}

export default Navbar

import React from "react";
import * as S from "./navbar.style";
import Box from "../../components/common/Box/Box";

import { FaSearch, FaGift, FaComment, FaUser, FaHome } from "react-icons/fa";

const ICON_SIZE = 21;

const Navbar: React.FC = () => {
  return (
    <S.NavbarStyle>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        margin="0"
      >
        <S.NavLink to="/">
          <Box alignItems="center" gap="5px">
            <FaHome size={ICON_SIZE} />
            <S.NavText>Home</S.NavText>
          </Box>
        </S.NavLink>
        <S.NavLink to="/giveaway">
          <Box alignItems="center" gap="5px">
            <FaGift size={ICON_SIZE} />
            <S.NavText>Give away</S.NavText>
          </Box>
        </S.NavLink>
        <S.NavLink to="/chat">
          <Box alignItems="center" gap="5px">
            <S.ChatIcon>
              <FaComment size={ICON_SIZE} />
              <S.Notification>3+</S.Notification>
            </S.ChatIcon>
            <S.NavText>Chat</S.NavText>
          </Box>
        </S.NavLink>
        <S.NavLink to="/account">
          <Box alignItems="center" gap="5px">
            <FaUser size={ICON_SIZE} />
            <S.NavText>Account</S.NavText>
          </Box>
        </S.NavLink>
      </Box>
    </S.NavbarStyle>
  );
};

export default Navbar;

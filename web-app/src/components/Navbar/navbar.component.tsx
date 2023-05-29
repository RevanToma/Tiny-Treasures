import React, { useState } from "react";
import * as S from "./navbar.style";
import Box from "../../components/common/Box/Box";

import { FaComment, FaUser, FaPlus, FaHeart } from "react-icons/fa";
import Logo from "../../assets/LogoNavbar.svg";

const ICON_SIZE = 21;

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("");

  const handleNavItemClick = (link: string) => {
    setActiveLink(link);
  };

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
          onClick={() => handleNavItemClick("home")}
          active={activeLink === "home" ? "true" : "false"}
        >
          <Box alignItems="center" gap="5px">
            <img src={Logo} />
            <S.NavText active={activeLink === "home"}>Home</S.NavText>
          </Box>
        </S.NavLink>
        <S.NavLink
          to="/account/myFavourites"
          onClick={() => handleNavItemClick("myFavourites")}
          active={activeLink === "myFavourites" ? "true" : "false"}
        >
          <Box alignItems="center" gap="5px">
            <FaHeart size={ICON_SIZE} />
            <S.NavText active={activeLink === "myFavourites"}>
              Favourites
            </S.NavText>
          </Box>
        </S.NavLink>
        <S.NavLink
          to="/giveaway"
          onClick={() => handleNavItemClick("upload")}
          active={activeLink === "upload" ? "true" : "false"}
        >
          <Box alignItems="center" gap="5px">
            <FaPlus size={ICON_SIZE} />
            <S.NavText active={activeLink === "upload"}>Upload</S.NavText>
          </Box>
        </S.NavLink>
        <S.NavLink
          to="/chat"
          onClick={() => handleNavItemClick("Messages")}
          active={activeLink === "Messages" ? "true" : "false"}
        >
          <Box alignItems="center" gap="5px">
            <S.ChatIcon>
              <FaComment size={ICON_SIZE} />
              <S.Notification>3+</S.Notification>
            </S.ChatIcon>
            <S.NavText active={activeLink === "Messages"}>Messages</S.NavText>
          </Box>
        </S.NavLink>
        <S.NavLink
          to="/account"
          onClick={() => handleNavItemClick("account")}
          active={activeLink === "account" ? "true" : "false"}
        >
          <Box alignItems="center" gap="5px">
            <FaUser size={ICON_SIZE} />
            <S.NavText active={activeLink === "account"}>Account</S.NavText>
          </Box>
        </S.NavLink>
      </Box>
    </S.NavbarStyle>
  );
};

export default Navbar;

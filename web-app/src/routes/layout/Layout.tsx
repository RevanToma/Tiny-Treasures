import React, { useRef, useEffect } from "react";
import Box from "../../components/common/Box/Box";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsSignedIn } from "../../store/user/userSelectors";
import Navbar from "../../components/Navbar/navbar.component";
import styled from "styled-components";

const LayoutStyle = styled.div`
  overflow: hidden;
`;

const PageStyle = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

type LayoutProps = Record<string, never>;

const Layout: React.FC<LayoutProps> = () => {
  const userSignedIn = useSelector(selectIsSignedIn);
  const navBarRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutStyle>
      <Box
        alignItems="center"
        height="100vh"
        maxHeight="100vh"
        justifyContent="space-between"
        margin="0"
      >
        <div id="chat-post-item-portal"></div>
        <PageStyle>
          <Box width="100%">
            <Outlet />
          </Box>
        </PageStyle>
        <Box width="100%" padding="10px 15px">
          <div id="chat-input-portal"></div>
        </Box>
        {userSignedIn && <Navbar ref={navBarRef} />}
      </Box>
    </LayoutStyle>
  );
};

export default Layout;

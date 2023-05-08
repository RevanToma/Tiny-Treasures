import React from "react";
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
`;

type LayoutProps = Record<string, never>;

const Layout: React.FC<LayoutProps> = () => {
  const userSignedIn = useSelector(selectIsSignedIn);

  return (
    <LayoutStyle>
      <Box
        alignItems="center"
        height="100vh"
        maxHeight="100vh"
        justifyContent="space-between"
        margin="0"
      >
        <PageStyle>
          <Box>
            <Outlet />
          </Box>
        </PageStyle>

        {userSignedIn && <Navbar />}
      </Box>
    </LayoutStyle>
  );
};

export default Layout;

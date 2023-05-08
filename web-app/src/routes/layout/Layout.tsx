import React from "react";
import Box from "../../components/common/Box/Box";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsSignedIn } from "../../store/user/userSelectors";

type LayoutProps = Record<string, never>;

const Layout: React.FC<LayoutProps> = () => {
  const userSignedIn = useSelector(selectIsSignedIn);

  return (
    <Box gap="1rem" alignItems="center">
      <Box>
        <Outlet />
      </Box>
      {userSignedIn && (
        <nav>
          <Box gap="1rem" flexDirection="row">
            <Link to="/">Home</Link>
            <div>Search</div>
            <Link to="/giveaway">Give away</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/account">Account</Link>
          </Box>
        </nav>
      )}
    </Box>
  );
};

export default Layout;

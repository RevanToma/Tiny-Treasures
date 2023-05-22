import Box from "../../components/common/Box/Box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsSignedIn,
  selectUserCredits,
} from "../../store/user/userSelectors";

import NavigationItem from "./NavigationItems";
import { useAppDispatch } from "../../hooks/useDispatch";
import { signOut } from "../../store/user/userSlice";

import {
  FaBox,
  FaCoins,
  FaEnvelope,
  FaHeart,
  FaLock,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
const AccountSettings = () => {
  const userCredits = useSelector(selectUserCredits);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userSignedIn = useSelector(selectIsSignedIn);

  const handleLogOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <>
      {userSignedIn ? (
        <Box backgroundColor="#F5F5F5" height="100vh" width="100%">
          <Box justifyContent="center" padding="2.5rem" marginBottom="2.5rem">
            <h1>Account</h1>
          </Box>

          <Box gap="5rem" margin="2rem">
            <Box gap="2.4rem">
              <h3>Account Settings</h3>
              <NavigationItem
                text="Change Name"
                onClick={() => navigate("/account/changeName")}
                icon={<FaUserEdit size={20} color="#646464" />}
              />
              <NavigationItem
                text="Change Email"
                onClick={() => navigate("/account/changeEmail")}
                icon={<FaEnvelope size={20} color="#646464" />}
              />
              <NavigationItem
                text="Change Password"
                onClick={() => navigate("/account/changePassword")}
                icon={<FaLock size={20} color="#646464" />}
              />
            </Box>
            <Box gap="2.4rem" padding="48px 24px 32px">
              <h3>Notification Settings</h3>
              <NavigationItem
                text="Notification"
                onClick={() => navigate("/account/notification")}
                icon={<IoMdNotifications size={25} color="#646464" />}
              />
            </Box>
            <Box gap="2.4rem" padding="23px 24px 32px">
              <h3>Notification Settings</h3>

              <NavigationItem
                text="Location"
                onClick={() => navigate("/account/location")}
                icon={<MdLocationPin size={25} color="#646464" />}
              />
            </Box>
            <Box gap="2.4rem">
              <h3>Personal</h3>
              <NavigationItem
                onClick={() => navigate("/account/credits")}
                showArrow={false}
                text="Credits"
                icon={<FaCoins size={20} color="#646464" />}
              >
                x {userCredits}
              </NavigationItem>
              <NavigationItem
                text="My items"
                icon={<FaBox size={20} color="#646464" />}
                onClick={() => navigate("/account/myItems")}
              />
              <NavigationItem
                text="Favourites"
                icon={<FaHeart size={20} color="#646464" />}
                onClick={() => navigate("/account/myFavourites")}
              />
              <NavigationItem
                text="Log out"
                icon={<FaSignOutAlt size={20} color="#646464" />}
                onClick={handleLogOut}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box justifyContent="center" marginTop="5rem">
          <NavigationItem
            onClick={() => navigate("/signin")}
            text="Sign In"
            icon={<FaSignInAlt size={20} color="#646464" />}
          />
        </Box>
      )}
    </>
  );
};

export default AccountSettings;

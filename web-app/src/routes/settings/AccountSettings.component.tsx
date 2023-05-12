import Box from "../../components/common/Box/Box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectUserCredits } from "../../store/user/userSelectors";
import LeftOrRightCarett from "../../components/common/leftCarett/LeftOrRightCarett";
import { BiCoinStack } from "react-icons/bi";

import NavigationItem from "./NavigationItems";
import { useAppDispatch } from "../../hooks/useDispatch";
import { signOut } from "../../store/user/userSlice";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { signOutUser } from "../../api/requests";
const AccountSettings = () => {
  const userCredits = useSelector(selectUserCredits);
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleAccountSettings = () => {
    navigate("/account-settings");
  };
  const handleCredits = () => {
    navigate("/credits");
  };

  const handleMyItems = () => {
    navigate("/myItems");
  };

  const handleFavourites = () => {
    navigate("/favourites");
  };

  const handleLogOut = () => {
    signOutUser();
    dispatch(signOut());
    navigate("/");
  };

  return (
    <>
      <Box flexDirection="row" justifyContent="center" margin="1rem">
        <h1>Account</h1>
      </Box>
      <Box>
        <LeftOrRightCarett left={true} onClick={() => navigate("/")} />
      </Box>
      <Box gap="2rem" margin="2rem">
        <NavigationItem
          text="Account Settings"
          onClick={handleAccountSettings}
        />
        <NavigationItem
          onClick={handleCredits}
          showArrow={false}
          text="Credits"
        >
          {userCredits}x<BiCoinStack size={20} />
        </NavigationItem>
        <NavigationItem text="My items" onClick={handleMyItems} />
        <NavigationItem text="Favourites" onClick={handleFavourites} />
        <NavigationItem text="Log out" onClick={handleLogOut} />
      </Box>
    </>
  );
};

export default AccountSettings;

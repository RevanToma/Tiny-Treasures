import Box from "../../components/common/Box/Box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserCredits } from "../../store/user/userSelectors";
import LeftOrRightCarett from "../../components/common/leftCarett/LeftOrRightCarett";
import { BiCoinStack } from "react-icons/bi";

import NavigationItem from "./NavigationItems";
const AccountSettings = () => {
  const userCredits = useSelector(selectUserCredits);
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
      </Box>
    </>
  );
};
export default AccountSettings;

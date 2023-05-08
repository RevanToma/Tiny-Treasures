import Button from "../../components/common/Button/Button.component";
import { ButtonType } from "../../components/common/Button/button.types";

import Box from "../../components/common/Box/Box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserCredits } from "../../store/user/userSelectors";
import LeftCarett from "../../assets/svg.icons/LeftCarett";
import { BiCoinStack } from "react-icons/bi";
import { IoMdArrowForward } from "react-icons/io";
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
        <h1> Account</h1>
      </Box>
      <Box>
        <LeftCarett onClick={() => navigate("/")} />
      </Box>

      <Box gap="2rem" margin="2rem">
        <Button
          buttonType={ButtonType.Secondary}
          onClick={handleAccountSettings}
        >
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            Account Settings <IoMdArrowForward size={32} />
          </Box>
        </Button>
        <Button buttonType={ButtonType.Secondary} onClick={handleCredits}>
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <span>Credits </span>
            <Box alignItems="center" flexDirection="row">
              {userCredits}x <BiCoinStack />
            </Box>
          </Box>
        </Button>
        <Button buttonType={ButtonType.Secondary} onClick={handleMyItems}>
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            My items <IoMdArrowForward size={32} />
          </Box>
        </Button>
        <Button buttonType={ButtonType.Secondary} onClick={handleFavourites}>
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            Favourites <IoMdArrowForward size={32} />
          </Box>
        </Button>
      </Box>
    </>
  );
};
export default AccountSettings;

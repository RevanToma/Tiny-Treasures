import Button, {
  ButtonProps,
} from "../../components/common/Button/Button.component";
import { ButtonType } from "../../components/common/Button/button.types";
import * as S from "./AccountSettings.styles";
import Box from "../../components/common/Box/Box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserCredits } from "../../store/user/userSelectors";
import LeftCarett from "../../assets/svg.icons/LeftCarett";
import Coins from "../../assets/svg.icons/coin.svg";
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
          <Box alignItems="flex-start">
            <S.SettingsLi>Account Settings</S.SettingsLi>
          </Box>
        </Button>
        <Button buttonType={ButtonType.Secondary} onClick={handleCredits}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <span>Credits</span>
            <Box alignItems="center" flexDirection="row">
              {userCredits}x <img src={Coins} />
            </Box>
          </Box>
        </Button>
        <Button buttonType={ButtonType.Secondary} onClick={handleMyItems}>
          <Box alignItems="flex-start">
            <S.SettingsLi> My items</S.SettingsLi>
          </Box>
        </Button>
        <Button buttonType={ButtonType.Secondary} onClick={handleFavourites}>
          <Box alignItems="flex-start">
            <S.SettingsLi>Favourites</S.SettingsLi>
          </Box>
        </Button>
      </Box>
    </>
  );
};
export default AccountSettings;

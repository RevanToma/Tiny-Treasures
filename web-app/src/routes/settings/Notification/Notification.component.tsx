import Box from "../../../components/common/Box/Box";
import GoBackNav from "../../../components/common/GoBackNav/GoBackNav.component";
import NotificationSVG from "../../../assets/Notification.svg";
import CheckBox from "../../../components/common/CheckBox/CheckBox.component";
import * as S from "./Notification.styles";
import Input from "../../../components/common/Input/input.component";
import Button from "../../../components/common/Button/Button.component";
import { ButtonType } from "../../../components/common/Button/button.types";
const Notification: React.FC = () => {
  return (
    <Box gap="2.4rem">
      <GoBackNav title="Notifications" size={35} />
      <img src={NotificationSVG} />

      <S.CheckBoxDiv>
        <CheckBox aria-label="Use sign up email for notifications" />
        <p>Use sign up email for notifications</p>
      </S.CheckBoxDiv>
      <span>Or</span>

      <Box width="100%" padding="4rem" gap="2.4rem">
        <Input placeholder="Add Another Email" padding="1.2rem" />
        <Input placeholder="Repeat Email" padding="1.2rem" />
      </Box>

      <Box marginTop="5rem">
        <Button buttonType={ButtonType.Primary}> Save</Button>
      </Box>
    </Box>
  );
};

export default Notification;

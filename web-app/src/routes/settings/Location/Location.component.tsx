import LocationSVG from "../../../assets/LocationSVG.svg";
import Box from "../../../components/common/Box/Box";
import Button from "../../../components/common/Button/Button.component";
import { ButtonType } from "../../../components/common/Button/button.types";
import GoBackNav from "../../../components/common/GoBackNav/GoBackNav.component";
import { Title } from "../../../components/common/GoBackNav/goBackNav.styles";
import Input from "../../../components/common/Input/input.component";
import * as S from "./Location.styles";
const Location: React.FC = () => {
  return (
    <Box gap="2.4rem">
      <GoBackNav title="Location" size={35} />
      <img src={LocationSVG} />
      <Box
        alignItems="flex-start"
        width="100%"
        padding="24px 48px 0px"
        gap="2.4rem"
      >
        <Title color="#646464"> Set your location</Title>
        <p>This helps for pick ups and finding items near you</p>
      </Box>
      <h4>Or</h4>

      <S.LocationDiv>
        <p>Type in a location</p>
        <Input placeholder="Street, city" type="text" padding="1.2rem" />

        <p>Your location has been set to:</p>
        <Input placeholder="City, city" type="text" padding="1.2rem" />
      </S.LocationDiv>

      <Button buttonType={ButtonType.Primary}>Save</Button>
    </Box>
  );
};

export default Location;

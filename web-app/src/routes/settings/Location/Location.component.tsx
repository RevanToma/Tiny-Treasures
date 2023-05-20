import { useState, useEffect } from "react";
import LocationSVG from "../../../assets/LocationSVG.svg";
import Box from "../../../components/common/Box/Box";
import Button from "../../../components/common/Button/Button.component";
import { ButtonType } from "../../../components/common/Button/button.types";
import GoBackNav from "../../../components/common/GoBackNav/GoBackNav.component";
import { Title } from "../../../components/common/GoBackNav/goBackNav.styles";
import Input from "../../../components/common/Input/input.component";
import * as S from "./Location.styles";
import { LocationData, Point } from "../../../types";
import { getCoordinatesFromCity, patchLocation } from "../../../api/requests";
import { useNavigate } from "react-router-dom";
import { getCurrentLocation } from "../../../utils/helperfunctions";

const Location: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const [cityInput, setCityInput] = useState("");
  const navigate = useNavigate();

  const handleCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(event.target.value);
  };

  const handleCitySave = async () => {
    const geometry = await getCoordinatesFromCity(cityInput);

    const newLocation = {
      type: Point.Point,
      coordinates: [geometry.lat, geometry.lng] as [number, number],
      city: cityInput,
    };

    setCityInput("");
    setLocation(newLocation);
    localStorage.setItem("location", JSON.stringify(newLocation));
    await patchLocation(newLocation);

    return newLocation;
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);

    if (isChecked) {
      const location = await getCurrentLocation();
      setLocation(location);

      localStorage.setItem("location", JSON.stringify(location));
    } else {
      setLocation(null);
      localStorage.removeItem("location");
    }
  };
  const handleSaveClick = async () => {
    let newLocation;

    if (!cityInput && location) {
      newLocation = location;
    } else {
      newLocation = await handleCitySave();
    }

    await patchLocation(newLocation);
    setLocation(newLocation);
    navigate("/account");
  };

  const initializeLocationFromLocalStorage = () => {
    const savedLocation = JSON.parse(
      localStorage.getItem("location") || "null"
    );
    setLocation(savedLocation);
    setIsChecked(!!savedLocation);
  };

  useEffect(() => {
    initializeLocationFromLocalStorage();
  }, []);

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
        <label htmlFor="locationCheckbox">Get current Location</label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </Box>
      <h4>Or</h4>

      <S.LocationDiv>
        <p>Type in a location</p>
        <Input
          placeholder="Street, city"
          type="text"
          name="city"
          padding="1.2rem"
          onChange={handleCityInput}
          value={cityInput}
        />

        <p>Your location has been set to:</p>
        <Input
          placeholder="City, city"
          type="text"
          padding="1.2rem"
          value={location?.city || ""}
          readOnly
        />
      </S.LocationDiv>

      <Button
        buttonType={ButtonType.Primary}
        onClick={handleSaveClick}
        disabled={!cityInput && !location?.city}
      >
        Save
      </Button>
    </Box>
  );
};

export default Location;

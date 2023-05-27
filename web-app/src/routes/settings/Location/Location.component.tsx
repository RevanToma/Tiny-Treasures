import { useState, useEffect } from 'react';
import LocationSVG from '../../../assets/LocationSVG.svg';
import Box from '../../../components/common/Box/Box';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import GoBackNav from '../../../components/common/GoBackNav/GoBackNav.component';
import { Title } from '../../../components/common/GoBackNav/goBackNav.styles';
import Input from '../../../components/common/Input/input.component';
import * as S from './Location.styles';
import { IGeoJson, ILocation, Point } from '../../../types';
import { getCityFromAddress, getCityFromCoords } from '../../../api/requests';
import { useNavigate } from 'react-router-dom';
import { getGeoJson } from './location.helpers';
import { useAppDispatch } from '../../../hooks/useDispatch';
import { updateUserAsync } from '../../../store/user/userSlice';

const Location: React.FC = () => {
  const dispatch = useAppDispatch();

  const [location, setLocation] = useState<IGeoJson | null>(null);
  const [addressInput, setAddressInput] = useState('');

  const handleCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(event.target.value);
  };

  const fetchCityFromAddress = async () => {
    const location: ILocation = await getCityFromAddress(addressInput);
    const geoJson = getGeoJson(location);
    setLocation(geoJson);
  };

  const fetchCityFromCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const city: string = await getCityFromCoords(lat, lng);

        const geoJson: IGeoJson = {
          coordinates: [lng, lat],
          type: Point.Point,
          city,
        };
        setLocation(geoJson);
      });
    } else {
      // Error message that browser doesn't support
    }
  };

  const saveLocationToUser = () => {
    dispatch(updateUserAsync({ newData: location, field: 'location' }));
  };

  return (
    <Box gap="2.4rem" width="100%">
      <GoBackNav title="Location" />
      <img src={LocationSVG} />
      <Box alignItems="center" width="100%" padding="0 2.4rem" gap="1rem">
        <Title color="#646464"> Set your location</Title>
        <S.InfoPara>
          This helps for pick ups and finding items near you
        </S.InfoPara>
      </Box>

      <S.LocationDiv>
        <Box alignItems="flex-start" gap=".8rem">
          <p>Enter your address</p>
          <Input
            placeholder="Street, city"
            type="text"
            name="city"
            onChange={handleCityInput}
          />
          <Button
            onClick={fetchCityFromAddress}
            buttonType={ButtonType.Primary}
          >
            Add Address
          </Button>
        </Box>
        <h4>Or</h4>
        <Box alignItems="flex-start" gap=".8rem">
          <p>Get your current location</p>
          <Button onClick={fetchCityFromCoords} buttonType={ButtonType.Primary}>
            Get Location
          </Button>
        </Box>
      </S.LocationDiv>
      <Box width="100%" alignItems="flex-start" gap=".8rem" padding="0 4.8rem">
        <S.YourCity>
          {location?.city ? (
            <>
              <p>Your city will be set to:</p>
              <span>{location?.city}</span>
            </>
          ) : (
            <p>Choose one of the above methods to get your city.</p>
          )}
        </S.YourCity>
      </Box>

      <Button
        buttonType={location?.city ? ButtonType.Secondary : ButtonType.Disabled}
        onClick={saveLocationToUser}
      >
        Save
      </Button>
    </Box>
  );
};

export default Location;

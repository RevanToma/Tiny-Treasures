import { useState } from 'react';
import axios from 'axios';

import Button from '../../components/common/Button/Button.component';
import { ButtonType } from '../../components/common/Button/button.types';
import { useAppDispatch } from '../../hooks/useDispatch';
import { GeoLocation } from '../../types';
import { signOutUser } from '../../store/user/userSlice';

const Account = () => {
  const dispatch = useAppDispatch();
  const [addressValue, setAddressValue] = useState('');
  const [locationData, setLocationData] = useState({});
  // TODO: HANDLE AXIOS ERRORS
  const submitAddress = async () => {
    const url = `http://localhost:8000/geocode/address/${addressValue}`;
    const response = await axios.get(url);
    const { data } = response.data.data;

    const locationData: GeoLocation = {
      coordinates: [data.lng, data.lat],
      type: 'Point',
      city: data.city,
    };
    setLocationData(locationData);
  };

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const url = `http://localhost:8000/geocode/coords/lat/${lat}/lng/${lng}`;
        const response = await axios.get(url);

        const city = response.data.data.data;
        const locationData: GeoLocation = {
          coordinates: [lng, lat],
          type: 'Point',
          city,
        };
        setLocationData(locationData);
      });
    } else {
      // Error message that browser doesn't support
    }
  };

  const handleSignOutUser = () => {
    dispatch(signOutUser());
  };

  return (
    <div>
      <label htmlFor="location">Enter your address...</label>
      <input
        onChange={e => setAddressValue(e.target.value)}
        name="location"
        type="text"
      />
      or...
      <button type="button" onClick={getGeoLocation}>
        Get your location
      </button>
      <button type="button" onClick={submitAddress}>
        Submit Your Address
      </button>
      <Button onClick={handleSignOutUser} buttonType={ButtonType.SmallGreen}>
        {' '}
        Sign Out
      </Button>
    </div>
  );
};

export default Account;

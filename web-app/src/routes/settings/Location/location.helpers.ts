import { IGeoJson, ILocation, IPoint } from '../../../types';

export const getGeoJson = (location: ILocation): IGeoJson => {
  const { city, lat, lng } = location;
  return {
    type: IPoint.Point,
    coordinates: [parseFloat(lng), parseFloat(lat)],
    city,
  };
};

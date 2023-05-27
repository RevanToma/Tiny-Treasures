import { IGeoJson, ILocation, Point } from '../../../types';

export const getGeoJson = (location: ILocation): IGeoJson => {
  const { city, lat, lng } = location;
  return {
    type: Point.Point,
    coordinates: [parseFloat(lng), parseFloat(lat)],
    city,
  };
};

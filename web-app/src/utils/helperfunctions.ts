import { getCityFromCoordinates } from "../api/requests";
import { Point } from "../types";

export const getFullDate = function (unixTime: number) {
  const t = new Date(unixTime);
  return `${t.getFullYear()}-${(t.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
};

export const getHoursAndMinutes = (unixTime: number): string => {
  const t = new Date(unixTime);
  const currentHour = t.getHours();
  const currentMinute = (t.getMinutes() < 10 ? "0" : "") + t.getMinutes();
  const time = `${currentHour}:${currentMinute}`;
  return time;
};

export const getCurrentLocation = async () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return null;
  } else {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const geometry = await getCityFromCoordinates(
      position.coords.latitude,
      position.coords.longitude
    );

    const newLocation = {
      type: Point.Point,
      coordinates: [position.coords.latitude, position.coords.longitude] as [
        number,
        number
      ],
      city: geometry.town,
    };

    return newLocation;
  }
};

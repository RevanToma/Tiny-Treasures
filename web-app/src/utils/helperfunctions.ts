export const getFullDate = function (unixTime: number) {
  const t = new Date(unixTime);
  return `${t.getFullYear()}-${(t.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
};

export const getHoursAndMinutes = (unixTime: number): string => {
  const t = new Date(unixTime);
  const currentHour = t.getHours();
  const currentMinute = t.getMinutes();

  const time = `${currentHour}:${currentMinute}`;
  return time;
};

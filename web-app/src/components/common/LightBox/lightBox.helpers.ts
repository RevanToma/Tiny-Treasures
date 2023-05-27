export const getIndex = (
  direction: string,
  currentImg: number,
  lastIndex: number
): number => {
  if (direction === 'back' && currentImg === 0) {
    return lastIndex;
  } else if (direction === 'back' && currentImg !== 0) {
    return currentImg - 1;
  } else if (direction === 'forward' && currentImg === lastIndex) {
    return 0;
  } else return currentImg + 1;
};

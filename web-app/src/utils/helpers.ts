import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { AnyAction } from 'redux';
import {
  initialQueryData,
  setQuery,
  setQueryData,
} from '../store/query/querySlice';

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export const getListFromArray = (array: string[]) => {
  let str = '';
  array.forEach((item, i, arr) => {
    if (i < arr.length - 1) {
      str = `${str}${item}, `;
    } else {
      str = `${str}${item}`;
    }
  });
  return str;
};

export const moveToFrontOfArray = (
  index: number,
  array: (string | File)[]
): (string | File)[] => {
  const newArray = [...array];
  console.log(newArray);
  const [primary] = newArray.splice(index, 1);
  newArray.unshift(primary);
  console.log(newArray);

  return newArray;
};

export const goToGroupPage = (
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
  group: string
) => {
  const newQuery = `group=${group}`;
  dispatch(setQuery(newQuery));
  dispatch(setQueryData({ ...initialQueryData, Group: [group] }));

  navigate(`/group/${group}`);
};

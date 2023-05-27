import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const querySlice = (state: RootState) => state.query;

export const selectQuery = createSelector(
  [querySlice],
  querySlice => querySlice.query
);

export const selectQueryData = createSelector(
  [querySlice],
  querySlice => querySlice.queryData
);

export const selectTempQueryData = createSelector(
  [querySlice],
  querySlice => querySlice.tempQueryData
);

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const giveFormValuesSlice = (state: RootState) => state.giveFormValues;

export const selectGiveFormValues = createSelector(
  [giveFormValuesSlice],
  giveFormValuesSlice => giveFormValuesSlice.formValues
);

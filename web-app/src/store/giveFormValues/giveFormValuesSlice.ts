import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGivePreviewFormData } from '../../routes/Give/give.types';

interface IInitialState {
  formValues: IGivePreviewFormData | null;
}

export const initialState: IInitialState = {
  formValues: null,
};

const giveFormValuesSlice = createSlice({
  name: 'giveFormValues',
  initialState,
  reducers: {
    setGiveFormValues: (
      state,
      { payload }: PayloadAction<IGivePreviewFormData>
    ) => {
      state.formValues = payload;
    },
    clearGiveFormValues: state => {
      state.formValues = null;
    },
  },
});

export const { setGiveFormValues, clearGiveFormValues } =
  giveFormValuesSlice.actions;

export default giveFormValuesSlice.reducer;

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const toastSlice = (state: RootState) => state.toast;

export const selectToasts = createSelector(
  [toastSlice],
  (state) => state.toasts
);

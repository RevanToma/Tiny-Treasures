import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast, ToastState } from "../../types";

const initialState: ToastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, { payload }: PayloadAction<Toast>) => {
      state.toasts.push(payload);
    },
    removeToast: (state, { payload }: PayloadAction<string>) => {
      // Remove the toast with the specified id.
      state.toasts = state.toasts.filter((toast) => toast.id !== payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;

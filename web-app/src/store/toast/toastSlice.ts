import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastState } from "../../types";

const initialState: ToastState = {
  message: "",
  type: "",
  visible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, { payload }: PayloadAction<ToastState>) => {
      state.message = payload.message;
      state.type = payload.type;
      state.visible = true;
    },
    hideToast: (state) => {
      state.message = "";
      state.type = "";
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;

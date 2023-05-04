import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types";

const initialState: UserState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signSuccess: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
});
export const { signSuccess } = userSlice.actions;
export default userSlice.reducer;

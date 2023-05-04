import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types";

const initialState: IUser = {
  data: {
    user: {
      email: "",
      firstName: "",
      credits: 0,
      name: "",
    },
  },
  isSignedIn: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signSuccess: (state, { payload }: PayloadAction<IUser>) => {
      state.data.user = payload.data.user;
      state.token = payload.token;
      state.isSignedIn = true;
    },
    setSignedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isSignedIn = payload;
    },
  },
});

export const { signSuccess, setSignedIn } = userSlice.actions;
export default userSlice.reducer;

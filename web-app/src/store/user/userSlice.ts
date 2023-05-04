import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types";

const initialState: UserState = {
  user: {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    token: "",
  },
  isSignedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signSuccess: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.isSignedIn = true;
      localStorage.setItem("authToken", payload.token);
    },
    setSignedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isSignedIn = payload;
    },
  },
});

export const { signSuccess, setSignedIn } = userSlice.actions;
export default userSlice.reducer;

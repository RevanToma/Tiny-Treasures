import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignInInfo, UserState } from "../../types";
import { logInUser } from "../../api/requests";
import { Socket } from "socket.io-client";
import { socket } from "../../Sockets/Message.socket";

const initialState: UserState = {
  user: {},
  error: null,
  isLoading: false,
};

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async ({ email, password }: SignInInfo) => {
    const user = await logInUser(email, password);
    if (!user) return;
    // socket().emit("sign-in", user.id);
    return user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state) => {
      state.isLoading = true;
    },
    signSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    },
    signFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
export const { singInStart, signSuccess, signFailed } = userSlice.actions;
export default userSlice.reducer;

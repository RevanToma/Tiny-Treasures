import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom, IUser } from "../../types";

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
  chats: [],
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
    updateChats: (state, { payload }: PayloadAction<IChatRoom[]>) => {
      state.chats = payload;
    },
  },
});

export const { signSuccess, updateChats } = userSlice.actions;
export default userSlice.reducer;

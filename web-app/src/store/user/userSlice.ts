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
  currentChatRoom: undefined,
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
    setCurrentChatRoom: (state, { payload }: PayloadAction<IChatRoom>) => {
      state.currentChatRoom = payload;
    },
    signOut: (state) =>{
      state.data.user = initialState.data.user;
      state.isSignedIn = false;
      state.token = ""
      state.currentChatRoom = initialState.currentChatRoom 

    }
  },
});

export const { signSuccess, setCurrentChatRoom ,signOut} = userSlice.actions;
export default userSlice.reducer;

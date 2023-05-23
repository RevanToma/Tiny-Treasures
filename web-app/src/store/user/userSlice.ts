import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom, IUser, SignInInfo, SignUpInfo, User } from "../../types";
import api from "../../api";
import {
  ApiPostSignInUser,
  ApiPostSignUpUser,
  getAccessToken,
  signOutUserAsync,
} from "../../api/requests";
import { Socket } from "../../Sockets/Message.socket";

interface UpdateData {
  [key: string]: string | number | string[];
  field: string;
}
const initialState: IUser = {
  data: {
    user: {
      email: "",
      firstName: "",
      credits: 0,
      name: "",
      saved: [],
    },
  },
  isSignedIn: false,
  accessToken: "",
  currentChatRoom: undefined,
};
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async ({ newData, field }: UpdateData) => {
    const res = await api.patch("users/updateMe", {
      [field]: newData,
    });
    const user: User = res.data.data.data;
    return user;
  }
);

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async ({ email, password }: SignInInfo) => {
    const user: User = await ApiPostSignInUser(email, password);

    if (!user) return;
    console.log(user._id);
    Socket.init(user._id);

    return user;
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userData: SignUpInfo) => {
    const user: User = await ApiPostSignUpUser(userData);

    if (!user) return;
    Socket.init(user._id);

    return user;
  }
);

export const signOutUser = createAsyncThunk(
  "user/signOutUserAsync",
  async () => {
    await signOutUserAsync();

    return;
  }
);

export const refreshAccessToken = createAsyncThunk(
  "users/refreshAccessToken",
  async () => {
    const data = await getAccessToken();
    console.log(data);
    if (!data) return;
    return data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signSuccess: (state, { payload }: PayloadAction<IUser>) => {
      state.data.user = payload.data.user;
      // state.token = payload.token;
      state.isSignedIn = true;
      Socket.init(state.data.user._id);
    },
    setCurrentChatRoom: (state, { payload }: PayloadAction<IChatRoom>) => {
      state.currentChatRoom = payload;
    },
    signOut: (state) => {
      state.data.user = initialState.data.user;
      state.isSignedIn = false;
      // state.token = "";
      state.currentChatRoom = initialState.currentChatRoom;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserAsync.fulfilled, (state, { payload }) => {
      state.data.user = payload;
    });
    builder.addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
      if (payload) {
        state.data.user = {
          ...payload.user,
          credits: payload.user?.credits ?? 0,
        };
        state.isSignedIn = true;
        state.accessToken = payload.accessToken;
      }
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.data.user = payload;
        state.isSignedIn = true;
      }
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.data.user = payload;
        state.isSignedIn = true;
      }
    });
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.data.user = initialState.data.user;
      state.isSignedIn = false;
    });
  },
});
export const { signSuccess, setCurrentChatRoom, signOut } = userSlice.actions;
export default userSlice.reducer;

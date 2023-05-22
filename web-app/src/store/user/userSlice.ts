import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom, IUser, SignInInfo, SignUpInfo, User } from "../../types";
import api from "../../api";
import {
  ApiPostSignInUser,
  ApiPostSignUpUser,
  getUserFromJwt,
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
  // token: "",
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

export const checkForLoggedInUser = createAsyncThunk(
  "users/checkForLoggedInUser",
  async () => {
    const user: IUser = await getUserFromJwt();
    if (!user) return;
    // Socket.init(user.data.user._id);

    return user;
  }
);
export const signInUser = createAsyncThunk(
  "user/signInUser",
  async ({ email, password }: SignInInfo) => {
    const user: User = await ApiPostSignInUser(email, password);
    if (!user) return;

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

    builder.addCase(checkForLoggedInUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.data.user = {
          ...payload.data.user,
          credits: payload.data.user?.credits ?? 0,
        };
        state.isSignedIn = true;
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

export const { setCurrentChatRoom, signOut } = userSlice.actions;
export default userSlice.reducer;

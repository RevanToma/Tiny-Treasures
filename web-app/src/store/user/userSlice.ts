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
// const initialState: IUser = {
//   data: {
//     user: {
//       email: "",
//       firstName: "",
//       credits: 0,
//       name: "",
//       saved: [],
//     },
//   },
//   isSignedIn: false,
//   // credits: 0,
//   // token: "",
//   currentChatRoom: undefined,
// };

export interface UserState {
  user: User | null;
  isSignedIn: boolean;
  currentChatRoom?: IChatRoom;
}
const initialState: UserState = {
  user: null,
  isSignedIn: false,
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
    const user: User = await getUserFromJwt();
    console.log("FROM SLICE CHECK LOGGED IN", user);
    // console.log("FROM SLICE", user.data.data._id);
    // console.log("FROM SLICE", user.data.user._id);
    if (!user) return;
    Socket.init(user._id);
    return user;
  }
);
export const signInUser = createAsyncThunk(
  "user/signInUser",
  async ({ email, password }: SignInInfo) => {
    const user: User = await ApiPostSignInUser(email, password);
    console.log(user);
    if (!user) return;
    // console.log("FROM SLICE SIGNIN", user);
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
    // signSuccess: (state, { payload }: PayloadAction<IUser>) => {
    //   state.user = payload.data.data;
    //   // state.token = payload.token;
    //   state.isSignedIn = true;
    //   Socket.init(state.user.);
    // },

    setCurrentChatRoom: (state, { payload }: PayloadAction<IChatRoom>) => {
      state.currentChatRoom = payload;
    },
    // signOut: (state) => {
    //   state.data.user = initialState.data.user;
    //   state.isSignedIn = false;
    //   // state.token = "";
    //   state.currentChatRoom = initialState.currentChatRoom;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(updateUserAsync.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    builder.addCase(checkForLoggedInUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;

        Socket.init(state.user._id);

        // state.data = {
        //   ...payload.data,
        //   // credits: payload.data.user.credits ?? 0,
        // };
        console.log("PAYLOAD PAYLOAD", payload);
        state.isSignedIn = true;
      }
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.isSignedIn = true;
        // Socket.init(state.user._id);
      }
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.isSignedIn = true;
      }
    });
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.user = null;
      state.isSignedIn = false;
    });
  },
});

export const { setCurrentChatRoom } = userSlice.actions;
export default userSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IChatRoom,
  SignInInfo,
  SignUpInfo,
  User,
  UserState,
} from "../../types";
import api from "../../api";
import {
  addPostToUserFavourite,
  ApiPostSignInUser,
  ApiPostSignUpUser,
  fetchtFavoritePosts,
  getAccessToken,
  signOutUserAsync,
} from "../../api/requests";
import { Socket } from "../../Sockets/Message.socket";

interface UpdateData {
  [key: string]: string | number | string[];
  field: string;
}

const initialState: UserState = {
  user: null,
  isSignedIn: false,
  currentChatRoom: undefined,
  accessToken: "",
};

export const fetchFavoritePosts = createAsyncThunk(
  "user/fetchFavoritePosts",
  async () => {
    const favorites = await fetchtFavoritePosts();
    return favorites;
  }
);

export const addPostToFavourite = createAsyncThunk(
  "user/addPostToFavourite",
  async (postId: string) => {
    const updatedFavorites = await addPostToUserFavourite(postId);
    console.log(updatedFavorites);
    return updatedFavorites;
  }
);

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

    return user;
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userData: SignUpInfo) => {
    const user: User = await ApiPostSignUpUser(userData);

    if (!user) return;
    // Socket.init(user._id);

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
    if (!data) return;
    Socket.init(data.accessToken);

    return data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentChatRoom: (state, { payload }: PayloadAction<IChatRoom>) => {
      state.currentChatRoom = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserAsync.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user;
        state.isSignedIn = true;
        state.accessToken = payload.accessToken;
      }
    });
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.isSignedIn = true;
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
      state.accessToken = "";
    });
    builder.addCase(fetchFavoritePosts.fulfilled, (state, { payload }) => {
      state.user.favorites = payload;
    });
    builder.addCase(addPostToFavourite.fulfilled, (state, { payload }) => {
      state.user.favorites = payload;
    });
  },
});
export const { setCurrentChatRoom } = userSlice.actions;
export default userSlice.reducer;

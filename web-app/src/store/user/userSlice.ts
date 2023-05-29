import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IChatRoom,
  ISignInInfo,
  ISignUpInfo,
  IUpdateData,
  IUpdateEmailProps,
  IUpdatePasswordProps,
  IUser,
  IUserState,
} from '../../types';
import api from '../../api';
import {
  addPostToUserFavourite,
  ApiPostSignInUser,
  ApiPostSignUpUser,
  getAccessToken,
  patchUpdateEmail,
  patchUpdatePassword,
  patchUpdateUser,
  signOutUserAsync,
} from '../../api/requests';
import { Socket } from '../../Sockets/Message.socket';

const initialState: IUserState = {
  user: null,
  isSignedIn: false,
  currentChatRoom: undefined,
  accessToken: '',
};

export const addPostToFavourite = createAsyncThunk(
  'user/addPostToFavourite',
  async (postId: string) => {
    const updatedFavorites = await addPostToUserFavourite(postId);
    return updatedFavorites;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (data: IUpdateData) => {
    const user = patchUpdateUser(data);
    return user;
  }
);

export const updateEmailAsync = createAsyncThunk(
  'user/updateEmail',
  async (data: IUpdateEmailProps) => {
    const user = patchUpdateEmail(data);
    return user;
  }
);

export const updatePasswordAsync = createAsyncThunk(
  'user/updatePassword',
  async (data: IUpdatePasswordProps) => {
    const user = patchUpdatePassword(data);
    return user;
  }
);

export const signInUser = createAsyncThunk(
  'user/signInUser',
  async ({ email, password }: ISignInInfo) => {
    const user: IUser = await ApiPostSignInUser(email, password);

    if (!user) return;

    return user;
  }
);

export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async (userData: ISignUpInfo) => {
    const user: IUser = await ApiPostSignUpUser(userData);

    if (!user) return;

    return user;
  }
);

export const signOutUser = createAsyncThunk('user/signOutUser', async () => {
  await signOutUserAsync();

  return;
});

export const refreshAccessToken = createAsyncThunk(
  'users/refreshAccessToken',
  async () => {
    const data = await getAccessToken();
    if (!data) return;
    Socket.init(data.accessToken);

    return data;
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentChatRoom: (state, { payload }: PayloadAction<IChatRoom>) => {
      state.currentChatRoom = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserAsync.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    builder.addCase(updateEmailAsync.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    builder.addCase(updatePasswordAsync.fulfilled, (state, { payload }) => {
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
    builder.addCase(signOutUser.fulfilled, state => {
      state.user = null;
      state.isSignedIn = false;
      state.accessToken = '';
    });

    builder.addCase(addPostToFavourite.fulfilled, (state, { payload }) => {
      state.user.favorites = payload;
    });
  },
});

export const { setCurrentChatRoom } = userSlice.actions;
export default userSlice.reducer;

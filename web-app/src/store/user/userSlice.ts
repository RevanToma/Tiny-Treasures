import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChatRoom, IUser, User } from '../../types';
import api from '../../api';

interface UpdateData {
  [key: string]: string | number | string[];
  field: string;
}

const initialState: IUser = {
  data: {
    user: {
      email: '',
      firstName: '',
      credits: 0,
      name: '',
      saved: [],
    },
  },
  isSignedIn: false,
  token: '',
  currentChatRoom: undefined,
};

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ({ newData, field }: UpdateData) => {
    const res = await api.patch('users/updateMe', {
      [field]: newData,
    });
    const user: User = res.data.data.data;
    return user;
  }
);

const userSlice = createSlice({
  name: 'user',
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
    signOut: state => {
      state.data.user = initialState.data.user;
      state.isSignedIn = false;
      state.token = '';
      state.currentChatRoom = initialState.currentChatRoom;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserAsync.fulfilled, (state, { payload }) => {
      state.data.user = payload;
    });
  },
});

export const { signSuccess, setCurrentChatRoom, signOut } = userSlice.actions;
export default userSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatRoom, IUser, User } from "../../types";
import api from "../../api";
import { getAccessToken } from "../../api/requests";
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


export const refreshAccessToken = createAsyncThunk(
  "users/refreshAccessToken",
  async () => {
    const data = await getAccessToken();
    console.log(data);
    if(!data) return;

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

    builder.addCase(refreshAccessToken.fulfilled, (state, {payload}) => {
      if(payload) {
        state.data.user = {
          ...payload.user,
          credits: payload.user?.credits ?? 0,
        };
        state.isSignedIn = true;
        state.accessToken = payload.accessToken;
      }
    });
  },
});

export const { signSuccess, setCurrentChatRoom, signOut } = userSlice.actions;
export default userSlice.reducer;

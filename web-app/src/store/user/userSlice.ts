import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignInInfo, SignUpInfo, User, UserState } from "../../types";
import { ApiPostSignInUser, ApiPostSignUpUser } from "../../api/requests";

import { AppDispatch } from "../store";
import { AxiosError } from "axios";

const initialState: UserState = {
  user: {},
  error: null,
  isLoading: false,
  errorCode: null,
};

export const signInWithEmailAsync =
  ({ email, password }: SignInInfo) =>
  async (dispatch: AppDispatch) => {
    dispatch(singInStart());
    try {
      const userData = await ApiPostSignInUser(email, password);
      dispatch(signSuccess(userData));
    } catch (error) {
      dispatch(signFailed(error as AxiosError));
    }
  };
export const signUpWithEmailAsync =
  (formFields: SignUpInfo) => async (dispatch: AppDispatch) => {
    dispatch(singInStart());
    console.log(formFields);
    try {
      const { email, password, passwordConfirm, name } = formFields;
      const userData = await ApiPostSignUpUser(
        name,
        email,
        password,
        passwordConfirm
      );
      dispatch(signSuccess(userData));
    } catch (error) {
      dispatch(signFailed(error as AxiosError));
    }
  };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state) => {
      state.isLoading = true;
    },
    signSuccess: (state, { payload }: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = payload;
    },
    signFailed: (state, { payload }: PayloadAction<AxiosError>) => {
      const errorMessage =
        payload.response?.data || payload.message || "Unknown error";
      const errorCode = payload.response?.status || null;

      state.isLoading = false;
      state.error = errorMessage ? errorMessage.toString() : null;
      state.errorCode = errorCode;
    },
  },
});
export const { singInStart, signSuccess, signFailed } = userSlice.actions;
export default userSlice.reducer;

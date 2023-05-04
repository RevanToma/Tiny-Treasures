import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignInInfo, SignUpInfo, User, UserState } from "../../types";
import { ApiPostSignInUser, ApiPostSignUpUser } from "../../api/requests";

import { AppDispatch } from "../store";
import { AxiosError } from "axios";

const initialState: UserState = {
  user: {},
  error: null,
  isLoading: false,
};

export const signInWithEmailAsync =
  ({ email, password }: SignInInfo) =>
  async (dispatch: AppDispatch) => {
    dispatch(signInStart());
    try {
      const userData = await ApiPostSignInUser(email, password);
      dispatch(signSuccess(userData));
    } catch (error) {
      dispatch(signFailed(error as AxiosError));
    }
  };
export const signUpWithEmailAsync =
  (formFields: SignUpInfo) => async (dispatch: AppDispatch) => {
    dispatch(signInStart());
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
      console.log(error);
    }
  };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signSuccess: (state, { payload }: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = payload;
    },
    signFailed: (state, { payload }: PayloadAction<AxiosError>) => {
      state.isLoading = false;
      state.error = payload.message;
    },
  },
});
export const { signInStart, signSuccess, signFailed } = userSlice.actions;
export default userSlice.reducer;

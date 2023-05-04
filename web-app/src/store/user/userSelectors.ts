import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
const userSlice = (state: RootState) => state.user;

export const selectUser = createSelector(
  [userSlice],
  (userSlice) => userSlice.user
);

export const selectIsSignedIn = createSelector(
  [userSlice],
  (userSlice) => userSlice.isSignedIn
);

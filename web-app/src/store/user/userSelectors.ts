import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const userSlice = (state: RootState) => state.user;
// const userData = (state: RootState) => state.user;

export const selectUser = createSelector(
  [userSlice],
  (userSlice) => userSlice.user
);
export const selectLocation = createSelector(
  [userSlice],
  (userSlice) => userSlice.user?.location
);
export const selectIsSignedIn = createSelector(
  [userSlice],
  (userSlice) => userSlice.isSignedIn
);

export const selectCurrentChatRoom = createSelector(
  [userSlice],
  (userSlice) => userSlice.currentChatRoom
);

export const selectUserCredits = createSelector(
  [userSlice],
  (userSlice) => userSlice.user?.credits
);

export const selectAccessToken = createSelector(
  [userSlice],
  (userSlice) => userSlice.accessToken
);

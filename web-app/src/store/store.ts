import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer, { signSuccess } from "./user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "development"
      ? getDefaultMiddleware({
          serializableCheck: false,
        }).concat(logger)
      : getDefaultMiddleware(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

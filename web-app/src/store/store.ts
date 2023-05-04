import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
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

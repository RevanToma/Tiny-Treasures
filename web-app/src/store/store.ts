import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user/userSlice";
import queryReducer from "./query/querySlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

// const rootReducer = combineReducers({
//   user: userReducer,
//   query: queryReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    user: userReducer,
    query: queryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "development"
      ? getDefaultMiddleware({ serializableCheck: false }).concat(logger)
      : getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

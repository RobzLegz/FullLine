import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import notificationReducer from "./slices/notificationSlice";
import userReducer from "./slices/userSlice";
import mmkvMiddleware from "../middlewares/mmkvMiddleware";
// import loadStateFromMMKV from "../loaders/mmkvLoader";

const store = configureStore({
  reducer: {
    app: appReducer,
    notification: notificationReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(mmkvMiddleware),
});

// loadStateFromMMKV();

export default store;

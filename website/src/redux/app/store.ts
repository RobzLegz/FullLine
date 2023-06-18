import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../slices/appSlice";
import notificationReducer from "../slices/notificationSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    notification: notificationReducer,
  },
});

export default store;

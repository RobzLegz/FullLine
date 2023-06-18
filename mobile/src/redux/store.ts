import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import memoryReducer from "./slices/memorySlice";
import notificationReducer from "./slices/notificationSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    memory: memoryReducer,
    notification: notificationReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

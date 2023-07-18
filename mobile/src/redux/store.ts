import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import mmkvMiddleware from "../middlewares/mmkvMiddleware";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: [mmkvMiddleware],
});

export default store;

import { Middleware } from "@reduxjs/toolkit";
import { mmkv } from "../loaders/mmkvLoader";

export const mmkvMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);

  mmkv.set("redux-state", JSON.stringify(storeApi.getState().app));
  return result;
};

export default mmkvMiddleware;

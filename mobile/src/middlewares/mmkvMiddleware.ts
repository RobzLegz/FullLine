import { mmkv } from "../../App";
import { Middleware } from '@reduxjs/toolkit';

export const mmkvMiddleware: Middleware = storeApi => next => action => {
  const result = next(action);
  mmkv.set('redux-state', storeApi.getState());
  return result;
};

export default mmkvMiddleware;
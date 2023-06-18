import { Dispatch } from "@reduxjs/toolkit";
import { headers } from "../constants/headers";
import { setInfo, setToken } from "../redux/slices/userSlice";
import {
  getItemFromStore,
  removeItemFromStore,
  saveItem,
} from "../utils/storeOptions";
import axios from "axios";
import { USER_INFO_ROUTE } from "./routes";

export const authUser = async ({ dispatch }: { dispatch: Dispatch }) => {
  let end = false;

  try {
    const tokenJSON = await getItemFromStore("token");

    if (tokenJSON) {
      const parsed = JSON.parse(tokenJSON);

      const tok = parsed.token;

      if (tok) {
        dispatch(setToken(tok));

        const headrs = headers(tok);

        await axios.get(USER_INFO_ROUTE, headrs).then(async (res) => {
          const { user, token } = res.data;
          dispatch(setInfo(user));
          end = true;

          if (token && typeof token === "string") {
            dispatch(setToken(token));

            await saveItem("token", { token: token });
          }
        });
      }
    }
  } catch (_err: any) {
    end = false;
  }

  if (end) {
    return;
  }

  try {
    await removeItemFromStore("token");
  } catch (_err: any) {}

  await axios.get(USER_INFO_ROUTE).then(async (res) => {
    const { user, token } = res.data;

    dispatch(setInfo(user));

    if (!token) {
      return;
    }

    dispatch(setToken(token));

    await saveItem("token", { token: token });
  });
};

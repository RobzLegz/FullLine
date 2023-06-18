import { Dispatch } from "@reduxjs/toolkit";
import { headers } from "../constants/headers";
import {
  setInfo,
  setPushNotificationToken,
  setToken,
} from "../redux/slices/userSlice";
import {
  getItemFromStore,
  removeItemFromStore,
  saveItem,
} from "../utils/storeOptions";
import axios from "axios";
import { REGISTER_PUSH_NOTIFICATIONS_ROUTE, USER_INFO_ROUTE } from "./routes";
import { setNotification } from "../redux/slices/notificationSlice";

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

export const registerForPushNotifications = async ({
  token,
  pushToken,
  dispatch,
}: {
  pushToken: string;
  token: string;
  dispatch: Dispatch;
}) => {
  const headrs = headers(token);

  console.log("Registering for push notifications", pushToken);

  await axios
    .post(REGISTER_PUSH_NOTIFICATIONS_ROUTE, { token: pushToken }, headrs)
    .then((res) => {
      dispatch(setPushNotificationToken(res.data.token));
    })
    .catch((err) => {
      if (!err.response) {
        return console.log(err);
      }

      const message: string = err.response.data.err;
      dispatch(
        setNotification({
          type: "error",
          message: message,
        })
      );
    });
};

import axios from "axios";
import { Dispatch } from "redux";
import { setNotification } from "../redux/slices/notificationSlice";
import { CONTACT_BASE } from "./routes";

export const sendContactEmail = async ({
  email,
  content,
  name,
  phone,
  dispatch,
}: {
  email: string;
  content: string;
  name: string;
  phone: string;
  dispatch: Dispatch;
}) => {
  if (!email || !content || !name) {
    dispatch(
      setNotification({
        type: "error",
        message: "Lūdzu norādiet nepieciešamos laukus",
      })
    );
    return;
  }

  const data = {
    email,
    content,
    name,
    phone,
  };

  let sentXd = false;

  await axios
    .post(CONTACT_BASE, data)
    .then((res) => {
      const { sent }: { sent: boolean } = res.data;

      if (sent) {
        sentXd = true;
        dispatch(
          setNotification({
            type: "success",
            message: "Ziņa nosūtīta",
          })
        );
      } else {
        dispatch(
          setNotification({
            type: "error",
            message: "Ziņa diemžēl netika nosūtīta, mēģiniet atkal vēlāk",
          })
        );
      }
    })
    .catch((err) => {
      if (!err.response || !err.response.data) {
        console.log(err);
        return false;
      }

      const message: string = err.response.data.err;
      dispatch(
        setNotification({
          type: "error",
          message: message,
        })
      );
    });

  return sentXd;
};

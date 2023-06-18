import axios from "axios";
import { REGISTER_HACKATHON_ROUTE } from "./routes";
import { Dispatch } from "redux";
import { setNotification } from "../redux/slices/notificationSlice";

export const registerHackathonParticipant = async ({
  email,
  name,
  grade,
  dispatch,
  school,
  question,
}: {
  email: string;
  name: string;
  grade: string;
  school: string;
  question: string;
  dispatch: Dispatch;
}) => {
  if (!email || !school || !grade || !name) {
    return;
  }

  const data = {
    email,
    name,
    school,
    grade,
    question,
  };

  let success = false;

  await axios
    .post(REGISTER_HACKATHON_ROUTE, data)
    .then((res) => {
      dispatch(
        setNotification({
          type: "success",
          message: "Reģistrācija veiksmīga",
        })
      );

      success = true;
    })
    .catch((err) => {
      localStorage.removeItem("prevLogin");
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
  return success;
};

import axios from "axios";
import { headers } from "../constants/headers";
import { ORGANIZER_BASE } from "./routes";
import { setNotification } from "../redux/slices/notificationSlice";
import { setCurrentOrganizer } from "../redux/slices/appSlice";

export const getOrganizerById = async ({
  dispatch,
  token,
  id,
}: {
  dispatch: any;
  token: string | null;
  id: string;
}) => {
  const headrs = headers(token);

  await axios
    .get(`${ORGANIZER_BASE}/${id}`, headrs)
    .then((res) => {
      dispatch(setCurrentOrganizer(res.data.organizer));
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

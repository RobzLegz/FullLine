import axios from "axios";
import { UPLOAD_BASE } from "./routes";
import { headers } from "../constants/headers";
import { AlertStatic } from "react-native";

export const uploadImage = async ({
  image,
  token,
  alert,
}: {
  image: any;
  token: string | null;
  alert: AlertStatic["alert"];
}) => {
  try {
    if (!token) {
      alert("Something went wrong");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    const res = await axios.post(UPLOAD_BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });

    return res.data.url;
  } catch (err) {
    console.log(err);
    return null;
  }
};

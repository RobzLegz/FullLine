import axios from "axios";
import { UPLOAD_BASE } from "../requests/routes";

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    let uploadedUrl = null;

    const res = await axios.post(UPLOAD_BASE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    const { url }: { url: string } = res.data;

    uploadedUrl = url;

    return uploadedUrl;
  } catch (err) {
    console.log(err);
    return null;
  }
};

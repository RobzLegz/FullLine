import { Request, Response } from "express";
import cloudinary from "cloudinary";
import fs from "fs";
import { UploadedFile } from "express-fileupload";

const cloudName = process.env.CLOUD_NAME;
const cloudApiKey = process.env.CLOUD_API_KEY;
const cloudApiSecret = process.env.CLOUD_API_SECRET;

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: cloudApiKey,
  api_secret: cloudApiSecret,
});

export const uploadCtrl = {
  upload: async (req: Request, res: Response) => {
    try {
      if (!req.files) {
        return res.status(400).json({ err: "No files were uploaded." });
      }

      const file: UploadedFile = req.files[
        Object.keys(req.files)[0]
      ] as UploadedFile;
      if (!file || !file.tempFilePath) {
        return res.status(400).json({ err: "No files were uploaded." });
      }

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "LifeCoach/Images" },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);

          if (!result || !result.secure_url) {
            return res.status(500).json({ err: "Something went wrong" });
          }

          res.json({ url: result.secure_url });
        }
      );
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

const removeTmp = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

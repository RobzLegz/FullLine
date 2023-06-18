import { Request, Response } from "express";
import { uploadFile } from "../../../src/utils/uploadFile";
import sharp from "sharp";

export const uploadCtrl = {
  upload: async (req: Request, res: Response) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ err: "No files selected" });
      }
      const file = req.files.file;

      if (Array.isArray(file)) {
        return res.status(500).json({ err: "Something went wrong" });
      }

      const buffer = await sharp(file.tempFilePath)
      .resize({width: 2000, withoutEnlargement: true})
      .jpeg({quality: 80, mozjpeg: true})
      .toBuffer();

      const url = await uploadFile(file, buffer);
      if (!url) {
        return res.status(500).json({ err: "Something went wrong" });
      }

      res.json({ msg: "File successfully uploaded", url });

    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

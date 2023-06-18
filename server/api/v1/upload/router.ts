import express from "express";
import { uploadCtrl } from "./controller";

export const uploadRouter = express.Router();

uploadRouter.route("/").post(uploadCtrl.upload);

import express from "express";
import { uploadCtrl } from "./controller";
import { auth } from "../../src/middleware/auth";

export const uploadRouter = express.Router();

uploadRouter.route("/").post(auth, uploadCtrl.upload);

import express from "express";
import { uploadCtrl } from "./controller";
import { auth, authAdmin } from "../../src/middleware/auth";

export const uploadRouter = express.Router();

uploadRouter.route("/").post(auth, uploadCtrl.upload);
uploadRouter.route("/category").post(authAdmin, uploadCtrl.uploadCategoryImage);

import express from "express";
import { userCtrl } from "./controller";

export const userRouter = express.Router();

userRouter.route("/newsletter/join").post(userCtrl.joinNewsletter);
userRouter.route("/create").post(userCtrl.create);

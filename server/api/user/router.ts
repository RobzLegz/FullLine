import express from "express";
import { userCtrl } from "./controller";

export const userRouter = express.Router();

userRouter.route("/info").get(userCtrl.getUserInfo);

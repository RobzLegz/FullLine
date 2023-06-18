import express from "express";
import { auth } from "../../../src/middleware/auth";
import { userCtrl } from "./controller";

export const userRouter = express.Router();

userRouter.route("/change_city").post(auth, userCtrl.changeCity);
userRouter.route("/change_country").post(auth, userCtrl.changeCountry);
userRouter.route("/info").get(userCtrl.getUserInfo);
userRouter
  .route("/notifications")
  .post(auth, userCtrl.registerForPushNotifications);

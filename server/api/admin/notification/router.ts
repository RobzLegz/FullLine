import express from "express";
import { notificationCtrl } from "./controller";
import { authAdmin } from "../../../src/middleware/auth";

export const notificationRouter = express.Router();

notificationRouter.route("/send").post(notificationCtrl.sendNotification);
// notificationRouter.route("/send").post(authAdmin, notificationCtrl.sendNotification);

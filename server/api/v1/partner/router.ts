import express from "express";
import { authPartner } from "../../../src/middleware/auth";
import { partnerCtrl } from "./controller";
import { cache } from "../../../src/middleware/cache";

export const partnerRouter = express.Router();

partnerRouter.route("/spots").get(authPartner, partnerCtrl.getPartnerSpots);
partnerRouter.route("/register").post(partnerCtrl.register);
partnerRouter.route("/login").post(partnerCtrl.login);
partnerRouter
  .route("/info")
  .get(authPartner, partnerCtrl.getPartnerInfo)
  .put(authPartner, partnerCtrl.updatePartnerInfo);
partnerRouter
  .route("/chart/:id")
  .get(authPartner, cache(2 * 60 * 60), partnerCtrl.getChartData);
partnerRouter.route("/events").get(authPartner, partnerCtrl.getEvents);
partnerRouter
  .route("/popular/:id")
  .get(authPartner, cache(2 * 60 * 60), partnerCtrl.getPopular);

partnerRouter.route("/forgot_password").post(partnerCtrl.forgotPassword);
partnerRouter.route("/reset_password/:token").post(partnerCtrl.resetPassword);

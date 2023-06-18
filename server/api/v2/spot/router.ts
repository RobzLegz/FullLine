import express from "express";
import { cache } from "../../../src/middleware/cache";
import { spotCtrl } from "./controller";
import { auth, authPartner } from "../../../src/middleware/auth";
import { createView } from "../../../src/middleware/createView";

export const spotRouter = express.Router();

spotRouter
  .route("/map/:country")
  .get(auth, cache(60 * 60 * 24), spotCtrl.getMapSpots);

spotRouter.route("/ticket_click/:id").post(auth, spotCtrl.clickWebsiteUrl);

spotRouter.route("/partner").post(authPartner, spotCtrl.create);
spotRouter
  .route("/partner/:id")
  .get(authPartner, spotCtrl.getById)
  .put(authPartner, spotCtrl.updateOne)
  .delete(authPartner, spotCtrl.deleteOne);

spotRouter
  .route("/:id")
  .get(auth, createView("spot"), cache(60 * 60 * 24), spotCtrl.getById);

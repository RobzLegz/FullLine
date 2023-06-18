import express from "express";
import { eventCtrl } from "./controller";
import { authAdmin } from "../../../src/middleware/auth";

export const eventRouter = express.Router();

eventRouter.route("/").get(authAdmin, eventCtrl.get);

eventRouter.route("/merge").post(authAdmin, eventCtrl.merge);
eventRouter.route("/save").post(authAdmin, eventCtrl.updateMany);
eventRouter.route("/similar").get(authAdmin, eventCtrl.getSimilar);

eventRouter.route("/city/:city_id").get(authAdmin, eventCtrl.getEventsByCity);
eventRouter
  .route("/organizer/:organizer_id")
  .get(authAdmin, eventCtrl.getEventsByOrganizer);

eventRouter
  .route("/:id")
  .get(authAdmin, eventCtrl.getById)
  .delete(authAdmin, eventCtrl.delete);

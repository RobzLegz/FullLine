import express from "express";
import { auth, authPartner } from "../../../src/middleware/auth";
import { cache } from "../../../src/middleware/cache";
import { eventCtrl } from "./controller";
import { createView } from "../../../src/middleware/createView";

export const eventRouter = express.Router();

eventRouter
  .route("/map_events")
  .get(auth, cache(24 * 60 * 60), eventCtrl.getMapEvents)
  .post(auth, eventCtrl.searchMapEvents);

eventRouter.route("/save/:id").post(auth, eventCtrl.save);
eventRouter.route("/unsave/:id").post(auth, eventCtrl.unsave);

eventRouter.route("/partner/:id").get(authPartner, eventCtrl.getById);

eventRouter
  .route("/:id")
  .get(auth, createView("event"), cache(24 * 60 * 60), eventCtrl.getById);

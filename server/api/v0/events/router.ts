import express from "express";
import { eventCtrl } from "./controller";
import { cache } from "../../../src/middleware/cache";

export const eventRouter = express.Router();

eventRouter.route("/").get(cache(2 * 60 * 60), eventCtrl.get);
eventRouter
  .route("/map_events")
  .get(cache(2 * 60 * 60), eventCtrl.getMapEvents);
eventRouter.route("/search").post(eventCtrl.search);
eventRouter.route("/partner/get/:id").get(eventCtrl.getById);
eventRouter.route("/:id").get(cache(2 * 60), eventCtrl.getById);

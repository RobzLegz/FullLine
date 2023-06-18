import express from "express";
import { auth, authPartner } from "../../../src/middleware/auth";
import { cache } from "../../../src/middleware/cache";
import { eventCtrl } from "./controller";
import { createView } from "../../../src/middleware/createView";

export const eventRouter = express.Router();

eventRouter.route("/").post(authPartner, eventCtrl.createEvent);
eventRouter
  .route("/event_list")
  .get(auth, cache(24 * 60 * 60), eventCtrl.getEventList);
eventRouter.route("/saved").get(auth, eventCtrl.getSaved);
eventRouter
  .route("/map_events")
  .get(auth, cache(24 * 60 * 60), eventCtrl.getMapEvents);
eventRouter.route("/search").post(auth, eventCtrl.search);
eventRouter.route("/ticket_click/:id").post(auth, eventCtrl.clickWebsiteUrl);
eventRouter.route("/save/:id").post(auth, eventCtrl.save);
eventRouter
  .route("/partner/:id")
  .get(authPartner, eventCtrl.getById)
  .put(authPartner, eventCtrl.updateOne)
  .delete(authPartner, eventCtrl.deleteOne);
eventRouter
  .route("/:id")
  .get(auth, createView("event"), cache(24 * 60 * 60), eventCtrl.getById);
eventRouter.route("/title/:title").get(cache(60 * 60), eventCtrl.getByTitle);

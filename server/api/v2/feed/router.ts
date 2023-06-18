import express from "express";
import { auth } from "../../../src/middleware/auth";
import { cache } from "../../../src/middleware/cache";
import { feedCtrl } from "./controller";

export const feedRouter = express.Router();

feedRouter
  .route("/events")
  .get(auth, cache(4 * 60 * 60), feedCtrl.getLocationEvents);

feedRouter.route("/").get(auth, cache(4 * 60 * 60), feedCtrl.getFeed);

feedRouter
  .route("/:user_id")
  .get(auth, cache(4 * 60 * 60), feedCtrl.getRecomendations);

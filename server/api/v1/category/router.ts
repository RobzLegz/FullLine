import express from "express";
import { auth, authPartner } from "../../../src/middleware/auth";
import { cache } from "../../../src/middleware/cache";
import { categoryCtrl } from "./controller";
import { createView } from "../../../src/middleware/createView";

export const categoryRouter = express.Router();

categoryRouter
  .route("/search")
  .get(auth, cache(60 * 60 * 24), categoryCtrl.search);
categoryRouter.route("/all").get(authPartner, categoryCtrl.getAll);

categoryRouter.route("/spot").get(auth, categoryCtrl.getSpotCategories);

categoryRouter
  .route("/search/:city_id")
  .get(auth, cache(60 * 60 * 24), categoryCtrl.getByCity);

categoryRouter
  .route("/:id")
  .get(auth, createView("category"), cache(24 * 60 * 60), categoryCtrl.getById);

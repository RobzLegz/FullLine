import express from "express";
import { cache } from "../../../src/middleware/cache";
import { countryCtrl } from "./controller";
import { auth, authPartner } from "../../../src/middleware/auth";

export const countryRouter = express.Router();

countryRouter.route("/").get(auth, cache(60 * 60 * 24), countryCtrl.get);
countryRouter
  .route("/partner")
  .get(authPartner, cache(60 * 60 * 24), countryCtrl.get);

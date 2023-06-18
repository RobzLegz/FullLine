import express from "express";
import { cache } from "../../../src/middleware/cache";
import { cityCtrl } from "./controller";
import { auth, authPartner } from "../../../src/middleware/auth";

export const cityRouter = express.Router();

cityRouter.route("/partner").get(authPartner, cache(60 * 60 * 24), cityCtrl.get);
cityRouter.route("/:country").get(auth, cache(60 * 60 * 24), cityCtrl.get);

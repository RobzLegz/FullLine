import express from "express";
import { cache } from "../../../src/middleware/cache";
import { cityCtrl } from "./controller";

export const cityRouter = express.Router();

cityRouter.route("/").get(cache(60 * 60 * 24 * 2), cityCtrl.get);

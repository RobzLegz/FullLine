import express from "express";
import { cache } from "../../../src/middleware/cache";
import { cityCtrl } from "./controller";
import { auth } from "../../../src/middleware/auth";

export const cityRouter = express.Router();

cityRouter.route("/").get(auth, cache(60 * 60 * 24), cityCtrl.get);

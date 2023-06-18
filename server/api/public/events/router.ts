import { cache } from "../../../src/middleware/cache";
import express from "express";
import { publicEventCtrl } from "./controller";
import { developerAuth } from "../../../src/middleware/auth";

export const publicEventRouter = express.Router();
publicEventRouter
  .route("/")
  .get(developerAuth, cache(24 * 60 * 60), publicEventCtrl.get);

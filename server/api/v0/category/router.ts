import express from "express";
import { cache } from "../../../src/middleware/cache";
import { categoryCtrl } from "./controller";

export const categoryRouter = express.Router();

categoryRouter.route("/").get(cache(60 * 60 * 24 * 2), categoryCtrl.get);

import express from "express";
import { auth } from "../../../src/middleware/auth";
import { nearbyCtrl } from "./controller";

export const nearbyRouter = express.Router();

nearbyRouter.route("/").get(auth, nearbyCtrl.getNearbyData);

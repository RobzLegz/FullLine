import express from "express";
import { auth } from "../../../src/middleware/auth";
import { cache } from "../../../src/middleware/cache";
import { userCtrl } from "./controller";

export const userRouter = express.Router();

userRouter.route("/newsletter/join").post(userCtrl.joinNewsletter);
userRouter.route("/create").post(userCtrl.create);
userRouter.route("/feed").get(auth, cache(24 * 60 * 60), userCtrl.getFeed);
userRouter.route("/info").get(auth, userCtrl.getUserInfo);
// userRouter.route("/hackathon").post(userCtrl.registerHackathon);

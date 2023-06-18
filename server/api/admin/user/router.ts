import express from "express";
import { userCtrl } from "./controller";
import { cache } from "../../../src/middleware/cache";
import { authAdmin } from "../../../src/middleware/auth";

export const userRouter = express.Router();

userRouter.route("/data").get(authAdmin, cache(60 * 60), userCtrl.getUserData);
userRouter.route("/login").post(userCtrl.login);
userRouter.route("/info").get(authAdmin, userCtrl.getUserInfo);

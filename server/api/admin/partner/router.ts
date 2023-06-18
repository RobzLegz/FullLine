import express from "express";
import { partnerCtrl } from "./controller";
import { authAdmin } from "../../../src/middleware/auth";

export const partnerRouter = express.Router();

partnerRouter.route("/").get(authAdmin, partnerCtrl.getPartnerInfo);
partnerRouter.route("/verify_all").post(authAdmin, partnerCtrl.verifyAll);
partnerRouter.route("/:id").put(authAdmin, partnerCtrl.verify);

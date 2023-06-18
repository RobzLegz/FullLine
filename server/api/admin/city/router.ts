import express from "express";
import { cityCtrl } from "./controller";
import { authAdmin } from "../../../src/middleware/auth";

export const cityRouter = express.Router();

cityRouter.route("/").get(authAdmin, cityCtrl.getAll);
cityRouter.route("/merge").post(authAdmin, cityCtrl.merge);
cityRouter.route("/verify/:id").post(authAdmin, cityCtrl.verify);
cityRouter.route("/update_many").post(authAdmin, cityCtrl.updateMany);

cityRouter
  .route("/:id")
  .put(authAdmin, cityCtrl.update)
  .delete(authAdmin, cityCtrl.delete);

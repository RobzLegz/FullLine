import express from "express";
import { categoryCtrl } from "./controller";
import { authAdmin } from "../../../src/middleware/auth";

export const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(authAdmin, categoryCtrl.create)
  .get(authAdmin, categoryCtrl.getAll);
categoryRouter
  .route("/:id")
  .put(authAdmin, categoryCtrl.update)
  .delete(authAdmin, categoryCtrl.delete)
  .get(authAdmin, categoryCtrl.getById);

categoryRouter.route("/merge").post(authAdmin, categoryCtrl.merge);

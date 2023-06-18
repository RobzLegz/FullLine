import express from "express";
import { categoryCtrl } from "./controller";
import { authAdmin } from "../../../src/middleware/auth";

export const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(authAdmin, categoryCtrl.getAll)
  .post(authAdmin, categoryCtrl.create);

categoryRouter
  .route("/:id")
  .put(authAdmin, categoryCtrl.update)
  .delete(authAdmin, categoryCtrl.delete);

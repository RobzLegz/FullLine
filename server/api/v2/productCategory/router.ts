import express from "express";
import { productCategoryCtrl } from "./controller";
import { authPartner } from "../../../src/middleware/auth";

export const productCategoryRouter = express.Router();

productCategoryRouter.route("/").post(authPartner, productCategoryCtrl.create);

productCategoryRouter
  .route("/:id")
  .delete(authPartner, productCategoryCtrl.deleteOne);

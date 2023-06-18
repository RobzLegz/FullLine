import express from "express";
import { productCtrl } from "./controller";
import { authPartner } from "../../../src/middleware/auth";

export const productRouter = express.Router();

productRouter.route("/").post(authPartner, productCtrl.create);
productRouter
  .route("/:id")
  .put(authPartner, productCtrl.edit)
  .delete(authPartner, productCtrl.deleteOne);

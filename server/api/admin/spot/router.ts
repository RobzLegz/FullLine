import express from "express";
import { spotCtrl } from "./controller";
import { authAdmin } from "../../../src/middleware/auth";

export const spotRouter = express.Router();

spotRouter.route("/").get(authAdmin, spotCtrl.getAll);
spotRouter.route("/verify/:id").post(authAdmin, spotCtrl.verify);
spotRouter.route("/:id").delete(authAdmin, spotCtrl.delete);

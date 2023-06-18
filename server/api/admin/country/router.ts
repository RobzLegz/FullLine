import express from "express";
import { countryCtrl } from "./controller";
import { authAdmin } from "../../../src/middleware/auth";

export const countryRouter = express.Router();

countryRouter.route("/").post(authAdmin, countryCtrl.create).get(authAdmin, countryCtrl.getAll);
countryRouter.route("/verify/:id").post(authAdmin, countryCtrl.verify);

countryRouter.route("/:id").put(authAdmin, countryCtrl.update);

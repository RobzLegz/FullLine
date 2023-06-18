import express from "express";
import { categoryCtrl } from "./controller";
import { auth } from "../../src/middleware/auth";

export const categoryRouter = express.Router();

categoryRouter.route("/").get(auth, categoryCtrl.getAll);
categoryRouter.route("/:id").get(auth, categoryCtrl.getOne);

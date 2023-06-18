import express from "express";
import { imageCtrl } from "./controller";
import { auth } from "../../src/middleware/auth";

export const imageRouter = express.Router();

imageRouter.route("/").post(auth, imageCtrl.post);
imageRouter.route("/:id").delete(auth, imageCtrl.delete);

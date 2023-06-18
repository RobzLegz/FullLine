import express from "express";
import { contactCtrl } from "./controller";

export const contactRouter = express.Router();

contactRouter.route("/").post(contactCtrl.contact);

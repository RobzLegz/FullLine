import express from "express";
import { cache } from "../../../src/middleware/cache";
import { sitemapCtrl } from "./controller";

export const sitemapRouter = express.Router();

sitemapRouter.route("/").get(cache(8 * 60 * 60), sitemapCtrl.getSitemap);

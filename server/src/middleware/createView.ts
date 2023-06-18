import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

export const createView = (
  view: "category" | "event" | "organizer" | "spot"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const { id } = req.params;
      if (typeof id !== "string" || !id) {
        return res.status(400).json({ err: "Invalid id" });
      }

      const { categories: includeCategories } = req.query;
      if (includeCategories) {
        next();
      }

      if (view === "category") {
        await prisma.view.create({
          data: {
            categoryId: id,
            userId: req.user_id,
          },
        });
      } else if (view === "event") {
        await prisma.view.create({
          data: {
            eventId: id,
            userId: req.user_id,
          },
        });

        await prisma.event.update({
          where: {
            id: id,
          },
          data: {
            view_count: {
              increment: 1,
            },
          },
        });
      } else if (view === "organizer") {
        await prisma.view.create({
          data: {
            partnerId: id,
            userId: req.user_id,
          },
        });
      } else if (view === "spot") {
        await prisma.view.create({
          data: {
            spotId: id,
            userId: req.user_id,
          },
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({ err: err.message });
    }
  };
};

import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const publicEventCtrl = {
  get: async (req: Request, res: Response) => {
    try {
      const {
        category = "63f0dd7c10aa3c717cb9a22a",
        take = 30,
        skip = 0,
      } = req.query;
      if (!category || typeof category !== "string") {
        return res.status(400).json({ err: "Invalid category" });
      }

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const events = await prisma.event.findMany({
        where: {
          category_ids: {
            has: category,
          },
          start_date: {
            gte: yesterday,
          },
        },
        select: {
          id: true,
          title: true,
          start_date: true,
          end_date: true,
          end_time: true,
          info: true,
          location: {
            select: {
              location: true,
              city: true,
              country: true,
              address: true,
            },
          },
          cover: true,
        },
        orderBy: {
          start_date: "asc",
        },
        take: Number(take),
        skip: Number(skip),
      });

      res.json({
        msg: "Event info received",
        events: events,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

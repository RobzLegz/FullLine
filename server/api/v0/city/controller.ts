import { Request, Response } from "express";
import { cities } from "../../../src/constants/cities";
import prisma from "../../../src/lib/prisma";

export const cityCtrl = {
  get: async (_req: Request, res: Response) => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      const foundCities = await prisma.city.findMany({
        where: {
          name: {
            in: cities,
          },
          events: {
            some: {
              start_date: {
                gte: yesterday,
                lt: nextMonth,
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          lat: true,
          lng: true,
        },
        orderBy: {
          events: {
            _count: "desc",
          },
        },
      });

      res.json({
        msg: "City info received",
        cities: foundCities,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

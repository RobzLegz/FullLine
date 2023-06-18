import { Request, Response } from "express";
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
          verified: true,
          countryId: "64450f18e843597154f1d832",
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

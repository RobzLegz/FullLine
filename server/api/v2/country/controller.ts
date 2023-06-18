import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const countryCtrl = {
  get: async (_req: Request, res: Response) => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      const foundCountries = await prisma.country.findMany({
        where: {
          verified: true,
          cities: {
            some: {},
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      res.json({
        msg: "Country info received",
        countries: foundCountries,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

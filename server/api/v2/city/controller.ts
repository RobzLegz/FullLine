import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const cityCtrl = {
  get: async (req: Request, res: Response) => {
    try {
      const { country } = req.params;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      if (country && typeof country === "string") {
        const foundCities = await prisma.city.findMany({
          where: {
            verified: true,
            countryId: country,
            events: {
              some: {
                verified: true,
                start_date: {
                  gt: yesterday,
                },
              },
            },
          },
          select: {
            id: true,
            name: true,
            lat: true,
            lng: true,
            countryId: true,
          },
          orderBy: {
            name: "asc",
          },
        });

        return res.json({
          msg: "City info received",
          cities: foundCities,
        });
      }

      const foundCities = await prisma.city.findMany({
        where: {
          verified: true,
          country: {
            verified: true,
          },
        },
        select: {
          id: true,
          name: true,
          lat: true,
          lng: true,
          countryId: true,
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

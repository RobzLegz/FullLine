import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const categoryCtrl = {
  get: async (req: Request, res: Response) => {
    try {
      const { city = "63f0dd5f10aa3c717cb9a21b" }: { city?: string } =
        req.query;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      const foundCategories = await prisma.category.findMany({
        where: {
          events: {
            some: {
              cityId: city,
              start_date: {
                gte: yesterday,
                lt: nextMonth,
              },
            },
          },
        },
        select: {
          id: true,
          color: true,
          name: true,
          events: true,
        },
        orderBy: {
          events: {
            _count: "desc",
          },
        },
      });

      res.json({
        msg: "Category info received",
        categories: foundCategories,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import memoryCache from "memory-cache";

export const categoryCtrl = {
  search: async (req: Request, res: Response) => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const foundCategories = await prisma.category.findMany({
        where: {
          events: {
            some: {
              start_date: {
                gte: yesterday,
              },
              verified: true,
            },
          },
        },
        select: {
          id: true,
          name: true,
          color: true,
          events: {
            where: {
              start_date: {
                gte: yesterday,
              },
              cover: {
                isSet: true,
              },
              verified: true,
            },
            select: {
              cover: {
                select: {
                  src: true,
                },
              },
            },
            take: 1,
          },
        },
        orderBy: {
          events: {
            _count: "desc",
          },
        },
        take: 30,
      });

      const quality = foundCategories.filter(
        (category) =>
          category.events.length > 0 &&
          category.events[0].cover !== null &&
          category.name.length <= 27
      );

      const other = await prisma.category.findMany({
        where: {
          id: {
            notIn: quality.map((cat) => cat.id),
          },
          events: {
            some: {
              start_date: {
                gte: yesterday,
              },
              verified: true,
            },
          },
        },
        select: {
          id: true,
          name: true,
          color: true,
        },
        orderBy: {
          events: {
            _count: "desc",
          },
        },
        take: 20,
      });

      res.json({
        msg: "Category info received",
        categories: quality,
        all: [...quality, ...other].filter((cat) => cat.name.length <= 27),
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      let categories: any[] = memoryCache.get("categories");
      if (!categories) {
        categories = await prisma.category.findMany();
      }

      res.json({
        msg: "Category info received",
        categories: categories,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getSpotCategories: async (_req: Request, res: Response) => {
    try {
      const foundCategories = await prisma.category.findMany({
        where: {
          spots: {
            some: {
              verified: true,
            },
          },
        },
        select: {
          id: true,
          color: true,
          name: true,
          type: true,
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
  getByCity: async (req: Request, res: Response) => {
    try {
      const { city_id }: { city_id?: string } = req.params;

      if (!city_id) {
        return res.status(400).json({ err: "No city selected" });
      }

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const foundCategories = await prisma.category.findMany({
        where: {
          events: {
            some: {
              cityId: city_id,
              start_date: {
                gte: yesterday,
              },
              verified: true,
            },
          },
        },
        select: {
          id: true,
          color: true,
          name: true,
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
  getById: async (req: Request, res: Response) => {
    try {
      const { id: categoryId } = req.params;

      if (!req.user_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
        },
        select: {
          id: true,
          name: true,
          events: {
            where: {
              start_date: {
                gte: yesterday,
              },
              cover: {
                isSet: true,
              },
              verified: true,
            },
            select: {
              id: true,
              cover: {
                select: {
                  src: true,
                },
              },
              title: true,
              start_date: true,
              end_date: true,
              location: {
                select: {
                  location: true,
                  city: true,
                  address: true,
                },
              },
            },
            orderBy: {
              start_date: "asc",
            },
            take: 25,
          },
        },
      });

      res.json({
        msg: "Category found",
        category,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

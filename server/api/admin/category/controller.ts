import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

interface CreateCategoryBody {
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export const categoryCtrl = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, description, icon, color, type } = req.body;
      if (!name) {
        return res.status(404).json({ err: "Please fill in all fields" });
      }

      const nameTest = await prisma.category.findFirst({ where: { name } });
      if (nameTest) {
        return res
          .status(404)
          .json({ err: "A category with this name already exists" });
      }

      const newCategory = await prisma.category.create({
        data: {
          name,
          icon,
          description,
          color,
          type,
        },
      });

      res.json({
        msg: "Category created successfully",
        category: newCategory,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { name, description, icon, color }: CreateCategoryBody = req.body;

      const { id: categoryId } = req.params;

      const updatedCategory = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name,
          description,
          icon,
          color,
        },
      });

      res.json({
        msg: "Category updated successfully",
        category: updatedCategory,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const { city = "63f0dd5f10aa3c717cb9a21b" }: { city?: string } =
        req.query;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
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
  delete: async (req: Request, res: Response) => {
    try {
      const { id: categoryId } = req.params;

      const events = await prisma.event.findMany({
        where: {
          category_ids: {
            has: categoryId,
          },
        },
      });

      for (const event of events) {
        await prisma.event.update({
          where: { id: event.id },
          data: {
            categories: {
              disconnect: [{ id: categoryId }],
            },
          },
        });
      }

      await prisma.category.delete({
        where: {
          id: categoryId,
        },
      });

      res.json({
        msg: "Category deleated",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id: categoryId } = req.params;

      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
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
  getAll: async (_req: Request, res: Response) => {
    try {
      const categories = await prisma.category.findMany({
        select: { id: true, name: true, _count: true, color: true },
        orderBy: {
          events: {
            _count: "desc",
          },
        },
      });

      res.json({
        categories,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  merge: async (req: Request, res: Response) => {
    try {
      const { name, ids }: { name?: string; ids?: string[] } = req.body;

      if (!name || !ids) {
        return res.status(400).json({
          err: "Wrong data",
        });
      }

      const categories = await prisma.category.findMany({
        where: { id: { in: ids } },
      });

      let newKeywords: string[] = [];

      for (const category of categories) {
        newKeywords = [...newKeywords, ...category.keywords, category.name];
      }

      newKeywords = Array.from(new Set(newKeywords)).map((k) =>
        k.toLowerCase()
      );

      const createdCategory = await prisma.category.upsert({
        where: {
          name,
        },
        create: {
          name,
          keywords: newKeywords,
        },
        update: {
          name,
          keywords: newKeywords,
        },
        include: {
          _count: true,
        },
      });

      await prisma.view.updateMany({
        where: { categoryId: { in: ids } },
        data: { categoryId: createdCategory.id },
      });

      const deleteIds = ids.filter((cid) => cid !== createdCategory.id);

      for (const id of deleteIds) {
        const events = await prisma.event.findMany({
          where: {
            category_ids: {
              has: id,
            },
          },
        });

        for (const event of events) {
          const newCategoryIds = [
            ...event.category_ids.filter(
              (cid) => !deleteIds.some((id) => id === cid)
            ),
            createdCategory.id,
          ];

          await prisma.event.update({
            where: { id: event.id },
            data: { category_ids: newCategoryIds },
          });
        }

        const searches = await prisma.search.findMany({
          where: { category_ids: { has: id } },
        });

        for (const search of searches) {
          const newSearchIds = [
            ...search.category_ids.filter(
              (cid) => !deleteIds.some((id) => id === cid)
            ),
            createdCategory.id,
          ];

          await prisma.search.update({
            where: { id: search.id },
            data: { category_ids: newSearchIds },
          });
        }
      }

      await prisma.category.deleteMany({
        where: {
          id: {
            in: deleteIds,
          },
        },
      });

      res.json({
        msg: "Categories merged",
        category: createdCategory,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

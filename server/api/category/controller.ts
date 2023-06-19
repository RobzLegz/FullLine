import { Request, Response } from "express";
import prisma from "../../src/lib/prisma";

export const categoryCtrl = {
  getOne: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { id: categoryId } = req.params;

      const category = await prisma.category.findFirst({
        where: { id: categoryId },
        select: {
          id: true,
          title: true,
          description: true,
          icon: true,
          color: true,
        },
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      const images = await prisma.image.findMany({
        where: { userId: req.user_id, category_ids: { has: categoryId } },
      });

      const returnCategory = {
        ...category,
        images,
      };

      return res.json(returnCategory);
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const categories = await prisma.category.findMany({
        select: { id: true, title: true, icon: true, color: true },
      });

      const images = await prisma.image.findMany({
        where: {
          userId: req.user_id,
        },
        select: {
          category_ids: true,
        },
      });

      let allImageLength = 0;

      images.forEach((img) => (allImageLength += img.category_ids.length));

      const returnCategories = categories.map((c) => {
        const categoryImageLength = images.filter((img) =>
          img.category_ids.some((id) => id === c.id)
        ).length;

        const percentage = Math.floor(
          categoryImageLength / (allImageLength / 100)
        );

        if (!percentage) {
          return {
            ...c,
            height: 0,
          };
        }

        const height = Math.floor((80 * percentage) / 100 - 20);

        if (!height) {
          return {
            ...c,
            height: 0,
          };
        }

        return {
          ...c,
          height,
        };
      });

      return res.json(returnCategories);
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

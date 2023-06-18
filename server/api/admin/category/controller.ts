import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const categoryCtrl = {
  getAll: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const categories = await prisma.category.findMany({
        select: {
          id: true,
          title: true,
          icon: true,
          color: true,
          description: true,
        },
      });

      return res.json(categories);
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const {
        color,
        icon,
        title,
        description,
      }: {
        color?: string;
        icon?: string;
        description?: string;
        title?: string;
      } = req.body;

      if (
        typeof color !== "string" ||
        typeof icon !== "string" ||
        typeof title !== "string" ||
        typeof description !== "string"
      ) {
        return res.status(400).json({
          message: "Bad Request",
        });
      }

      const newCategory = await prisma.category.create({
        data: {
          title,
          icon,
          description,
          color,
        },
      });

      return res.json(newCategory);
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { id: categoryId } = req.params;

      const {
        color,
        icon,
        title,
        description,
      }: {
        color?: string;
        icon?: string;
        description?: string;
        title?: string;
      } = req.body;

      const newCategory = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          title,
          icon,
          description,
          color,
        },
      });

      return res.json(newCategory);
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { id: categoryId } = req.params;

      await prisma.category.delete({
        where: {
          id: categoryId,
        },
      });

      return res.json({ msg: "Category deleted" });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

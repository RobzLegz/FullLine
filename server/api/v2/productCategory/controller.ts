import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { generateColor } from "../../../src/utils/generateCategoryColor";

export const productCategoryCtrl = {
  get: async (req: Request, res: Response) => {
    try {
      const { id: spotId } = req.params;

      const categories = await prisma.productCategory.findMany({
        where: {
          spotId,
        },
      });

      res.json({ msg: "ProductCategory created", categories });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      if (!req.partner_id) {
        return res.status(400).json({ err: "sesija beigusies" });
      }

      const {
        name,
        description,
        spotId,
      }: {
        name: string;
        description?: string;
        spotId?: string;
      } = req.body;

      const productCategory = await prisma.productCategory.create({
        data: {
          name,
          description,
          color: generateColor(),
          spotId,
        },
      });

      res.json({ msg: "ProductCategory created", category: productCategory });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  deleteOne: async (req: Request, res: Response) => {
    try {
      const { id: categoryId } = req.params;
      if (!req.partner_id) {
        return res.status(400).json({ err: "sesija beigusies" });
      }

      await prisma.productCategory.deleteMany({
        where: {
          id: categoryId,
          spot: {
            partnerId: req.partner_id,
          },
        },
      });

      await prisma.product.updateMany({
        where: { categoryId },
        data: { categoryId: null },
      });

      res.json({ msg: "Product category deleted" });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

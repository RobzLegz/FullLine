import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { EventImage } from "@prisma/client";

export const productCtrl = {
  create: async (req: Request, res: Response) => {
    try {
      const { partner_id } = req;
      if (!partner_id) {
        return res.status(400).json({ err: "sesija beigusies" });
      }

      const {
        title,
        description,
        categoryId,
        images,
        cover,
        price,
        spotId,
      }: {
        title: string;
        description: string;
        price: number;
        spotId?: string;
        categoryId?: string;
        cover: EventImage;
        images: EventImage[];
      } = req.body;

      const product = await prisma.product.create({
        data: {
          title,
          description,
          categoryId,
          images,
          cover,
          price,
          spotId,
        },
        include: {
          category: true,
        },
      });

      res.json({ msg: "Product created", product });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  edit: async (req: Request, res: Response) => {
    try {
      const { id: productId } = req.params;
      if (!req.partner_id) {
        return res.status(400).json({ err: "sesija beigusies" });
      }

      const {
        title,
        description,
        categoryId,
        images,
        cover,
        price,
        spotId,
      }: {
        title: string;
        description: string;
        price: number;
        spotId?: string;
        categoryId?: string;
        cover: EventImage;
        images: EventImage[];
      } = req.body;

      const product = await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          title,
          description,
          categoryId,
          images,
          cover,
          price,
          spotId,
        },
        include: {
          category: true,
        },
      });

      res.json({ msg: "Product updated", product });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  deleteOne: async (req: Request, res: Response) => {
    try {
      const { id: productId } = req.params;
      if (!req.partner_id) {
        return res.status(400).json({ err: "sesija beigusies" });
      }

      await prisma.product.deleteMany({
        where: {
          id: productId,
          spot: {
            partnerId: req.partner_id,
          },
        },
      });

      res.json({ msg: "Product deleted" });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};

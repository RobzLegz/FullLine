import { Request, Response } from "express";
import prisma from "../../src/lib/prisma";

export const imageCtrl = {
  post: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const {
        image,
        description,
        collectionIds,
      }: { image?: string; description?: string; collectionIds?: string[] } =
        req.body;

      if (!image || !collectionIds) {
        return res.status(400).json({
          message: "Bad Request",
        });
      }

      const newImage = await prisma.image.create({
        data: {
          src: image,
          description,
          category_ids: collectionIds,
          userId: req.user_id,
        },
      });

      return res.json(newImage);
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

      const { id: imageId } = req.params;

      await prisma.image.deleteMany({
        where: { id: imageId, userId: req.user_id },
      });

      return res.json({ msg: "Image deleted" });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
